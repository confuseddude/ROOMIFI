
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Sparkles,
  Send,
  Save,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// Mock data for sent reminders
const mockReminders = [
  {
    id: "1",
    message:
      "Hey Sam, just a friendly reminder that it's your turn to take out the trash today! 🗑️",
    sentTo: "Sam",
    sentToInitials: "SA",
    sentAt: new Date(Date.now() - 3600000), // 1 hour ago
    tone: "Kind",
  },
  {
    id: "2",
    message:
      "Alex, if your dishes were a band, they'd be called 'The Forgotten Ones'. Time to give them a proper cleaning! 😜",
    sentTo: "Alex",
    sentToInitials: "AL",
    sentAt: new Date(Date.now() - 86400000), // 1 day ago
    tone: "Funny",
  },
  {
    id: "3",
    message:
      "Dear Jordan, this is a notification that your portion of the rent (₹8,500) is currently outstanding and requires settlement.",
    sentTo: "Jordan",
    sentToInitials: "JO",
    sentAt: new Date(Date.now() - 172800000), // 2 days ago
    tone: "Formal",
  },
];

// Mock templates
const mockTemplates = [
  {
    id: "1",
    name: "Trash Day Reminder",
    message:
      "Hey {name}, just a gentle reminder that it's your turn to take out the trash today! 🗑️",
    tone: "Kind",
  },
  {
    id: "2",
    name: "Dirty Dishes",
    message:
      "Hey {name}, if your dishes were a band, they'd be called 'The Forgotten Ones'. Time to give them a proper cleaning! 😜",
    tone: "Funny",
  },
  {
    id: "3",
    name: "Rent Due",
    message:
      "Dear {name}, this is a notification that your portion of the rent (₹8,500) is currently outstanding and requires settlement.",
    tone: "Formal",
  },
];

const toneOptions = [
  { value: "funny", label: "Funny" },
  { value: "kind", label: "Kind" },
  { value: "passive", label: "Passive-Aggressive" },
  { value: "formal", label: "Formal" },
];

const roommates = [
  { value: "sam", label: "Sam" },
  { value: "alex", label: "Alex" },
  { value: "jordan", label: "Jordan" },
];

const RemindersPage = () => {
  const [tone, setTone] = useState<string>("kind");
  const [selectedRoommate, setSelectedRoommate] = useState<string>("sam");
  const [message, setMessage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // In a real app, this would call an API
    setTimeout(() => {
      const roommateLabel = roommates.find((r) => r.value === selectedRoommate)?.label || "";
      setMessage(
        tone === "funny"
          ? `Hey ${roommateLabel}! If your dishes were a band, they'd be called "The Mold Growth Experience" 😂 Time to give them their final curtain call!`
          : tone === "kind"
          ? `Hi ${roommateLabel}! Just a gentle reminder that the dishes need some attention when you get a chance. Thanks for helping keep our space clean! 💫`
          : tone === "passive"
          ? `Oh, those dishes in the sink? They've been asking for you, ${roommateLabel}. Something about "it's been 3 days now..." 🙃`
          : `Dear ${roommateLabel}, this is a notification that household maintenance, specifically dishwashing, requires your immediate attention as per our agreed rotation. Regards.`
      );
      setIsGenerating(false);
    }, 1000);
  };

  const handleSend = () => {
    // In a real app, this would send the message to the roommate
    alert("Reminder sent!");
  };

  const handleSaveTemplate = () => {
    // In a real app, this would save the template
    alert("Template saved!");
  };

  return (
    <MainLayout title="Reminders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Reminders</h1>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="create">
              <Sparkles className="mr-2 h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="sent">
              <MessageCircle className="mr-2 h-4 w-4" />
              Sent
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Save className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Reminder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Roommate</label>
                      <Select
                        value={selectedRoommate}
                        onValueChange={setSelectedRoommate}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select roommate" />
                        </SelectTrigger>
                        <SelectContent>
                          {roommates.map((roommate) => (
                            <SelectItem key={roommate.value} value={roommate.value}>
                              {roommate.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tone</label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          {toneOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Message</label>
                      <Button
                        onClick={handleGenerate}
                        variant="outline"
                        size="sm"
                        className="h-8"
                        disabled={isGenerating}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isGenerating ? "Generating..." : "Generate"}
                      </Button>
                    </div>
                    <Textarea
                      className="min-h-[120px]"
                      placeholder="Write or generate a reminder message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={handleSaveTemplate}>
                      <Save className="mr-2 h-4 w-4" />
                      Save as Template
                    </Button>
                    <Button
                      className="bg-brand-purple hover:bg-brand-purple-dark"
                      onClick={handleSend}
                      disabled={!message.trim()}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Reminder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sent" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockReminders.map((reminder) => (
                    <div key={reminder.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback className="bg-brand-purple-light text-brand-purple-dark">
                              {reminder.sentToInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">To: {reminder.sentTo}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {format(reminder.sentAt, "MMM d, h:mm a")}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs bg-brand-purple/10 text-brand-purple-dark px-2 py-1 rounded">
                          {reminder.tone} tone
                        </div>
                      </div>
                      <p className="text-sm mt-2 pl-10">{reminder.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <Card>
              <CardContent className="divide-y divide-border p-0">
                {mockTemplates.map((template) => (
                  <div key={template.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs bg-brand-purple/10 text-brand-purple-dark px-2 py-1 rounded">
                        {template.tone} tone
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.message}
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-brand-purple"
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        Use
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default RemindersPage;
