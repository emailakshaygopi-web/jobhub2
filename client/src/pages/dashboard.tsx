import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { 
  NotebookPen, 
  ChartLine, 
  Calendar, 
  Trophy,
  Search,
  FileText,
  Mail,
  Bot
} from "lucide-react";
import StatsCard from "@/components/ui/stats-card";
import ApplicationCard from "@/components/ui/application-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import AIChatbot from "@/components/AIChatbot";
import type { JobApplication, Analytics } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);
  const { user } = useAuth();

  const ADMIN_USER_ID = '47005508'; // Akshay's user ID
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

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'search':
        setLocation('/tracker');
        break;
      case 'resume':
        setLocation('/resume');
        break;
      case 'email':
        // TODO: Implement quick email functionality
        break;
    }
  };

  if (analyticsLoading || applicationsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border p-6 animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const recentApplications = (applications && Array.isArray(applications)) ? applications.slice(0, 3) : [];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={analytics?.totalApplications || 0}
          description="+12% from last month"
          icon={<NotebookPen className="h-6 w-6 text-blue-600" />}
          iconBg="bg-blue-100"
        />
        
        <StatsCard
          title="Response Rate"
          value={`${analytics?.responseRate || 0}%`}
          description="Above industry avg"
          icon={<ChartLine className="h-6 w-6 text-green-600" />}
          iconBg="bg-green-100"
        />
        
        <StatsCard
          title="Interviews"
          value={analytics?.interviewsScheduled || 0}
          description="3 this week"
          icon={<Calendar className="h-6 w-6 text-purple-600" />}
          iconBg="bg-purple-100"
        />
        
        <StatsCard
          title="Job Offers"
          value={analytics?.jobOffers || 0}
          description="Negotiating 2"
          icon={<Trophy className="h-6 w-6 text-amber-600" />}
          iconBg="bg-amber-100"
        />
      </div>

      {/* Recent Applications & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Recent Applications
                </CardTitle>
                <Button 
                  variant="ghost" 
                  onClick={() => setLocation('/applications')}
                  data-testid="button-view-all-applications"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" data-testid="recent-applications">
                {recentApplications.length > 0 ? (
                  recentApplications.map((application: JobApplication) => (
                    <ApplicationCard 
                      key={application.id} 
                      application={application}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No applications yet. Start by searching for jobs!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  onClick={() => handleQuickAction('search')}
                  className="w-full gradient-primary text-white hover:opacity-90"
                  data-testid="button-find-jobs"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find New Jobs
                </Button>
                <Button
                  onClick={() => handleQuickAction('resume')}
                  variant="secondary"
                  className="w-full"
                  data-testid="button-optimize-resume"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Optimize Resume
                </Button>
                <Button
                  onClick={() => handleQuickAction('email')}
                  variant="secondary"
                  className="w-full"
                  data-testid="button-send-followup"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Follow-up
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Platform Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { platform: 'LinkedIn', count: 8, percentage: 60 },
                  { platform: 'Naukri', count: 6, percentage: 45 },
                  { platform: 'Indeed', count: 5, percentage: 35 },
                ].map((item) => (
                  <div key={item.platform} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.platform}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="progress-bar h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
