import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Wand2, Edit, Copy, Download, FileText, Briefcase, TrendingUp, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { apiRequest } from "@/lib/queryClient";
import type { JobApplication, CoverLetter } from "@shared/schema";

export default function CoverLetters() {
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [tone, setTone] = useState<string>("professional");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const { toast } = useToast();

  const { data: applications } = useQuery<JobApplication[]>({
    queryKey: ["/api/applications"],
  });

  const { data: coverLetters } = useQuery<CoverLetter[]>({
    queryKey: ["/api/cover-letters"],
  });

  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/cover-letters/generate", {
        applicationId: selectedApplication,
        tone,
        additionalNotes,
      });
      return response.json();
    },
    onSuccess: (data: CoverLetter) => {
      setGeneratedContent(data.content);
      toast({
        title: "Cover letter generated",
        description: "Your personalized cover letter is ready!",
      });
    },
    onError: () => {
      toast({
        title: "Generation failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!selectedApplication) {
      toast({
        title: "Please select an application",
        description: "Choose an application to generate a cover letter for.",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate();
  };

  const handleCopy = async () => {
    if (generatedContent) {
      await navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied to clipboard",
        description: "Cover letter content has been copied.",
      });
    }
  };

  const handleDownload = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cover-letter.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: "Cover letter has been downloaded as a text file.",
      });
    }
  };

  const selectedApp = (applications && Array.isArray(applications)) ? applications.find((app: JobApplication) => app.id === selectedApplication) : undefined;

  return (
    <>
      <LoadingOverlay
        isVisible={generateMutation.isPending}
        title="Generating Cover Letter"
        message="AI is creating a personalized cover letter using your resume and job details..."
      />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cover Letter Generator */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                AI Cover Letter Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="application-select" className="text-sm font-medium text-foreground mb-2">
                    Select Application
                  </Label>
                  <Select 
                    value={selectedApplication} 
                    onValueChange={setSelectedApplication}
                  >
                    <SelectTrigger data-testid="select-application">
                      <SelectValue placeholder="Choose an application..." />
                    </SelectTrigger>
                    <SelectContent>
                      {(applications && Array.isArray(applications) && applications.length > 0) ? applications.map((app: JobApplication) => (
                        <SelectItem key={app.id} value={app.id}>
                          {app.company} - {app.jobTitle}
                        </SelectItem>
                      )) : null}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tone-select" className="text-sm font-medium text-foreground mb-2">
                    Cover Letter Tone
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger data-testid="select-tone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="confident">Confident</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="additional-notes" className="text-sm font-medium text-foreground mb-2">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="additional-notes"
                    placeholder="Any specific points you want to highlight..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                    data-testid="textarea-notes"
                  />
                </div>
                
                <Button
                  onClick={handleGenerate}
                  className="w-full gradient-primary text-white hover:opacity-90"
                  disabled={!selectedApplication || generateMutation.isPending}
                  data-testid="button-generate"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Cover Letter
                </Button>

                {selectedApp && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-1">Selected Application:</h4>
                    <p className="text-sm text-blue-700">
                      {selectedApp.jobTitle} at {selectedApp.company}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Applied on {selectedApp.appliedAt ? new Date(selectedApp.appliedAt).toLocaleDateString() : "Date not specified"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generated Cover Letter */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Generated Cover Letter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-96 border border-input rounded-lg p-4 overflow-y-auto bg-gray-50"
                data-testid="cover-letter-content"
              >
                {generatedContent ? (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-16">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p>Select an application and click "Generate Cover Letter" to create a personalized cover letter.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    disabled={!generatedContent}
                    data-testid="button-edit"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCopy}
                    disabled={!generatedContent}
                    data-testid="button-copy"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Button
                  onClick={handleDownload}
                  className="gradient-primary text-white hover:opacity-90"
                  disabled={!generatedContent}
                  data-testid="button-download"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cover Letter Templates */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Cover Letter Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover-lift cursor-pointer border border-gray-200" data-testid="template-executive">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Executive Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Perfect for senior leadership roles and C-suite positions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift cursor-pointer border border-gray-200" data-testid="template-sales">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Sales Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Tailored for sales and business development roles
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift cursor-pointer border border-gray-200" data-testid="template-creative">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Palette className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Creative Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Designed for creative and design-focused positions
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Recent Cover Letters */}
        {(coverLetters && Array.isArray(coverLetters) && coverLetters.length > 0) && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Recent Cover Letters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(coverLetters && Array.isArray(coverLetters)) ? coverLetters.slice(0, 5).map((letter: CoverLetter) => (
                  <div 
                    key={letter.id} 
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Cover Letter #{letter.id.slice(-8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Generated {letter.generatedAt ? new Date(letter.generatedAt).toLocaleDateString() : "Date not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )) : null}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
