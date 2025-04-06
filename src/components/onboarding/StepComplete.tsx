
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface StepCompleteProps {
  formData: any;
  onComplete: () => void;
}

export const StepComplete: React.FC<StepCompleteProps> = ({
  formData,
  onComplete,
}) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center">
      <div className="mb-6">
        <CheckCircle2 className="h-20 w-20 text-primary" />
      </div>
      
      <h2 className="text-3xl font-bold mb-4">You're all set!</h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Your household is now ready. Let's start managing expenses, chores, and more.
      </p>
      
      <div className="bg-card border rounded-lg p-4 w-full mb-8 text-left">
        <h3 className="text-lg font-medium mb-2">Your Setup Summary</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Profile</span>
            <span className="font-medium">{formData.profile.name}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Household</span>
            <span className="font-medium">
              {formData.household.type === "create"
                ? formData.household.name
                : "Joined existing"}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Roommates</span>
            <span className="font-medium">
              {formData.roommates.skipInvites
                ? "Will invite later"
                : `${formData.roommates.emails.filter(Boolean).length} invited`}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Currency</span>
            <span className="font-medium">{formData.preferences.currency}</span>
          </li>
        </ul>
      </div>
      
      <Button size="lg" onClick={onComplete}>
        Go to Dashboard
      </Button>
    </div>
  );
};
