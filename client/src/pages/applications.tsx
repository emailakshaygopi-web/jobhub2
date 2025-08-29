import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Filter, Edit, Mail, Search as SearchIcon, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import AIChatbot from "@/components/AIChatbot";
import type { JobApplication } from "@shared/schema";

interface ApplicationFilters {
  status: string;
  platform: string;
  priority: string;
}

const statusStyles = {
  "Applied": "status-applied",
  "Interview": "status-interview",
  "Under Review": "status-review",
  "Rejected": "status-rejected",
} as const;

export default function Applications() {
  const [filters, setFilters] = useState<ApplicationFilters>({
    status: "all",
    platform: "all",
    priority: "all",
  });
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const ADMIN_USER_ID = '47005508';
  const isAdmin = (user as any)?.id === ADMIN_USER_ID;

  const { data: applications, isLoading } = useQuery<JobApplication[]>({
    queryKey: ["/api/applications"],
  });

  const { data: userCredits } = useQuery({
    queryKey: ["/api/user-credits"],
  });

  const followUpMutation = useMutation({
    mutationFn: async (applicationId: string) => {
      const response = await apiRequest("POST", "/api/email/follow-up", {
        applicationId,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Follow-up email sent",
        description: "Your follow-up email has been sent successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
    },
    onError: () => {
      toast({
        title: "Failed to send email",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const filteredApplications = (applications && Array.isArray(applications)) ? applications.filter((app: JobApplication) => {
    if (filters.status !== "all" && app.status !== filters.status) return false;
    if (filters.platform !== "all" && app.platform !== filters.platform) return false;
    if (filters.priority !== "all" && app.priority !== filters.priority) return false;
    return true;
  }) : [];

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    toast({
      title: "Edit application",
      description: "Edit functionality coming soon.",
    });
  };

  const handleSendEmail = (id: string) => {
    followUpMutation.mutate(id);
  };

  const handleResearch = (company: string) => {
    // TODO: Implement company research modal
    toast({
      title: "Company research",
      description: `Researching ${company}...`,
    });
  };

  const addNewApplication = () => {
    // TODO: Implement add application modal
    toast({
      title: "Add application",
      description: "Add application form coming soon.",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusClass = statusStyles[status as keyof typeof statusStyles] || "status-applied";
    return (
      <Badge className={`${statusClass} text-white px-2 py-1 rounded-full text-xs font-medium`}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Application Management</h3>
          <p className="text-muted-foreground">Track and manage all your job applications</p>
        </div>
        <Button
          onClick={addNewApplication}
          className="gradient-primary text-white hover:opacity-90"
          data-testid="button-add-application"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Application
        </Button>
      </div>

      {/* Application Filters */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-foreground">Status:</Label>
              <Select 
                value={filters.status} 
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger className="w-32" data-testid="filter-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-foreground">Platform:</Label>
              <Select 
                value={filters.platform} 
                onValueChange={(value) => setFilters({ ...filters, platform: value })}
              >
                <SelectTrigger className="w-32" data-testid="filter-platform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Naukri">Naukri</SelectItem>
                  <SelectItem value="Indeed">Indeed</SelectItem>
                  <SelectItem value="IIMJobs">IIMJobs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-foreground">Priority:</Label>
              <Select 
                value={filters.priority} 
                onValueChange={(value) => setFilters({ ...filters, priority: value })}
              >
                <SelectTrigger className="w-32" data-testid="filter-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Ultra-High">Ultra-High</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-border">
                  <TableHead className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Company & Role
                  </TableHead>
                  <TableHead className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Location
                  </TableHead>
                  <TableHead className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Salary
                  </TableHead>
                  <TableHead className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Platform
                  </TableHead>
                  <TableHead className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Applied
                  </TableHead>
                  <TableHead className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application: JobApplication) => (
                    <TableRow 
                      key={application.id} 
                      className="hover:bg-gray-50 border-b border-border"
                      data-testid={`application-row-${application.id}`}
                    >
                      <TableCell className="px-6 py-4">
                        <div>
                          <h4 className="font-semibold text-foreground">{application.jobTitle}</h4>
                          <p className="text-sm text-muted-foreground">{application.company}</p>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                        {application.location}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm font-medium text-foreground">
                        {application.salary || "Not specified"}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {getStatusBadge(application.status)}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                        {application.platform}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                        {application.appliedAt ? formatDate(application.appliedAt) : "Not specified"}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(application.id)}
                            data-testid={`button-edit-${application.id}`}
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendEmail(application.id)}
                            disabled={followUpMutation.isPending}
                            data-testid={`button-email-${application.id}`}
                          >
                            <Mail className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResearch(application.company)}
                            data-testid={`button-research-${application.id}`}
                          >
                            <SearchIcon className="h-4 w-4 text-purple-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="text-muted-foreground">
                        {(applications && Array.isArray(applications) && applications.length === 0) ? (
                          <div>
                            <h3 className="text-lg font-medium text-foreground mb-2">No applications yet</h3>
                            <p>Start by searching for jobs and applying to opportunities.</p>
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-lg font-medium text-foreground mb-2">No applications match your filters</h3>
                            <p>Try adjusting your filter criteria above.</p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Floating AI Assistant */}
      {showFloatingChatbot && (
        <AIChatbot 
          isFloating={true} 
          onClose={() => setShowFloatingChatbot(false)} 
        />
      )}
      
      {/* AI Assistant Trigger Button */}
      {(isAdmin || (userCredits as any)?.plan === 'pro') && !showFloatingChatbot && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setShowFloatingChatbot(true)}
            size="lg"
            className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 shadow-lg"
            data-testid="button-floating-ai-assistant"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </div>
      )}
    </div>
  );
}
