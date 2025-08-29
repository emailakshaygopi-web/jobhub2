import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/components/layout/main-layout";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import AITools from "@/pages/AITools";
import Tracker from "@/pages/Tracker";
import ResumeTools from "@/pages/ResumeTools";
import AIToolsProduct from "@/pages/AIToolsProduct";
import ResumeToolsProduct from "@/pages/ResumeToolsProduct";
import TrackerProduct from "@/pages/TrackerProduct";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import GaneshOffer from "@/pages/GaneshOffer";
import Dashboard from "@/pages/dashboard";
import ResumeAnalysis from "@/pages/resume-analysis";
import JobSearch from "@/pages/job-search";
import Applications from "@/pages/applications";
import CoverLetters from "@/pages/cover-letters";
import Analytics from "@/pages/analytics";
import JobTracker from "@/pages/JobTracker";
import ProfessionalTools from "@/pages/ProfessionalTools";
import ContactManagement from "@/pages/ContactManagement";
import DocumentUpload from "@/pages/DocumentUpload";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/product/tracker" component={TrackerProduct} />
          <Route path="/product/ai-tools" component={AIToolsProduct} />
          <Route path="/product/resume-tools" component={ResumeToolsProduct} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
          <Route path="/ganesh-offer" component={GaneshOffer} />
        </>
      ) : (
        <MainLayout>
          <Route path="/" component={Home} />
          <Route path="/tracker" component={JobTracker} />
          <Route path="/ai-tools" component={AITools} />
          <Route path="/resume-tools" component={ResumeTools} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/resume" component={ResumeAnalysis} />
          <Route path="/job-search" component={JobSearch} />
          <Route path="/applications" component={Applications} />
          <Route path="/cover-letters" component={CoverLetters} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/resume-review" component={ProfessionalTools} />
          <Route path="/contacts" component={ContactManagement} />
          <Route path="/upload" component={DocumentUpload} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/reminders" component={JobTracker} />
          <Route path="/interviews" component={JobTracker} />
          <Route path="/job-discovery" component={JobTracker} />
          <Route path="/company-research" component={JobTracker} />
          <Route path="/export" component={JobTracker} />
        </MainLayout>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
