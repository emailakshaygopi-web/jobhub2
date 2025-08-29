import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Briefcase, ExternalLink } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    salary?: string;
    matchScore?: number;
    url?: string;
  };
  onQuickApply?: (jobId: string) => void;
}

export default function JobCard({ job, onQuickApply }: JobCardProps) {
  const getInitials = (company: string) => {
    return company
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getMatchColor = (score?: number) => {
    if (!score) return 'bg-gray-100 text-gray-800';
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="p-6 hover-lift cursor-pointer" data-testid={`job-card-${job.id}`}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {getInitials(job.company)}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground mb-1" data-testid={`job-title-${job.id}`}>
                {job.title}
              </h4>
              <p className="text-primary font-medium mb-2" data-testid={`job-company-${job.id}`}>
                {job.company}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </span>
                {job.salary && (
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job.salary}
                  </span>
                )}
                <span className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Full-time
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {job.matchScore && (
              <Badge className={`${getMatchColor(job.matchScore)} px-2 py-1 rounded-full text-xs font-medium`}>
                {job.matchScore}% Match
              </Badge>
            )}
            <div className="flex space-x-2">
              {job.url && (
                <Button 
                  variant="outline"
                  size="sm"
                  asChild
                  data-testid={`button-view-${job.id}`}
                >
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Job
                  </a>
                </Button>
              )}
              <Button 
                className="gradient-primary text-white hover:opacity-90"
                onClick={() => onQuickApply?.(job.id)}
                data-testid={`button-apply-${job.id}`}
              >
                Quick Apply
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
