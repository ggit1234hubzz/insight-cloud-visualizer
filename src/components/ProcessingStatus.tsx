
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface ProcessingStatusProps {
  status: "idle" | "uploading" | "processing" | "complete" | "error";
  progress?: number;
  message?: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  status,
  progress = 0,
  message
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "processing":
        return "text-ai-blue";
      case "complete":
        return "text-ai-green";
      case "error":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "idle":
        return "Waiting to start";
      case "uploading":
        return message || "Uploading file...";
      case "processing":
        return message || "Processing with AI model...";
      case "complete":
        return message || "Processing complete!";
      case "error":
        return message || "An error occurred";
      default:
        return "";
    }
  };

  if (status === "idle") {
    return null;
  }

  return (
    <Card className="p-6 border border-border shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Status</h3>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        <Progress 
          value={status === "complete" ? 100 : progress} 
          className={status === "processing" ? "animate-pulse" : ""} 
        />
        
        <p className="text-sm text-muted-foreground">{getStatusMessage()}</p>
      </div>
    </Card>
  );
};

export default ProcessingStatus;
