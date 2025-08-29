import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search, MapPin, Globe, ExternalLink, Briefcase, Target, Plus, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import AIChatbot from "@/components/AIChatbot";

interface JobSearchResult {
  id: string;
  title: string;
  company: string;
  location: string;
  platform: string;
  searchUrl: string;
  description: string;
}

const JOB_SITES = [
  { 
    name: "Indeed", 
    baseUrl: "https://www.indeed.com/jobs?q=", 
    icon: "🔍",
    description: "World's largest job site with millions of opportunities"
  },
  { 
    name: "LinkedIn Jobs", 
    baseUrl: "https://www.linkedin.com/jobs/search/?keywords=", 
    icon: "💼",
    description: "Professional network with career opportunities"
  },
  { 
    name: "Glassdoor", 
    baseUrl: "https://www.glassdoor.com/Job/jobs.htm?sc.keyword=", 
    icon: "🏢",
    description: "Job search with company reviews and salary insights"
  },
  { 
    name: "AngelList", 
    baseUrl: "https://angel.co/jobs?q=", 
    icon: "🚀",
    description: "Startup jobs and tech opportunities"
  },
  { 
    name: "Remote.co", 
    baseUrl: "https://remote.co/remote-jobs/search/?search_keywords=", 
    icon: "🌎",
    description: "Remote work opportunities across all industries"
  },
  { 
    name: "We Work Remotely", 
    baseUrl: "https://weworkremotely.com/remote-jobs/search?term=", 
    icon: "💻",
    description: "The largest remote work community"
  }
];

export default function JobSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState<JobSearchResult[]>([]);
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const ADMIN_USER_ID = '47005508';
  const isAdmin = (user as any)?.id === ADMIN_USER_ID;

  const { data: userCredits } = useQuery({
    queryKey: ["/api/user-credits"],
  });

  const generateSearchResults = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search required",
        description: "Please enter a job title or keywords to search",
        variant: "destructive",
      });
      return;
    }

    const results: JobSearchResult[] = JOB_SITES.map((site, index) => {
      let searchUrl = site.baseUrl + encodeURIComponent(searchQuery);
      
      // Add location parameter for sites that support it
      if (location.trim()) {
        if (site.name === "Indeed") {
          searchUrl += `&l=${encodeURIComponent(location)}`;
        } else if (site.name === "LinkedIn Jobs") {
          searchUrl += `&location=${encodeURIComponent(location)}`;
        } else if (site.name === "Glassdoor") {
          searchUrl += `&locT=C&locId=${encodeURIComponent(location)}`;
        }
      }

      return {
        id: `search-${index}`,
        title: `${searchQuery} Jobs`,
        company: site.name,
        location: location || "Worldwide",
        platform: site.name,
        searchUrl,
        description: site.description
      };
    });

    setSearchResults(results);
    
    toast({
      title: "Search prepared",
      description: `Generated search links for ${JOB_SITES.length} major job sites`,
    });
  };

  const handleQuickApply = async (jobId: string) => {
    try {
      const job = searchResults.find(j => j.id === jobId);
      if (!job) {
        throw new Error('Job search not found');
      }

      // Open the job search in a new tab
      window.open(job.searchUrl, '_blank', 'noopener,noreferrer');
      
      // Create a manual application entry for tracking
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          jobTitle: `${searchQuery} opportunities`,
          company: `${job.platform} Search`,
          location: job.location,
          salary: 'To be determined',
          platform: job.platform,
          status: 'Research',
          notes: `Job search on ${job.platform} for "${searchQuery}" in ${job.location}. Search URL: ${job.searchUrl}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Application tracking failed:', response.status, errorData);
        if (response.status === 401) {
          throw new Error('Please log in to track your job searches');
        }
        throw new Error(`Failed to track search: ${response.status}`);
      }

      toast({
        title: "Search opened & tracked",
        description: `Opened ${job.platform} job search in new tab and added to your application tracker for follow-up`,
      });

    } catch (error: any) {
      console.error('Search tracking failed:', error);
      toast({
        title: "Tracking failed",
        description: error.message || "Unable to track this search. The job site will still open.",
        variant: "destructive",
      });
    }
  };

  const openAllSearches = () => {
    if (searchResults.length === 0) {
      generateSearchResults();
      return;
    }

    let openedCount = 0;
    searchResults.forEach((result, index) => {
      setTimeout(() => {
        window.open(result.searchUrl, '_blank', 'noopener,noreferrer');
        openedCount++;
        
        if (openedCount === searchResults.length) {
          toast({
            title: "All searches opened",
            description: `Opened ${openedCount} job search tabs. Check each one for opportunities!`,
          });
        }
      }, index * 500); // Stagger opening by 500ms
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🌐 Internet Job Search
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Search across major job sites instantly. Find opportunities on Indeed, LinkedIn, Glassdoor and more.
        </p>
      </div>

      {/* Search Interface */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Job Search Generator
          </CardTitle>
          <CardDescription>
            Enter your search criteria to generate targeted searches across multiple job platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title / Keywords</label>
              <Input
                placeholder="e.g., Software Engineer, Marketing Manager"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-job-search"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location (Optional)</label>
              <Input
                placeholder="e.g., San Francisco, Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                data-testid="input-location"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={generateSearchResults}
              className="flex items-center gap-2"
              data-testid="button-generate-searches"
            >
              <Target className="h-4 w-4" />
              Generate Searches
            </Button>
            {searchResults.length > 0 && (
              <Button 
                onClick={openAllSearches}
                variant="outline"
                className="flex items-center gap-2"
                data-testid="button-open-all"
              >
                <Globe className="h-4 w-4" />
                Open All ({searchResults.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Generated Job Searches</h2>
            <Badge variant="secondary" data-testid="text-search-count">
              {searchResults.length} searches ready
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="text-xl">
                          {JOB_SITES.find(site => site.name === result.platform)?.icon}
                        </span>
                        {result.platform}
                      </CardTitle>
                      <CardDescription>{result.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Briefcase className="h-4 w-4" />
                      <span>Searching: {searchQuery}</span>
                    </div>
                    {location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4" />
                        <span>Location: {location}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(result.searchUrl, '_blank', 'noopener,noreferrer')}
                      className="flex items-center gap-2"
                      data-testid={`button-search-${result.platform.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Search Jobs
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleQuickApply(result.id)}
                      className="flex items-center gap-2"
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
        </div>
      )}

      {/* Tips Section */}
      <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">💡 Search Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 dark:text-blue-200">
          <ul className="space-y-2 text-sm">
            <li>• Use specific job titles (e.g., "Frontend Developer" vs "Developer")</li>
            <li>• Include key skills in your search (e.g., "React Developer", "Marketing Manager")</li>
            <li>• Use "Search & Track" to add your searches to the application tracker</li>
            <li>• Try different keyword variations across multiple sites</li>
            <li>• Set up job alerts on the sites you visit most frequently</li>
          </ul>
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