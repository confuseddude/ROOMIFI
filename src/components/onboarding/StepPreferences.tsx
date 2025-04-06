
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

interface PreferencesData {
  choreRotation: boolean;
  reminderTone: string;
  currency: string;
}

interface StepPreferencesProps {
  data: PreferencesData;
  updateData: (data: Partial<PreferencesData>) => void;
}

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  data,
  updateData,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your preferences</h2>
        <p className="text-muted-foreground">
          Customize how the app works for you
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="chore-rotation" className="font-medium">
              Chore rotation
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Automatically assign and rotate chores
            </p>
          </div>
          <Switch
            id="chore-rotation"
            checked={data.choreRotation}
            onCheckedChange={(checked) =>
              updateData({ choreRotation: checked })
            }
          />
        </div>

        <div className="space-y-3">
          <Label className="font-medium">Reminder tone</Label>
          <RadioGroup
            value={data.reminderTone}
            onValueChange={(value) => updateData({ reminderTone: value })}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kind" id="tone-kind" />
              <Label htmlFor="tone-kind" className="cursor-pointer">Kind</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="tone-neutral" />
              <Label htmlFor="tone-neutral" className="cursor-pointer">Neutral</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sarcastic" id="tone-sarcastic" />
              <Label htmlFor="tone-sarcastic" className="cursor-pointer">Sarcastic</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label htmlFor="currency" className="font-medium">
            Currency
          </Label>
          <div className="flex space-x-3">
            <button
              type="button"
              className={`px-4 py-2 rounded-md border ${
                data.currency === "₹"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-input"
              }`}
              onClick={() => updateData({ currency: "₹" })}
            >
              ₹ Rupee
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md border ${
                data.currency === "$"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-input"
              }`}
              onClick={() => updateData({ currency: "$" })}
            >
              $ Dollar
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md border ${
                data.currency === "€"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-input"
              }`}
              onClick={() => updateData({ currency: "€" })}
            >
              € Euro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
