
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  LogOut, 
  Moon, 
  Save, 
  Sun, 
  User, 
  UserCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const SettingsPage = () => {
  return (
    <MainLayout title="Settings">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Sun className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <Avatar className="h-24 w-24 border-2 border-border">
                    <AvatarFallback className="text-2xl bg-brand-purple-light text-brand-purple-dark">
                      YO
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center sm:text-left flex-1">
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a photo to personalize your account
                    </p>
                    <div className="flex justify-center sm:justify-start gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" defaultValue="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" defaultValue="you@example.com" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Your phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="Username" defaultValue="yourusername" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Choose how you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="expense-notifications" className="text-base">Expense Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new expenses
                      </p>
                    </div>
                    <Switch id="expense-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="chore-reminders" className="text-base">Chore Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminded about upcoming chores
                      </p>
                    </div>
                    <Switch id="chore-reminders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payment-notifications" className="text-base">Payment Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications when someone pays you
                      </p>
                    </div>
                    <Switch id="payment-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="roommate-activity" className="text-base">Roommate Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Updates about roommate actions
                      </p>
                    </div>
                    <Switch id="roommate-activity" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-4">
                  <h3 className="font-medium">Notification Channels</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email-frequency">Email Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <Select defaultValue="important">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Notifications</SelectItem>
                          <SelectItem value="important">Important Only</SelectItem>
                          <SelectItem value="never">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your RoomiFi experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="theme-toggle" className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <Switch id="theme-toggle" />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border space-y-4">
                  <h3 className="font-medium">AI Assistant Preferences</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-tone">Default Reminder Tone</Label>
                    <Select defaultValue="kind">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="funny">Funny</SelectItem>
                        <SelectItem value="kind">Kind</SelectItem>
                        <SelectItem value="passive">Passive-Aggressive</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ai-suggestions" className="text-base">AI Suggestions</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow AI to suggest better chore schedules and expense splits
                      </p>
                    </div>
                    <Switch id="ai-suggestions" defaultChecked />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border space-y-4">
                  <h3 className="font-medium">Currency & Regional</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="INR">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Button variant="outline" className="justify-start">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Switch Household
                    </Button>
                    <Button variant="outline" className="justify-start text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
