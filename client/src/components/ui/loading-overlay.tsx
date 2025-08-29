import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  title?: string;
  message?: string;
}

export default function LoadingOverlay({ 
  isVisible, 
  title = "Processing...", 
  message = "Please wait while we process your request." 
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 animate-fade-in">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}
