'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Document } from '../types';
import { DOCUMENT_STATUS_BADGE_VARIANTS } from '../constants';
import {
  FileText,
  File,
  FileSpreadsheet,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  Building2,
  Package,
} from 'lucide-react';

interface DocumentViewDialogProps {
  document: Document;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentViewDialog({ document, open, onOpenChange }: DocumentViewDialogProps) {
  const getDocumentIcon = () => {
    switch (document.documentType) {
      case 'Estimate':
        return <FileText className="h-5 w-5" />;
      case 'Proposal':
        return <File className="h-5 w-5" />;
      case 'Quotation':
        return <FileSpreadsheet className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getDocumentIcon()}
            {document.documentNumber} - {document.documentType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant={DOCUMENT_STATUS_BADGE_VARIANTS[document.status as keyof typeof DOCUMENT_STATUS_BADGE_VARIANTS]}>
                    {document.status}
                  </Badge>
                  {document.approvalStatus && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      {document.approvalStatus === 'Approved' ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {document.approvalStatus}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Version {document.version}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">{document.customerName}</p>
                </div>
                {document.customerEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{document.customerEmail}</p>
                  </div>
                )}
                {document.customerPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{document.customerPhone}</p>
                  </div>
                )}
                {document.customerAddress && (
                  <div className="flex items-center gap-2 md:col-span-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{document.customerAddress}</p>
                  </div>
                )}
                {document.customerGST && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">GST Number</p>
                    <p className="font-medium">{document.customerGST}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Project Information */}
          {(document.leadId || document.projectId) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {document.leadId && (
                    <div>
                      <p className="text-sm text-muted-foreground">Lead Number</p>
                      <p className="font-medium">{document.leadNumber}</p>
                    </div>
                  )}
                  {document.projectId && (
                    <div>
                      <p className="text-sm text-muted-foreground">Project Name</p>
                      <p className="font-medium">{document.projectName}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Line Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4" />
                Line Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {document.lineItems.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium">{item.description}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>Qty: {item.quantity}</span>
                          <span>Unit: {item.unit}</span>
                          <span>Rate: {formatCurrency(item.rate)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.amount)}</p>
                        {item.taxRate && (
                          <p className="text-sm text-muted-foreground">
                            Tax ({item.taxRate}%): {formatCurrency(item.taxAmount || 0)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Pricing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(document.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST Type</span>
                  <span className="font-medium">{document.gstType}</span>
                </div>
                {document.cgstAmount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CGST</span>
                    <span className="font-medium">{formatCurrency(document.cgstAmount)}</span>
                  </div>
                )}
                {document.sgstAmount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SGST</span>
                    <span className="font-medium">{formatCurrency(document.sgstAmount)}</span>
                  </div>
                )}
                {document.igstAmount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IGST</span>
                    <span className="font-medium">{formatCurrency(document.igstAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax Amount</span>
                  <span className="font-medium">{formatCurrency(document.taxAmount)}</span>
                </div>
                {document.discountAmount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Discount {document.discountPercentage ? `(${document.discountPercentage}%)` : ''}
                    </span>
                    <span className="font-medium text-red-600">
                      -{formatCurrency(document.discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-green-600">{formatCurrency(document.totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Terms & Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Payment Terms</p>
                  <p className="font-medium">{document.paymentTerms}</p>
                </div>
                {document.deliveryTerms && (
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Terms</p>
                    <p className="font-medium">{document.deliveryTerms}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Valid Until</p>
                  <p className="font-medium">{formatDate(document.validUntil)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="font-medium">{formatDate(document.createdAt)}</p>
                </div>
              </div>
              {document.notes && (
                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{document.notes}</p>
                </div>
              )}
              {document.termsAndConditions && (
                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Terms & Conditions</p>
                  <p className="text-sm whitespace-pre-line">{document.termsAndConditions}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {document.sentAt && (
                  <div>
                    <p className="text-muted-foreground">Sent At</p>
                    <p className="font-medium">{formatDate(document.sentAt)}</p>
                  </div>
                )}
                {document.viewedAt && (
                  <div>
                    <p className="text-muted-foreground">Viewed At</p>
                    <p className="font-medium">{formatDate(document.viewedAt)}</p>
                  </div>
                )}
                {document.acceptedAt && (
                  <div>
                    <p className="text-muted-foreground">Accepted At</p>
                    <p className="font-medium">{formatDate(document.acceptedAt)}</p>
                  </div>
                )}
                {document.updatedAt && (
                  <div>
                    <p className="text-muted-foreground">Updated At</p>
                    <p className="font-medium">{formatDate(document.updatedAt)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
