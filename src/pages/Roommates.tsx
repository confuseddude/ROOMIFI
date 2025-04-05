
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  CheckIcon, 
  ClipboardCheck, 
  CreditCard, 
  MoreVertical, 
  PlusCircle, 
  UserCircle, 
  UserPlus 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock roommate data
const mockRoommates = [
  {
    id: "1",
    name: "You",
    initials: "YO",
    email: "you@example.com",
    balance: 1067,
    isPositive: true,
    choresCompleted: 24,
    choresTotal: 30,
    choresOnTime: 0.85,
    isCurrentUser: true,
  },
  {
    id: "2",
    name: "Sam",
    initials: "SA",
    email: "sam@example.com",
    balance: -600,
    isPositive: false,
    choresCompleted: 18,
    choresTotal: 30,
    choresOnTime: 0.70,
    isCurrentUser: false,
  },
  {
    id: "3",
    name: "Alex",
    initials: "AL",
    email: "alex@example.com",
    balance: -467,
    isPositive: false,
    choresCompleted: 27,
    choresTotal: 30,
    choresOnTime: 0.95,
    isCurrentUser: false,
  },
  {
    id: "4",
    name: "Jordan",
    initials: "JO",
    email: "jordan@example.com",
    balance: 0,
    isPositive: true,
    choresCompleted: 22,
    choresTotal: 30,
    choresOnTime: 0.80,
    isCurrentUser: false,
  },
];

const RoommatesPage = () => {
  return (
    <MainLayout title="Roommates">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Roommates</h1>
          <Button className="bg-brand-purple hover:bg-brand-purple-dark">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Roommate
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mockRoommates.map((roommate) => (
            <Card key={roommate.id} className="overflow-hidden">
              <div className="h-2 bg-brand-purple" />
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-brand-purple-light text-brand-purple-dark">
                    {roommate.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      {roommate.name}
                      {roommate.isCurrentUser && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          You
                        </Badge>
                      )}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Settle Up</DropdownMenuItem>
                        {!roommate.isCurrentUser && (
                          <DropdownMenuItem className="text-destructive">
                            Remove Roommate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {roommate.email}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <div className="text-sm text-muted-foreground">Balance</div>
                    <div
                      className={`text-lg font-semibold ${
                        roommate.isPositive
                          ? "expense-paid"
                          : roommate.balance === 0
                          ? "text-muted-foreground"
                          : "expense-owed"
                      }`}
                    >
                      {roommate.balance === 0
                        ? "₹0.00"
                        : roommate.isPositive
                        ? `Gets ₹${Math.abs(roommate.balance).toFixed(2)}`
                        : `Owes ₹${Math.abs(roommate.balance).toFixed(2)}`}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm text-muted-foreground">Chores</div>
                    <div className="text-lg font-semibold">
                      {roommate.choresCompleted}/{roommate.choresTotal} completed
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Chore Completion</span>
                    <span>{Math.round(roommate.choresOnTime * 100)}% on time</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-brand-purple h-2.5 rounded-full"
                      style={{ width: `${roommate.choresOnTime * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Settle Up
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-brand-purple hover:bg-brand-purple-dark"
                  >
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Assign Chore
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="flex flex-col items-center justify-center py-6 text-center border-dashed">
            <PlusCircle className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium mb-1">Add Roommate</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-[80%]">
              Invite your roommate to join and start sharing expenses and chores
            </p>
            <Button className="bg-brand-purple hover:bg-brand-purple-dark">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Roommate
            </Button>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default RoommatesPage;
