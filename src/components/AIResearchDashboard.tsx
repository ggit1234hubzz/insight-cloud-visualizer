import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ModelSelector, { ModelOption } from "./ModelSelector";
import ProcessingStatus from "./ProcessingStatus";
import ResultsDisplay, { AnalysisResult } from "./ResultsDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChartArea } from "lucide-react";

// Mock available models
const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "text-analysis",
    name: "Text Analysis Model",
    description: "Analyzes text documents for sentiment, entities, and key topics.",
    category: "Text Processing"
  },
  {
    id: "image-classification",
    name: "Image Classification",
    description: "Identifies objects and scenes in images with high accuracy.",
    category: "Computer Vision"
  },
  {
    id: "data-clustering",
    name: "Data Clustering",
    description: "Groups similar data points to discover patterns.",
    category: "Data Analysis"
  },
  {
    id: "sentiment-analysis",
    name: "Sentiment Analysis",
    description: "Determines the emotional tone behind text content.",
    category: "Text Processing"
  },
  {
    id: "object-detection",
    name: "Object Detection",
    description: "Locates and identifies multiple objects in images with bounding boxes.",
    category: "Computer Vision"
  }
];

// Mock processing function to simulate AI model analysis
const mockProcessFile = (file: File, modelId: string): Promise<AnalysisResult[]> => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      if (modelId === "text-analysis" || modelId === "sentiment-analysis") {
        resolve([
          {
            id: "sentiment",
            title: "Sentiment Analysis",
            summary: "The overall sentiment is positive with 72% confidence.",
            type: "pie-chart",
            data: [
              { name: "Positive", value: 72 },
              { name: "Neutral", value: 18 },
              { name: "Negative", value: 10 }
            ]
          },
          {
            id: "keywords",
            title: "Key Topics",
            summary: "The most frequent topics found in the document.",
            type: "bar-chart",
            data: [
              { name: "Technology", value: 65 },
              { name: "Innovation", value: 48 },
              { name: "Research", value: 37 },
              { name: "Data", value: 30 },
              { name: "Cloud", value: 25 }
            ]
          },
          {
            id: "text-details",
            title: "Detailed Text Analysis",
            summary: "Complete analysis of the document content including entities, language style, and readability metrics.",
            type: "text",
            data: [
              { name: "Word Count", value: "1250" },
              { name: "Readability", value: "College level" },
              { name: "Top Entities", value: "Cloud AI, Machine Learning, Data Analysis" },
              { name: "Language Style", value: "Technical, Informational" },
              { name: "Reading Time", value: "5 minutes" }
            ]
          }
        ]);
      } else if (modelId === "image-classification" || modelId === "object-detection") {
        resolve([
          {
            id: "objects",
            title: "Detected Objects",
            summary: "Objects identified in the image with confidence scores.",
            type: "bar-chart",
            data: [
              { name: "Person", value: 98 },
              { name: "Building", value: 85 },
              { name: "Car", value: 76 },
              { name: "Tree", value: 65 },
              { name: "Sky", value: 95 }
            ]
          },
          {
            id: "scene",
            title: "Scene Classification",
            summary: "The image was classified as an outdoor urban scene with 94% confidence.",
            type: "pie-chart",
            data: [
              { name: "Urban", value: 94 },
              { name: "Indoor", value: 3 },
              { name: "Nature", value: 3 }
            ]
          }
        ]);
      } else if (modelId === "data-clustering") {
        resolve([
          {
            id: "clusters",
            title: "Data Clusters",
            summary: "Identified groups within the dataset.",
            type: "pie-chart",
            data: [
              { name: "Cluster 1", value: 45 },
              { name: "Cluster 2", value: 30 },
              { name: "Cluster 3", value: 25 }
            ]
          },
          {
            id: "trend",
            title: "Data Trend Analysis",
            summary: "Trend line showing patterns in the data over time.",
            type: "line-chart",
            data: [
              { name: "Jan", value: 34 },
              { name: "Feb", value: 45 },
              { name: "Mar", value: 40 },
              { name: "Apr", value: 65 },
              { name: "May", value: 85 },
              { name: "Jun", value: 72 }
            ]
          }
        ]);
      } else {
        resolve([
          {
            id: "default",
            title: "Analysis Results",
            summary: "Basic analysis completed successfully.",
            type: "text",
            data: [
              { name: "Status", value: "Completed" },
              { name: "Confidence", value: "High" }
            ]
          }
        ]);
      }
    }, 2000);
  });
};

const AIResearchDashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "complete" | "error">("idle");
  const [progress, setProgress] = useState<number>(0);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    setStatus("uploading");
    setUploading(true);
    
    // Simulate file upload with progress
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 10;
      setProgress(uploadProgress);
      
      if (uploadProgress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setStatus("idle");
        toast({
          title: "File uploaded successfully",
          description: `${file.name} is ready for processing`,
        });
      }
    }, 300);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleProcess = async () => {
    if (!selectedFile || !selectedModel) {
      toast({
        title: "Missing information",
        description: "Please select both a file and an AI model",
        variant: "destructive"
      });
      return;
    }

    setStatus("processing");
    setProcessing(true);
    setProgress(0);
    setResults([]);
    
    try {
      // Simulate processing progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 500);
      
      // Process the file
      const analysisResults = await mockProcessFile(selectedFile, selectedModel);
      
      clearInterval(progressInterval);
      setProgress(100);
      setResults(analysisResults);
      setStatus("complete");
      
      toast({
        title: "Analysis complete",
        description: "View your results below",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Processing failed",
        description: "There was an error processing your file",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FileUpload 
            onUpload={handleFileUpload} 
            isUploading={uploading} 
          />
        </div>
        <div>
          <ModelSelector 
            models={AVAILABLE_MODELS}
            selectedModel={selectedModel}
            onSelect={handleModelSelect}
            isProcessing={processing}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProcessingStatus 
            status={status} 
            progress={progress}
          />
        </div>
        <div className="flex justify-center md:justify-end items-end">
          <Button 
            onClick={handleProcess}
            disabled={!selectedFile || !selectedModel || processing || uploading}
            className="w-full md:w-auto"
            size="lg"
          >
            <ChartArea className="mr-2 h-4 w-4" />
            Run Analysis
          </Button>
        </div>
      </div>
      
      {results.length > 0 && (
        <div className="pt-4">
          <ResultsDisplay results={results} />
        </div>
      )}
    </div>
  );
};

export default AIResearchDashboard;
