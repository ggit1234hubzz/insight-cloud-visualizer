
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Cloud } from "lucide-react";

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface ModelSelectorProps {
  models: ModelOption[];
  selectedModel: string;
  onSelect: (modelId: string) => void;
  isProcessing: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onSelect,
  isProcessing
}) => {
  // Group models by category
  const modelsByCategory = models.reduce((acc, model) => {
    if (!acc[model.category]) {
      acc[model.category] = [];
    }
    acc[model.category].push(model);
    return acc;
  }, {} as Record<string, ModelOption[]>);

  return (
    <Card className="p-6 border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-full bg-primary/10 p-2">
          <Cloud className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Select AI Model</h3>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="model-select">Choose a model</Label>
          <Select
            value={selectedModel}
            onValueChange={onSelect}
            disabled={isProcessing}
          >
            <SelectTrigger id="model-select">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(modelsByCategory).map(([category, categoryModels]) => (
                <React.Fragment key={category}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    {category}
                  </div>
                  {categoryModels.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                  {/* Add separator except for the last category */}
                  {Object.keys(modelsByCategory).indexOf(category) < Object.keys(modelsByCategory).length - 1 && (
                    <div className="h-px my-1 bg-border" />
                  )}
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedModel && (
          <div className="rounded-md bg-muted p-3 text-sm">
            <p className="font-medium mb-1">
              {models.find(m => m.id === selectedModel)?.name}
            </p>
            <p className="text-muted-foreground">
              {models.find(m => m.id === selectedModel)?.description}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ModelSelector;
