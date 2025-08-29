import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Clock, Target, Calendar, CheckCircle, AlertCircle, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AIChatbot from "@/components/AIChatbot";
import type { Analytics, JobApplication } from "@shared/schema";

export default function Analytics() {
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);
  const { user } = useAuth();

  const ADMIN_USER_ID = '47005508';
  const isAdmin = (user as any)?.id === ADMIN_USER_ID;

  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
  });

  const { data: applications, isLoading: applicationsLoading } = useQuery<JobApplication[]>({
    queryKey: ["/api/applications"],
  });

  const { data: userCredits } = useQuery({
    queryKey: ["/api/user-credits"],
  });

  if (analyticsLoading || applicationsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border p-6 animate-pulse">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border p-6 animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const recentApplications = (applications && Array.isArray(applications)) ? applications.slice(0, 5) : [];
  const statusCounts = (applications && Array.isArray(applications)) ? applications.reduce((acc: Record<string, number>, app: JobApplication) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {}) : {};

  const platformPerformance = (applications && Array.isArray(applications)) ? applications.reduce((acc: Record<string, number>, app: JobApplication) => {
    if (app.platform) {
      acc[app.platform] = (acc[app.platform] || 0) + 1;
    }
    return acc;
  }, {}) : {};

  const calculateResponseRate = () => {
    if (!applications || !Array.isArray(applications) || applications.length === 0) return 0;
    const responded = applications.filter((app: JobApplication) => 
      app.status !== "Applied" && app.status !== "Rejected"
    ).length;
    return Math.round((responded / applications.length) * 100);
  };

  const getTimeToResponse = () => {
    if (!applications || !Array.isArray(applications) || applications.length === 0) return { average: 0, fastest: 0, slowest: 0 };
    
    const responseTimes = applications
      .filter((app: JobApplication) => app.status !== "Applied")
      .map((app: JobApplication) => {
        const applied = new Date(app.appliedAt || new Date());
        const updated = new Date(app.updatedAt || new Date());
        return Math.ceil((updated.getTime() - applied.getTime()) / (1000 * 60 * 60 * 24));
      });

    if (responseTimes.length === 0) return { average: 0, fastest: 0, slowest: 0 };

    return {
      average: Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length),
      fastest: Math.min(...responseTimes),
      slowest: Math.max(...responseTimes),
    };
  };

  const timeMetrics = getTimeToResponse();
  const responseRate = calculateResponseRate();

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Application Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Applications Sent</span>
                <span className="font-semibold text-foreground" data-testid="total-applications">
                  {analytics?.totalApplications || 0}
                </span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Responses Received</span>
                <span className="font-semibold text-foreground" data-testid="responses-received">
                  {statusCounts["Interview"] + statusCounts["Under Review"] || 0}
                </span>
              </div>
              <Progress value={responseRate} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Interviews Scheduled</span>
                <span className="font-semibold text-foreground" data-testid="interviews-scheduled">
                  {analytics?.interviewsScheduled || 0}
                </span>
              </div>
              <Progress value={analytics?.interviewsScheduled ? (analytics.interviewsScheduled / (analytics.totalApplications || 1)) * 100 : 0} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Job Offers</span>
                <span className="font-semibold text-foreground" data-testid="job-offers">
                  {analytics?.jobOffers || 0}
                </span>
              </div>
              <Progress value={analytics?.jobOffers ? (analytics.jobOffers / (analytics.totalApplications || 1)) * 100 : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Time to Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="average-response-time">
                {timeMetrics.average}
              </div>
              <div className="text-sm text-muted-foreground mb-4">Average days</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fastest Response</span>
                  <span className="font-medium">{timeMetrics.fastest} day{timeMetrics.fastest !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slowest Response</span>
                  <span className="font-medium">{timeMetrics.slowest} day{timeMetrics.slowest !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Success Rate by Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(platformPerformance).map(([platform, count]) => {
                const successRate = Math.round((count / (analytics?.totalApplications || 1)) * 100);
                return (
                  <div key={platform} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{platform}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={successRate} className="w-16 h-2" />
                      <span className="font-semibold text-primary w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                );
              })}
              {Object.keys(platformPerformance).length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  No platform data available yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Application Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusCounts).map(([status, count]) => {
                const percentage = Math.round((count / (analytics?.totalApplications || 1)) * 100);
                const statusStyles = {
                  "Applied": "bg-blue-100 text-blue-800",
                  "Interview": "bg-green-100 text-green-800",
                  "Under Review": "bg-yellow-100 text-yellow-800",
                  "Rejected": "bg-red-100 text-red-800",
                };
                
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge className={statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"}>
                        {status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{count} applications</span>
                    </div>
                    <span className="font-semibold text-foreground">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Key Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{responseRate}%</div>
                <div className="text-sm text-blue-700">Response Rate</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {analytics?.interviewsScheduled || 0}
                </div>
                <div className="text-sm text-green-700">Interviews</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {analytics?.emailsSentToday || 0}
                </div>
                <div className="text-sm text-purple-700">Emails Today</div>
              </div>
              
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-600">{timeMetrics.average}</div>
                <div className="text-sm text-amber-700">Avg. Response</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Timeline */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Application Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6" data-testid="application-timeline">
            {recentApplications.length > 0 ? (
              recentApplications.map((application: JobApplication) => {
                const getStatusIcon = (status: string) => {
                  switch (status) {
                    case "Interview":
                      return <CheckCircle className="w-3 h-3 text-green-500" />;
                    case "Under Review":
                      return <Clock className="w-3 h-3 text-yellow-500" />;
                    case "Rejected":
                      return <AlertCircle className="w-3 h-3 text-red-500" />;
                    default:
                      return <CheckCircle className="w-3 h-3 text-blue-500" />;
                  }
                };

                return (
                  <div key={application.id} className="flex items-center space-x-4 pb-4 border-b border-border last:border-b-0">
                    {getStatusIcon(application.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">
                          {application.company} - {application.status}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(application.updatedAt || new Date()).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {application.jobTitle} • {application.location}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No application history</h3>
                <p>Start applying to jobs to see your timeline here.</p>
              </div>
            )}
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
