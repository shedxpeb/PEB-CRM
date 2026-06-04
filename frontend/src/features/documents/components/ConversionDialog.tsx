'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Estimate, Proposal, Quotation } from '../types/peb-commercial';

interface ConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceDocument: Estimate | Proposal | Quotation;
  targetType: 'Proposal' | 'Quotation' | 'Project';
  onConfirm: () => Promise<void>;
}

export function ConversionDialog({ open, onOpenChange, sourceDocument, targetType, onConfirm }: ConversionDialogProps) {
  const [isConverting, setIsConverting] = useState(false);
  const [conversionSummary, setConversionSummary] = useState<any>(null);

  const getDocumentType = (doc: Estimate | Proposal | Quotation): string => {
    if ('estimateNumber' in doc) return 'Estimate';
    if ('proposalNumber' in doc) return 'Proposal';
    if ('quotationNumber' in doc) return 'Quotation';
    return 'Document';
  };

  const getDocumentNumber = (doc: Estimate | Proposal | Quotation): string => {
    if ('estimateNumber' in doc) return (doc as unknown as Estimate).estimateNumber;
    if ('proposalNumber' in doc) return (doc as unknown as Proposal).proposalNumber;
    if ('quotationNumber' in doc) return (doc as unknown as Quotation).quotationNumber;
    return '';
  };

  const getCustomerName = (doc: Estimate | Proposal | Quotation): string => {
    return doc.customerName || '';
  };

  const getProjectName = (doc: Estimate | Proposal | Quotation): string => {
    return doc.projectName || '';
  };

  const generateConversionSummary = () => {
    const summary = {
      sourceType: getDocumentType(sourceDocument),
      sourceNumber: getDocumentNumber(sourceDocument),
      targetType,
      customerName: getCustomerName(sourceDocument),
      projectName: getProjectName(sourceDocument),
      dataPoints: 0,
      configurations: 0,
      warnings: [] as string[],
    };

    // Count data points
    if (sourceDocument.materialSelections) {
      summary.dataPoints += sourceDocument.materialSelections.length;
    }
    if (sourceDocument.scopeConfiguration) {
      summary.configurations += Object.keys(sourceDocument.scopeConfiguration).length;
    }
    if (sourceDocument.technicalSpecifications) {
      summary.dataPoints += Object.keys(sourceDocument.technicalSpecifications).length;
    }

    // Generate warnings
    if (sourceDocument.status === 'Draft') {
      summary.warnings.push('Source document is in Draft status');
    }

    if (targetType === 'Quotation' && 'proposalConfiguration' in sourceDocument && !sourceDocument.proposalConfiguration) {
      summary.warnings.push('No proposal configuration found - will use defaults');
    }

    setConversionSummary(summary);
  };

  const handleConfirm = async () => {
    setIsConverting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  // Generate summary when dialog opens
  useState(() => {
    if (open) {
      generateConversionSummary();
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Convert {getDocumentType(sourceDocument)} to {targetType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Source Document Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Source Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Document #:</span>
                <span className="font-medium">{getDocumentNumber(sourceDocument)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium">{getCustomerName(sourceDocument)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Project:</span>
                <span className="font-medium">{getProjectName(sourceDocument) || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge variant={sourceDocument.status === 'Draft' ? 'secondary' : 'default'}>
                  {sourceDocument.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Summary */}
          {conversionSummary && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Conversion Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Points:</span>
                  <span className="font-medium">{conversionSummary.dataPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Configurations:</span>
                  <span className="font-medium">{conversionSummary.configurations}</span>
                </div>
                {conversionSummary.warnings.length > 0 && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-yellow-800">Warnings:</p>
                        {conversionSummary.warnings.map((warning: string, index: number) => (
                          <p key={index} className="text-yellow-700 text-xs">{warning}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* What Will Be Inherited */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">What Will Be Inherited</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <ul className="space-y-1 text-gray-600">
                <li>• Customer information</li>
                <li>• Material selections</li>
                <li>• Scope configuration</li>
                <li>• Technical specifications</li>
                <li>• Inclusions & exclusions</li>
                {targetType === 'Proposal' && <li>• All estimate data</li>}
                {targetType === 'Quotation' && <li>• All proposal data</li>}
                {targetType === 'Project' && <li>• All quotation data including pricing</li>}
              </ul>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isConverting}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isConverting}>
            {isConverting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4 mr-2" />
                Convert to {targetType}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
