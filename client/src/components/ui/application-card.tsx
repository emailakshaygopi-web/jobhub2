import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Mail, Search } from "lucide-react";
import type { JobApplication } from "@shared/schema";

interface ApplicationCardProps {
  application: JobApplication;
  onEdit?: (id: string) => void;
  onSendEmail?: (id: string) => void;
  onResearch?: (company: string) => void;
}

const statusStyles = {
  "Applied": "status-applied",
  "Interview": "status-interview", 
  "Under Review": "status-review",
  "Rejected": "status-rejected",
};

export default function ApplicationCard({ 
  application, 
  onEdit, 
  onSendEmail, 
  onResearch 
}: ApplicationCardProps) {
  const getInitials = (company: string) => {
    return company
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const statusClass = statusStyles[application.status as keyof typeof statusStyles] || "status-applied";

  return (
    <Card className="application-card bg-gray-50/50 hover:shadow-lg transition-all">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {getInitials(application.company)}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground" data-testid={`job-title-${application.id}`}>
                {application.jobTitle}
              </h4>
              <p className="text-sm text-muted-foreground" data-testid={`company-${application.id}`}>
                {application.company} • {application.location}
              </p>
              <p className="text-xs text-muted-foreground">
                Applied {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : "Date not specified"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className={`${statusClass} text-white px-3 py-1 rounded-full text-xs font-medium`}>
              {application.status}
            </Badge>
            <span className="text-sm font-semibold text-foreground">
              {application.salary}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-muted-foreground">
            Platform: {application.platform}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(application.id)}
              data-testid={`button-edit-${application.id}`}
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSendEmail?.(application.id)}
              data-testid={`button-email-${application.id}`}
            >
              <Mail className="h-4 w-4 text-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onResearch?.(application.company)}
              data-testid={`button-research-${application.id}`}
            >
              <Search className="h-4 w-4 text-purple-600" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
