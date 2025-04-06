
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface StepWelcomeProps {
  nextStep: () => void;
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({ nextStep }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center flex-1 py-8">
      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-20 h-20 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Welcome to RoomMate AI!</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Let's set up your shared space in a few quick steps. It'll only take a minute!
      </p>
      
      <Button onClick={nextStep} size="lg" className="flex items-center">
        Get Started <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
