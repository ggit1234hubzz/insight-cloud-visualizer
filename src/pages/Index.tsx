
import React from "react";
import Header from "@/components/Header";
import AIResearchDashboard from "@/components/AIResearchDashboard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <AIResearchDashboard />
      </main>
    </div>
  );
};

export default Index;
