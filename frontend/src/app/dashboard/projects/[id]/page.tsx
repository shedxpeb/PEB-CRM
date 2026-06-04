'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectTimeline } from '@/features/projects/components/ProjectTimeline';
import { ProjectHealthCard } from '@/features/projects/components/ProjectHealthCard';
import { MilestoneTracker } from '@/features/projects/components/MilestoneTracker';
import { useProject, useProjectActivities } from '@/features/projects/hooks/useProjects';
import { getProjectStatusVariant, getPriorityVariant, getHealthStatusVariant } from '@/features/projects/constants';
import { ArrowLeft, Edit, Calendar, MapPin, DollarSign, Users, Building2, Package, FileText, AlertCircle } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { data: project, isLoading } = useProject(projectId);
  const { data: activities } = useProjectActivities(projectId);

  if (isLoading) {
    return (
      <MainLayout title="Project Details">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading project details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout title="Project Details">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={project.projectName} subtitle={`Project Code: ${project.projectCode}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
          </div>
        </div>

        {/* Project Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Status</span>
              </div>
              <Badge variant={getProjectStatusVariant(project.status)}>{project.status}</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Stage</span>
              </div>
              <Badge variant="outline">{project.stage}</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Value</span>
              </div>
              <p className="text-lg font-bold">₹{project.value.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Priority</span>
              </div>
              <Badge variant={getPriorityVariant(project.priority)}>{project.priority}</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* General Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{project.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Project Type</p>
                      <p className="font-medium">{project.projectType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{project.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">City, State</p>
                      <p className="font-medium">{project.city}, {project.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{new Date(project.startDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{new Date(project.endDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Project Manager</p>
                      <p className="font-medium">{project.projectManager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="font-medium">{project.progress}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Card */}
              <ProjectHealthCard
                healthStatus={project.healthStatus}
                timelineHealth={project.timelineHealth}
                budgetHealth={project.budgetHealth}
                materialHealth={project.materialHealth}
                resourceHealth={project.resourceHealth}
              />
            </div>

            {/* PEB Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">PEB Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Structure Type</p>
                    <p className="font-medium">{project.structureType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Width</p>
                    <p className="font-medium">{project.width}m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Length</p>
                    <p className="font-medium">{project.length}m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="font-medium">{project.height}m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bay Spacing</p>
                    <p className="font-medium">{project.baySpacing}m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Roof Type</p>
                    <p className="font-medium">{project.roofType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Crane System</p>
                    <p className="font-medium">{project.craneSystem}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wall Type</p>
                    <p className="font-medium">{project.wallType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Covered Area</p>
                    <p className="font-medium">{project.coveredArea} sq.m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Weight</p>
                    <p className="font-medium">{project.totalWeight} tons</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mezzanine</p>
                    <p className="font-medium">{project.mezzanine ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Insulation</p>
                    <p className="font-medium">{project.insulation ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones">
            <MilestoneTracker milestones={project.milestones} />
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Project Team</span>
                  <Button size="sm">Add Team Member</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{member.workload}% Workload</p>
                        <p className="text-xs text-muted-foreground">
                          Assigned: {new Date(member.assignedDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <ProjectTimeline activities={activities || []} />
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Budget Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Budget</span>
                    <span className="font-bold">₹{project.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Material Cost</span>
                    <span className="font-medium">₹{(project.materialCost || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Procurement Cost</span>
                    <span className="font-medium">₹{(project.procurementCost || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fabrication Cost</span>
                    <span className="font-medium">₹{(project.fabricationCost || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Installation Cost</span>
                    <span className="font-medium">₹{(project.installationCost || 0).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-sm font-medium">Total Spent</span>
                    <span className="font-bold">
                      ₹{((project.materialCost || 0) + (project.procurementCost || 0) + (project.fabricationCost || 0) + (project.installationCost || 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Profit Margin</span>
                    <span className="font-bold text-green-600">{project.profitMargin}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Progress by Stage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Design</span>
                      <span className="text-sm font-medium">{project.designProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${project.designProgress}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Procurement</span>
                      <span className="text-sm font-medium">{project.procurementProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${project.procurementProgress}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Fabrication</span>
                      <span className="text-sm font-medium">{project.fabricationProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${project.fabricationProgress}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Installation</span>
                      <span className="text-sm font-medium">{project.installationProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-600 h-2 rounded-full" style={{ width: `${project.installationProgress}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Project Documents</span>
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No documents uploaded yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Upload design files, BOQs, contracts, and other project documents</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
