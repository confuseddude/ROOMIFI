
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Link as LinkIcon } from "lucide-react";

interface RoommatesData {
  emails: string[];
  skipInvites: boolean;
}

interface StepRoommatesProps {
  data: RoommatesData;
  updateData: (data: Partial<RoommatesData>) => void;
}

export const StepRoommates: React.FC<StepRoommatesProps> = ({
  data,
  updateData,
}) => {
  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...data.emails];
    newEmails[index] = value;
    updateData({ emails: newEmails });
  };

  const addEmailField = () => {
    updateData({ emails: [...data.emails, ""] });
  };

  const removeEmailField = (index: number) => {
    const newEmails = data.emails.filter((_, i) => i !== index);
    updateData({ emails: newEmails.length ? newEmails : [""] });
  };

  const generateInviteLink = () => {
    const link = `https://roommate.ai/invite/${Math.random().toString(36).substring(2, 10)}`;
    // In a real app, this would generate and save an actual invite link
    navigator.clipboard.writeText(link);
    alert("Invite link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Invite roommates</h2>
        <p className="text-muted-foreground">
          Add your roommates or skip for now
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <Label>Roommate emails</Label>
          {data.emails.map((email, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="roommate@example.com"
                type="email"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => removeEmailField(index)}
                disabled={data.emails.length === 1 && !email}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={addEmailField}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add another
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Or</div>
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={generateInviteLink}
            className="mt-2"
          >
            <LinkIcon className="h-4 w-4 mr-2" /> Generate shareable invite link
          </Button>
        </div>

        <div className="flex items-center space-x-2 pt-4 border-t border-border">
          <Checkbox
            id="skipInvites"
            checked={data.skipInvites}
            onCheckedChange={(checked) =>
              updateData({ skipInvites: checked === true })
            }
          />
          <Label htmlFor="skipInvites">Skip for now, I'll invite them later</Label>
        </div>
      </div>
    </div>
  );
};
