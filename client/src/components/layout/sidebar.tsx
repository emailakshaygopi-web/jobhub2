import { useLocation, Link } from "wouter";
import { useState } from "react";
import { 
  ChartLine, 
  FileText, 
  Search, 
  ListTodo, 
  Mail, 
  BarChart3, 
  Briefcase,
  CheckCircle,
  Clock,
  Bot,
  Target,
  PenTool,
  ChevronDown,
  ChevronRight,
  KanbanSquare,
  Calendar,
  Users,
  Upload,
  Bell,
  Building,
  Download,
  Settings,
  Zap
} from "lucide-react";

const navigationItems = [
  { path: "/", icon: ChartLine, label: "Dashboard" },
  { path: "/resume", icon: FileText, label: "Resume Analysis" },
  { path: "/analytics", icon: BarChart3, label: "Analytics" },
];

const aiToolsItems = [
  { path: "/ai-tools", icon: Bot, label: "All AI Tools" },
];

const jobTrackerItems = [
  { path: "/tracker", icon: KanbanSquare, label: "Visual Kanban Board" },
];

const professionalToolsItems = [
  { path: "/resume-review", icon: FileText, label: "Resume Review & Feedback" },
];


export default function Sidebar() {
  const [location] = useLocation();
  const [aiToolsExpanded, setAiToolsExpanded] = useState(location.startsWith('/ai-'));
  const [jobTrackerExpanded, setJobTrackerExpanded] = useState(['/tracker'].includes(location));
  const [professionalToolsExpanded, setProfessionalToolsExpanded] = useState(['/resume-review'].includes(location));

  const isAiToolsActive = location.startsWith('/ai-');
  const isJobTrackerActive = ['/tracker'].includes(location);
  const isProfessionalToolsActive = ['/resume-review'].includes(location);

  return (
    <div className="w-64 bg-white border-r border-border shadow-lg animate-slide-in">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
            <Briefcase className="text-white h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">JobHub</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Career Tools</p>
          </div>
        </div>

        <nav className="space-y-2">
          {/* Top Navigation Items */}
          {navigationItems.slice(0, 3).map((item) => {
            const isActive = location === item.path || (location === "/dashboard" && item.path === "/");
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <div
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`sidebar-item rounded-lg px-4 py-3 cursor-pointer transition-all ${
                    isActive
                      ? "bg-primary/10 border-l-4 border-primary"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* AI Tools - Direct Link */}
          <Link href="/ai-tools">
            <div
              data-testid="nav-ai-tools"
              className={`sidebar-item rounded-lg px-4 py-3 cursor-pointer transition-all ${
                location === '/ai-tools'
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Bot
                  className={`h-5 w-5 ${
                    location === '/ai-tools' ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`font-medium ${
                    location === '/ai-tools' ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  AI Tools
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  FREE
                </span>
              </div>
            </div>
          </Link>

          {/* Job Tracker - Direct Link */}
          <Link href="/tracker">
            <div
              data-testid="nav-job-tracker"
              className={`sidebar-item rounded-lg px-4 py-3 cursor-pointer transition-all ${
                location === '/tracker'
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <KanbanSquare
                  className={`h-5 w-5 ${
                    location === '/tracker' ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`font-medium ${
                    location === '/tracker' ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Job Tracker
                </span>
              </div>
            </div>
          </Link>

          {/* Professional Tools - Direct Link */}
          <Link href="/resume-review">
            <div
              data-testid="nav-professional-tools"
              className={`sidebar-item rounded-lg px-4 py-3 cursor-pointer transition-all ${
                location === '/resume-review'
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Settings
                  className={`h-5 w-5 ${
                    location === '/resume-review' ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`font-medium ${
                    location === '/resume-review' ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Pro Tools
                </span>
              </div>
            </div>
          </Link>

          {/* Contact Management - Single Item */}
          <Link href="/contacts">
            <div
              data-testid="nav-contact-management"
              className={`sidebar-item rounded-lg px-4 py-3 cursor-pointer transition-all ${
                location === '/contacts'
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users
                  className={`h-5 w-5 ${
                    location === '/contacts' ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`font-medium ${
                    location === '/contacts' ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Contact Management
                </span>
              </div>
            </div>
          </Link>

          {/* Remaining Navigation Items */}
          {navigationItems.slice(3).map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <div
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`sidebar-item rounded-lg px-4 py-3 cursor-pointer transition-all ${
                    isActive
                      ? "bg-primary/10 border-l-4 border-primary"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Workflow Progress */}
        <div className="mt-8 p-4 glass-effect rounded-lg">
          <h3 className="text-sm font-semibold text-foreground mb-3">Workflow Progress</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Resume Optimized</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Jobs Discovered</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Database Setup</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
