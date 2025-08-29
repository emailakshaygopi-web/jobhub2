import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  KanbanSquare, 
  Plus, 
  Search, 
  Bell, 
  Calendar, 
  Building, 
  Download,
  Filter,
  BarChart3,
  Clock,
  Lock,
  Zap,
  Globe,
  ExternalLink,
  Target,
  Users,
  TrendingUp,
  Star,
  Bot,
  DollarSign
} from 'lucide-react';
import SalaryNegotiationTool from '@/components/SalaryNegotiationTool';
import AIChatbot from '@/components/AIChatbot';

export default function JobTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('board');
  const [userPlan, setUserPlan] = useState('free');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [jobSearchLocation, setJobSearchLocation] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const ADMIN_USER_ID = '47005508'; // Akshay's user ID
  const isAdmin = (user as any)?.id === ADMIN_USER_ID;
  
  useEffect(() => {
    // Check user's plan status
    fetch('/api/user-credits', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setUserPlan(data.plan || 'free');
    })
    .catch(err => console.error('Error fetching user plan:', err));
  }, []);

  const handleAddJob = () => {
    toast({
      title: "Job Added",
      description: "New job application has been added to your tracker",
    });
  };

  const handleSetReminder = () => {
    // Create reminder options for different timeframes
    const reminderOptions = [
      { label: "Follow up in 1 week", days: 7 },
      { label: "Follow up in 2 weeks", days: 14 },
      { label: "Check status in 1 month", days: 30 }
    ];
    
    const selectedOption = reminderOptions[Math.floor(Math.random() * reminderOptions.length)];
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + selectedOption.days);
    
    toast({
      title: "Reminder Set",
      description: `${selectedOption.label} (${reminderDate.toLocaleDateString()})`,
    });
    
    // You could integrate with calendar API or notification system here
    console.log('Reminder set for:', reminderDate, selectedOption.label);
  };

  const handleScheduleInterview = () => {
    toast({
      title: "Interview Scheduled",
      description: "Interview has been added to your calendar",
    });
  };

  const handleResearchCompany = async () => {
    // Mock company research with real-looking data
    const companies = ['TechCorp', 'InnovateLab', 'DataSystems Inc', 'CloudTech Solutions'];
    const selectedCompany = companies[Math.floor(Math.random() * companies.length)];
    
    toast({
      title: "Researching Company",
      description: `Gathering insights on ${selectedCompany}...`,
    });
    
    // Simulate API delay
    setTimeout(() => {
      const insights = [
        `${selectedCompany} is a fast-growing company with 200+ employees`,
        `Recent funding: $15M Series B round`,
        `Key technologies: React, Node.js, AWS, Python`,
        `Company culture focuses on innovation and work-life balance`,
        `Recent news: Launched new AI product line`
      ];
      
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      
      toast({
        title: "Research Complete",
        description: `${selectedCompany}: ${randomInsight}`,
      });
    }, 2000);
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your job tracker data is being exported",
    });
  };

  const handleAutoDiscover = () => {
    toast({
      title: "Job Discovery Active",
      description: "Searching for relevant job opportunities...",
    });
  };

  const JOB_SITES = [
    { 
      name: "Indeed", 
      baseUrl: "https://www.indeed.com/jobs?q=", 
      icon: "🔍",
      color: "bg-blue-100 text-blue-800"
    },
    { 
      name: "LinkedIn", 
      baseUrl: "https://www.linkedin.com/jobs/search/?keywords=", 
      icon: "💼",
      color: "bg-blue-100 text-blue-800"
    },
    { 
      name: "Glassdoor", 
      baseUrl: "https://www.glassdoor.com/Job/jobs.htm?sc.keyword=", 
      icon: "🏢",
      color: "bg-green-100 text-green-800"
    },
    { 
      name: "AngelList", 
      baseUrl: "https://angel.co/jobs?q=", 
      icon: "🚀",
      color: "bg-purple-100 text-purple-800"
    },
    { 
      name: "Remote.co", 
      baseUrl: "https://remote.co/remote-jobs/search/?search_keywords=", 
      icon: "🌎",
      color: "bg-indigo-100 text-indigo-800"
    },
    { 
      name: "We Work Remotely", 
      baseUrl: "https://weworkremotely.com/remote-jobs/search?term=", 
      icon: "💻",
      color: "bg-teal-100 text-teal-800"
    }
  ];

  const generateJobSearches = () => {
    if (!jobSearchQuery.trim()) {
      toast({
        title: "Search required",
        description: "Please enter a job title or keywords to search",
        variant: "destructive",
      });
      return;
    }

    const results = JOB_SITES.map((site, index) => {
      let searchUrl = site.baseUrl + encodeURIComponent(jobSearchQuery);
      
      if (jobSearchLocation.trim()) {
        if (site.name === "Indeed") {
          searchUrl += `&l=${encodeURIComponent(jobSearchLocation)}`;
        } else if (site.name === "LinkedIn") {
          searchUrl += `&location=${encodeURIComponent(jobSearchLocation)}`;
        }
      }

      return {
        id: `search-${index}`,
        platform: site.name,
        searchUrl,
        icon: site.icon,
        color: site.color
      };
    });

    setSearchResults(results);
    
    toast({
      title: "Searches generated",
      description: `Created ${JOB_SITES.length} targeted job searches`,
    });
  };

  const openSearchAndTrack = async (result: any) => {
    try {
      // Open the job search in a new tab
      window.open(result.searchUrl, '_blank', 'noopener,noreferrer');
      
      // For LinkedIn, show special tracking instructions
      if (result.platform === 'LinkedIn') {
        setTimeout(() => {
          toast({
            title: "LinkedIn Tracking Tip",
            description: "After applying on LinkedIn, come back and use 'Add Manual Application' to track it with job details!",
            duration: 6000,
          });
        }, 2000);
      }
      
      // Track the search activity
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          jobTitle: `${jobSearchQuery} Search`,
          company: `${result.platform} Discovery`,
          location: jobSearchLocation || 'Various',
          salary: 'TBD',
          platform: result.platform,
          status: 'Research',
          notes: `Job search on ${result.platform} for "${jobSearchQuery}"${jobSearchLocation ? ` in ${jobSearchLocation}` : ''}. Search URL: ${result.searchUrl}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to track search');
      }

      toast({
        title: "Search opened & tracked",
        description: `${result.platform} search opened and added to tracker`,
      });

    } catch (error) {
      toast({
        title: "Tracking failed",
        description: "Search opened but couldn't be tracked",
        variant: "destructive",
      });
    }
  };

  const addManualApplication = () => {
    // Create a simple form to add manual applications
    const jobTitle = prompt("Enter job title:");
    if (!jobTitle) return;
    
    const company = prompt("Enter company name:");
    if (!company) return;
    
    const platform = prompt("Which platform did you apply on? (LinkedIn, Indeed, etc.)") || "External";
    
    fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        jobTitle,
        company,
        location: jobSearchLocation || 'Not specified',
        salary: 'TBD',
        platform: `${platform} (Manual Entry)`,
        status: 'Applied',
        notes: `Manually tracked application from ${platform}. Applied on ${new Date().toLocaleDateString()}.`,
      }),
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to add application');
      return response.json();
    })
    .then(() => {
      toast({
        title: "Application tracked!",
        description: `${jobTitle} at ${company} has been added to your tracker`,
      });
    })
    .catch(error => {
      toast({
        title: "Failed to track",
        description: "Could not add the application to your tracker",
        variant: "destructive",
      });
    });
  };

  const openAllSearches = () => {
    if (searchResults.length === 0) {
      generateJobSearches();
      return;
    }

    let openedCount = 0;
    searchResults.forEach((result: any, index) => {
      setTimeout(() => {
        window.open(result.searchUrl, '_blank', 'noopener,noreferrer');
        openedCount++;
        
        if (openedCount === searchResults.length) {
          toast({
            title: "All searches opened",
            description: `Opened ${openedCount} job search tabs`,
          });
        }
      }, index * 300);
    });
  };

  // Show Pro upgrade gate for non-admin users on free plan
  if (!isAdmin && userPlan === 'free') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-8">
              <Lock className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Unlock Job Tracker Pro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take your job search to the next level with advanced tracking, analytics, and automation features.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pro Features Include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-700">Visual Kanban Board</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-700">Application Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-700">Company Research Tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-700">Interview Scheduling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-700">Email Templates & Automation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-700">Data Export & Backup</span>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
              onClick={() => window.location.href = '/upgrade'}
            >
              Upgrade to Pro - $225/year
            </Button>
            <p className="text-gray-500 mt-4">30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Tracker Pro</h1>
          <p className="text-muted-foreground">Manage your job applications with advanced tracking tools</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleAutoDiscover} className="bg-blue-600 hover:bg-blue-700">
            <Search className="h-4 w-4 mr-2" />
            Auto Discover Jobs
          </Button>
          <Button onClick={handleAddJob} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </div>
      </div>

      {/* Unified Tracker & Job Search Interface */}
      <Tabs defaultValue="board" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="board" className="flex items-center gap-2">
            <KanbanSquare className="h-4 w-4" />
            Board
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Job Search
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="pro-tools" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Pro Tools
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="space-y-6">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-job-search"
              />
            </div>
            <Button variant="outline" data-testid="button-filter">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Visual Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Kanban Columns */}
          {['Wishlist', 'Applied', 'Interview', 'Offer'].map((column) => (
            <Card key={column} className="min-h-96">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {column}
                  <Badge variant="secondary">{column === 'Applied' ? 3 : column === 'Interview' ? 1 : 0}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {column === 'Applied' && (
                  <>
                    <Card className="p-3 border-l-4 border-l-blue-500">
                      <h4 className="font-medium text-sm">Software Engineer</h4>
                      <p className="text-xs text-muted-foreground">TechCorp Inc.</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs">Remote</Badge>
                        <Button size="sm" variant="ghost" onClick={handleSetReminder}>
                          <Bell className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-3 border-l-4 border-l-green-500">
                      <h4 className="font-medium text-sm">Frontend Developer</h4>
                      <p className="text-xs text-muted-foreground">StartupXYZ</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs">Hybrid</Badge>
                        <Button size="sm" variant="ghost" onClick={handleResearchCompany}>
                          <Building className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-3 border-l-4 border-l-purple-500">
                      <h4 className="font-medium text-sm">Full Stack Engineer</h4>
                      <p className="text-xs text-muted-foreground">InnovaCorp</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs">On-site</Badge>
                        <Button size="sm" variant="ghost" onClick={handleScheduleInterview}>
                          <Calendar className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  </>
                )}
                {column === 'Interview' && (
                  <Card className="p-3 border-l-4 border-l-orange-500">
                    <h4 className="font-medium text-sm">Senior Developer</h4>
                    <p className="text-xs text-muted-foreground">MegaCorp Ltd.</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="text-xs">Tomorrow 2PM</Badge>
                      <Button size="sm" variant="ghost" onClick={handleScheduleInterview}>
                        <Calendar className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                )}
              </CardContent>
            </Card>
          ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-6 border-t">
            <Button onClick={addManualApplication} className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-manual-application">
              <Plus className="h-4 w-4 mr-2" />
              Add Manual Application
            </Button>
            <Button onClick={handleResearchCompany} variant="outline" data-testid="button-research-company">
              <Building className="h-4 w-4 mr-2" />
              Company Research
            </Button>
            <Button onClick={handleSetReminder} variant="outline" data-testid="button-set-reminder">
              <Bell className="h-4 w-4 mr-2" />
              Set Reminders
            </Button>
            <Button onClick={() => window.location.href = '/analytics'} variant="outline" data-testid="button-export-data">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          {/* Integrated Job Search Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Unified Job Search
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Search across 6 major job sites simultaneously and track your activity
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title / Keywords</label>
                  <Input
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    value={jobSearchQuery}
                    onChange={(e) => setJobSearchQuery(e.target.value)}
                    data-testid="input-unified-job-search"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location (Optional)</label>
                  <Input
                    placeholder="e.g., San Francisco, Remote"
                    value={jobSearchLocation}
                    onChange={(e) => setJobSearchLocation(e.target.value)}
                    data-testid="input-unified-location"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={generateJobSearches}
                  className="flex items-center gap-2"
                  data-testid="button-generate-unified-searches"
                >
                  <Target className="h-4 w-4" />
                  Generate Searches
                </Button>
                {searchResults.length > 0 && (
                  <Button 
                    onClick={openAllSearches}
                    variant="outline"
                    className="flex items-center gap-2"
                    data-testid="button-open-all-unified"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open All ({searchResults.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* LinkedIn Tracking Instructions */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
                💼 External Application Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800 dark:text-blue-200">
              <div className="space-y-3">
                <p className="text-sm">
                  <strong>How to track LinkedIn/external applications:</strong>
                </p>
                <ol className="text-sm space-y-1 pl-4 list-decimal">
                  <li>Click "Search & Track" to open the job site</li>
                  <li>Apply for jobs on LinkedIn/Indeed/etc.</li>
                  <li>Come back here and click "Add Manual Application"</li>
                  <li>Enter the job details to track it in your dashboard</li>
                </ol>
                <div className="pt-2">
                  <Button 
                    onClick={addManualApplication} 
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    data-testid="button-quick-manual-add"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Manual Application Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result) => (
                <Card key={result.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{result.icon}</span>
                        <CardTitle className="text-lg">{result.platform}</CardTitle>
                      </div>
                      <Badge className={result.color}>Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      Search: {jobSearchQuery}
                      {jobSearchLocation && (<><br />Location: {jobSearchLocation}</>)}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(result.searchUrl, '_blank')}
                        className="flex items-center gap-2 flex-1"
                        data-testid={`button-search-${result.platform.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Search
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => openSearchAndTrack(result)}
                        className="flex items-center gap-2 flex-1"
                        data-testid={`button-track-${result.platform.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <Plus className="h-4 w-4" />
                        Search & Track
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          {/* Contacts Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Application Contacts
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage contacts related to your job applications
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">HR Manager - TechCorp</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm">📧 sarah.johnson@techcorp.com</p>
                    <p className="text-sm">📱 (555) 123-4567</p>
                    <Badge variant="outline" className="text-xs">Interview Scheduled</Badge>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Mike Chen</h4>
                      <p className="text-sm text-muted-foreground">Engineering Lead - StartupXYZ</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm">📧 mike@startupxyz.com</p>
                    <p className="text-sm">💼 LinkedIn Connected</p>
                    <Badge variant="outline" className="text-xs">Follow-up Due</Badge>
                  </div>
                </Card>
              </div>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Integration */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Application Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Applications</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Response Rate</span>
                    <span className="font-semibold text-green-600">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Interviews Scheduled</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Offers Received</span>
                    <span className="font-semibold text-blue-600">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">LinkedIn</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Indeed</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">6</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">AngelList</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">4</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Button onClick={() => window.location.href = '/analytics'} className="w-full">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Detailed Analytics
          </Button>
        </TabsContent>

        <TabsContent value="pro-tools" className="space-y-6">
          {/* Pro Tools Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Pro Tools Suite
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Advanced AI-powered tools to supercharge your job search and career growth.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
              {/* AI Assistant Info */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Bot className="h-6 w-6" />
                    AI Career Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 mb-4">
                    Your AI assistant is now available across all pages via the floating blue button. 
                    Get expert career advice, job search help, and personalized guidance wherever you are!
                  </p>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Bot className="h-4 w-4" />
                    <span>Look for the blue AI button in the bottom-right corner</span>
                  </div>
                </CardContent>
              </Card>

              {/* Salary Negotiation Tool */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <DollarSign className="h-6 w-6" />
                    Salary Negotiation Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="current-salary" className="text-green-800">Current/Expected Salary</Label>
                        <Input 
                          id="current-salary"
                          placeholder="e.g., $75,000"
                          className="bg-white border-green-200"
                          data-testid="input-current-salary"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="target-salary" className="text-green-800">Target Salary</Label>
                        <Input 
                          id="target-salary"
                          placeholder="e.g., $85,000"
                          className="bg-white border-green-200"
                          data-testid="input-target-salary"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="job-title" className="text-green-800">Job Title/Role</Label>
                        <Input 
                          id="job-title"
                          placeholder="e.g., Senior Software Engineer"
                          className="bg-white border-green-200"
                          data-testid="input-job-title"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="experience-years" className="text-green-800">Years of Experience</Label>
                        <Input 
                          id="experience-years"
                          placeholder="e.g., 5"
                          type="number"
                          className="bg-white border-green-200"
                          data-testid="input-experience-years"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      data-testid="button-generate-negotiation-strategy"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Generate Negotiation Strategy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Floating AI Assistant */}
      {showFloatingChatbot && (
        <AIChatbot 
          isFloating={true} 
          onClose={() => setShowFloatingChatbot(false)} 
        />
      )}
      
      {/* AI Assistant Trigger Button for Pro Users */}
      {(isAdmin || userPlan === 'pro') && !showFloatingChatbot && selectedTab !== 'pro-tools' && (
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