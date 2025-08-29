import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Upload, Database, Eye } from "lucide-react";

export default function AdminPanel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [importing, setImporting] = useState(false);
  const [uploadedJobs, setUploadedJobs] = useState<any[]>([]);
  const [showJobs, setShowJobs] = useState(false);

  // Check if user is admin
  if (!user || user.id !== "47005508") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Admin access required</p>
        </div>
      </div>
    );
  }

  const handleImportJobs = async () => {
    setImporting(true);
    try {
      const response = await fetch('/api/admin/import-jobs', {
        method: 'POST',
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Import Successful",
          description: result.message,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({
        title: "Import Failed",
        description: error.message || "An error occurred during import",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const handleViewUploadedJobs = async () => {
    try {
      const response = await fetch('/api/admin/uploaded-jobs', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const jobs = await response.json();
        setUploadedJobs(jobs);
        setShowJobs(true);
        toast({
          title: "Jobs Loaded",
          description: `Found ${jobs.length} uploaded jobs`,
        });
      } else {
        throw new Error("Failed to fetch uploaded jobs");
      }
    } catch (error: any) {
      toast({
        title: "Failed to Load Jobs",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Panel - JobHub Management
            </h1>
            <p className="text-muted-foreground">
              Manage job imports and database operations
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Import Jobs Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Import Jobs from Excel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Import jobs from the uploaded Excel file into the database. This will process all job listings and make them available in the system.
                </p>
                <Button 
                  onClick={handleImportJobs}
                  disabled={importing}
                  className="w-full gradient-primary text-white"
                  data-testid="button-import-jobs"
                >
                  {importing ? (
                    <>
                      <Database className="h-4 w-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Excel Jobs
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* View Uploaded Jobs Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  View Uploaded Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View all jobs that have been uploaded through the admin system. Check the status and details of imported job listings.
                </p>
                <Button 
                  onClick={handleViewUploadedJobs}
                  variant="outline"
                  className="w-full"
                  data-testid="button-view-jobs"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Load Uploaded Jobs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Jobs Display */}
          {showJobs && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Uploaded Jobs ({uploadedJobs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedJobs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No uploaded jobs found. Import some jobs first.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {uploadedJobs.map((job: any) => (
                      <div 
                        key={job.id} 
                        className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                        data-testid={`admin-job-${job.id}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {job.title}
                            </h3>
                            <p className="text-primary font-medium">
                              {job.company}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {job.location}
                            </p>
                            {job.url && (
                              <a 
                                href={job.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline text-sm"
                              >
                                View Original Job →
                              </a>
                            )}
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge variant="secondary">
                              {job.platform}
                            </Badge>
                            {job.salary && (
                              <Badge variant="outline">
                                {job.salary}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}