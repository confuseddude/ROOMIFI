
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Home } from "lucide-react";

interface HouseholdData {
  type: "create" | "join";
  name: string;
  inviteCode: string;
}

interface StepHouseholdProps {
  data: HouseholdData;
  updateData: (data: Partial<HouseholdData>) => void;
}

export const StepHousehold: React.FC<StepHouseholdProps> = ({
  data,
  updateData,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Set up your household</h2>
        <p className="text-muted-foreground">
          Create a new household or join an existing one
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant={data.type === "create" ? "default" : "outline"}
          className="h-auto py-6 flex flex-col items-center"
          onClick={() => updateData({ type: "create" })}
        >
          <PlusCircle className="h-8 w-8 mb-2" />
          <div className="text-sm font-medium">Create New</div>
          <div className="text-xs opacity-80 mt-1">Start from scratch</div>
        </Button>
        
        <Button
          type="button"
          variant={data.type === "join" ? "default" : "outline"}
          className="h-auto py-6 flex flex-col items-center"
          onClick={() => updateData({ type: "join" })}
        >
          <Home className="h-8 w-8 mb-2" />
          <div className="text-sm font-medium">Join Existing</div>
          <div className="text-xs opacity-80 mt-1">Use invite code</div>
        </Button>
      </div>

      <div className="space-y-4">
        {data.type === "create" ? (
          <div>
            <Label htmlFor="householdName">Household Name</Label>
            <Input
              id="householdName"
              placeholder="e.g. The Roomies, 123 Main St"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              className="mt-1"
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="inviteCode">Invitation Code</Label>
            <Input
              id="inviteCode"
              placeholder="Enter the code you received"
              value={data.inviteCode}
              onChange={(e) => updateData({ inviteCode: e.target.value })}
              className="mt-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};
