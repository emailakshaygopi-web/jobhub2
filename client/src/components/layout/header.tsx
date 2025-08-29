import { useQuery } from "@tanstack/react-query";
import { Mail, User } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import type { Analytics, User as UserType } from "@shared/schema";

const pageTitles = {
  "/": { title: "Dashboard Overview", subtitle: "Monitor your job search progress and performance" },
  "/dashboard": { title: "Dashboard Overview", subtitle: "Monitor your job search progress and performance" },
  "/resume": { title: "Resume Analysis", subtitle: "AI-powered resume optimization and analysis" },
  "/tracker": { title: "Job Tracker Pro", subtitle: "Unified job search and application management" },
  "/applications": { title: "Application Management", subtitle: "Track and manage all your job applications" },
  "/cover-letters": { title: "Cover Letters", subtitle: "Generate personalized cover letters with AI" },
  "/analytics": { title: "Analytics & Insights", subtitle: "Analyze your job search performance" },
};

export default function Header() {
  const [location] = useLocation();
  const { user } = useAuth();
  const typedUser = user as UserType | undefined;
  const pageInfo = pageTitles[location as keyof typeof pageTitles] || pageTitles["/"];

  const { data: analytics } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <header className="bg-white border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{pageInfo.title}</h2>
          <p className="text-muted-foreground text-sm">{pageInfo.subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Email Counter */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
            <Mail className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              <span data-testid="emails-sent">{analytics?.emailsSentToday || 0}</span>/10 emails sent today
            </span>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {typedUser?.firstName ? `${typedUser.firstName}` : 'Akshay'}
              </p>
              <p className="text-xs text-muted-foreground">Premium User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
