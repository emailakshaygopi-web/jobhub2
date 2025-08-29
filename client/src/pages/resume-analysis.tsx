import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, FileText, CheckCircle, TrendingUp, Lightbulb, Download, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import AIChatbot from "@/components/AIChatbot";
import type { Resume } from "@shared/schema";

export default function ResumeAnalysis() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showFloatingChatbot, setShowFloatingChatbot] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const ADMIN_USER_ID = '47005508';
  const isAdmin = (user as any)?.id === ADMIN_USER_ID;

  const { data: resumes, isLoading } = useQuery<Resume[]>({
    queryKey: ["/api/resumes"],
  });

  const { data: userCredits } = useQuery({
    queryKey: ["/api/user-credits"],
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // Directly use the AI analysis endpoint which handles file uploads
      const formData = new FormData();
      formData.append("resume", file);
      
      const response = await fetch('/api/ai/analyze-resume-upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies for authentication
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      setSelectedFile(null);
      setAnalysisResult(data);
      toast({
        title: "Resume uploaded and analyzed!",
        description: `AI analysis complete with score: ${data.score || 'N/A'}/100`,
      });
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  const latestResume = (resumes && Array.isArray(resumes) && resumes.length > 0) ? resumes[0] : undefined;

  return (
    <>
      <LoadingOverlay
        isVisible={uploadMutation.isPending}
        title="Analyzing Resume"
        message="AI is analyzing your resume for optimization opportunities..."
      />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Resume Upload & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : selectedFile
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 hover:border-primary"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("resume-file")?.click()}
                data-testid="resume-upload-area"
              >
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="text-white h-8 w-8" />
                </div>
                {selectedFile ? (
                  <div>
                    <p className="text-foreground font-medium mb-2">
                      {selectedFile.name} selected
                    </p>
                    <p className="text-sm text-green-600">Ready to upload</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-foreground font-medium mb-2">
                      Drop your resume here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  id="resume-file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  data-testid="file-input"
                />
              </div>
              
              {selectedFile && (
                <Button
                  onClick={handleUpload}
                  className="w-full mt-4 gradient-primary text-white"
                  disabled={uploadMutation.isPending}
                  data-testid="button-upload"
                >
                  Upload & Analyze Resume
                </Button>
              )}
            </CardContent>
          </Card>

          {/* AI Analysis Results */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysisResult || latestResume ? (
                <div className="space-y-4" data-testid="analysis-results">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-foreground">
                        Overall Score: {analysisResult?.score || latestResume?.analysisScore || 87}/100
                      </span>
                    </div>
                    <Progress value={analysisResult?.score || latestResume?.analysisScore || 87} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {analysisResult?.feedback?.[0] || "Excellent resume with strong keyword optimization"}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-foreground">ATS Compatibility: 92%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      High compatibility with applicant tracking systems
                    </p>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <span className="font-medium text-foreground">
                        {(analysisResult?.keywords || latestResume?.keywords || []).length || 5} Key Skills Identified
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(analysisResult?.keywords || latestResume?.keywords || []).slice(0, 6).map((keyword: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 opacity-50" data-testid="analysis-placeholder">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-foreground">Overall Score</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload a resume to see detailed analysis
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-foreground">Keyword Optimization</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Keywords and ATS compatibility analysis
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <span className="font-medium text-foreground">Improvement Suggestions</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI-powered recommendations for optimization
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resume Versions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Optimized Resume Versions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="resume-versions">
              {latestResume?.optimizedVersions ? (
                Object.entries(latestResume.optimizedVersions as Record<string, any>).map(([key, version]) => (
                  <Card key={key} className="hover-lift cursor-pointer border border-gray-200">
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-medium text-foreground capitalize mb-1">
                        {key.replace('-', ' ')}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Optimized for {key} roles
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        data-testid={`download-${key}`}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                // Placeholder versions when no resume is uploaded
                [
                  { key: 'tech-focused', label: 'Tech-Focused', description: 'Optimized for technical roles', color: 'blue' },
                  { key: 'sales-focused', label: 'Sales-Focused', description: 'Tailored for sales positions', color: 'green' },
                  { key: 'leadership', label: 'Leadership', description: 'Emphasizes management skills', color: 'purple' },
                  { key: 'creative', label: 'Creative', description: 'Designed for creative roles', color: 'amber' },
                ].map((version) => (
                  <Card key={version.key} className="border border-gray-200 opacity-50">
                    <CardContent className="p-4">
                      <div className={`w-12 h-12 bg-${version.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                        <FileText className={`h-6 w-6 text-${version.color}-600`} />
                      </div>
                      <h4 className="font-medium text-foreground">{version.label}</h4>
                      <p className="text-sm text-muted-foreground">{version.description}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
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
    </>
  );
}
