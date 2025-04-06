
import React from "react";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProfileData {
  name: string;
  nickname: string;
  avatar: string;
}

interface StepProfileProps {
  data: ProfileData;
  updateData: (data: Partial<ProfileData>) => void;
}

export const StepProfile: React.FC<StepProfileProps> = ({ data, updateData }) => {
  const avatarOptions = [
    { id: "avatar1", url: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Felix" },
    { id: "avatar2", url: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Peanut" },
    { id: "avatar3", url: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Milo" },
    { id: "avatar4", url: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Abby" },
    { id: "avatar5", url: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Zoe" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Set up your profile</h2>
        <p className="text-muted-foreground">
          Let's get to know you a bit better
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-3">Choose an avatar</p>
          <RadioGroup
            value={data.avatar}
            onValueChange={(value) => updateData({ avatar: value })}
            className="flex flex-wrap justify-center gap-4"
          >
            {avatarOptions.map((avatar) => (
              <div key={avatar.id} className="flex flex-col items-center">
                <RadioGroupItem
                  value={avatar.url}
                  id={avatar.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={avatar.id}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Avatar className="h-16 w-16 border-2 peer-data-[state=checked]:border-primary">
                    <AvatarImage src={avatar.url} alt="Avatar" />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="nickname" className="flex items-center">
              Nickname (Optional)
            </Label>
            <Input
              id="nickname"
              placeholder="What should others call you?"
              value={data.nickname}
              onChange={(e) => updateData({ nickname: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
