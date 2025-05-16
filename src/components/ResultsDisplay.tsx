
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, ChartLine, ChartPie } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export interface AnalysisResult {
  id: string;
  title: string;
  summary: string;
  type: "text" | "bar-chart" | "pie-chart" | "line-chart";
  data?: any[];
}

interface ResultsDisplayProps {
  results: AnalysisResult[];
}

const COLORS = ['#2563eb', '#8b5cf6', '#4f46e5', '#0d9488', '#22c55e'];

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analysis Results</h2>
      
      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            Visual Results
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-2">
            <ChartLine className="h-4 w-4" />
            Detailed Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="visual" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results
              .filter(result => result.type !== "text")
              .map(result => (
                <Card key={result.id} className="result-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{result.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result.type === "bar-chart" && result.data && (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={result.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                    {result.type === "pie-chart" && result.data && (
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={result.data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8b5cf6"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {result.data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                    {result.type === "line-chart" && result.data && (
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={result.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                    <p className="mt-4 text-sm text-muted-foreground">
                      {result.summary}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="detailed" className="pt-4">
          <div className="space-y-6">
            {results.map(result => (
              <Card key={result.id} className="result-card">
                <CardHeader>
                  <CardTitle>{result.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{result.summary}</p>
                  
                  {result.type === "text" && (
                    <div className="mt-4 p-4 bg-muted rounded-md text-sm">
                      <pre className="whitespace-pre-wrap font-mono">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
