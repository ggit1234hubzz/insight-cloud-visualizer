
import React from "react";
import { Ai, Cloud } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b border-border bg-white">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="bg-ai-gradient p-1.5 rounded-md">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-ai-gradient">
            Cloud AI Research
          </h1>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a href="#" className="text-sm font-medium hover:text-primary">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium hover:text-primary">
                Models
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium hover:text-primary">
                Docs
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
