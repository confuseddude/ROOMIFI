
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, CheckCircle2, Calendar, RotateCcw } from "lucide-react";
import { format, isToday, isPast, addDays } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

// Mock data
const mockChores = [
  {
    id: "1",
    name: "Take out trash",
    assignedTo: "You",
    assignedToInitials: "YO",
    dueDate: new Date(),
    frequency: "Daily",
    completed: false,
    description: "Empty all trash bins and take to the dumpster",
  },
  {
    id: "2",
    name: "Clean bathroom",
    assignedTo: "Sam",
    assignedToInitials: "SA",
    dueDate: addDays(new Date(), 1), // Tomorrow
    frequency: "Weekly",
    completed: false,
    description: "Clean shower, toilet, sink, and mop floor",
  },
  {
    id: "3",
    name: "Vacuum living room",
    assignedTo: "Alex",
    assignedToInitials: "AL",
    dueDate: addDays(new Date(), -1), // Yesterday
    frequency: "Weekly",
    completed: false,
    description: "Vacuum carpet and dust furniture",
  },
  {
    id: "4",
    name: "Wash dishes",
    assignedTo: "You",
    assignedToInitials: "YO",
    dueDate: addDays(new Date(), 1), // Tomorrow
    frequency: "Daily",
    completed: false,
    description: "Wash and put away all dishes in the sink",
  },
  {
    id: "5",
    name: "Water plants",
    assignedTo: "Sam",
    assignedToInitials: "SA",
    dueDate: addDays(new Date(), 3),
    frequency: "Weekly",
    completed: true,
    description: "Water all indoor plants",
  },
];

const ChoresPage = () => {
  const [chores, setChores] = useState(mockChores);

  const getChoreStatusClass = (dueDate: Date, completed: boolean) => {
    if (completed) return "text-green-600";
    if (isPast(dueDate) && !isToday(dueDate)) return "chore-overdue";
    if (isToday(dueDate)) return "chore-today";
    return "chore-upcoming";
  };

  const toggleComplete = (id: string) => {
    setChores(
      chores.map((chore) =>
        chore.id === id ? { ...chore, completed: !chore.completed } : chore
      )
    );
  };

  return (
    <MainLayout title="Chores">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chores</h1>
          <Link to="/chores/add">
            <Button className="bg-brand-purple hover:bg-brand-purple-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Chore
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All Chores</TabsTrigger>
            <TabsTrigger value="mine">My Chores</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Showing {chores.length} chores
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {chores.map((chore) => (
                    <div key={chore.id} className="p-4 flex items-start justify-between">
                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`rounded-full p-0 h-6 w-6 ${
                            chore.completed ? "text-green-600" : ""
                          }`}
                          onClick={() => toggleComplete(chore.id)}
                        >
                          <CheckCircle2
                            className={`h-6 w-6 ${
                              !chore.completed && "text-muted-foreground/40"
                            }`}
                          />
                        </Button>
                        <div>
                          <div className="font-medium">{chore.name}</div>
                          <div className="flex items-center mt-1">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarFallback className="text-[10px] bg-brand-purple-light text-brand-purple-dark">
                                {chore.assignedToInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              {chore.assignedTo}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant="outline"
                          className={`${getChoreStatusClass(
                            chore.dueDate,
                            chore.completed
                          )}`}
                        >
                          <Calendar className="mr-1 h-3 w-3 inline" />
                          {isToday(chore.dueDate)
                            ? "Today"
                            : format(chore.dueDate, "MMM d")}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {chore.frequency}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs"
                            >
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toggleComplete(chore.id)}>
                              {chore.completed ? "Mark Incomplete" : "Mark Complete"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Reassign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mine" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {chores
                    .filter((chore) => chore.assignedTo === "You")
                    .map((chore) => (
                      <div key={chore.id} className="p-4 flex items-start justify-between">
                        <div className="flex gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-full p-0 h-6 w-6 ${
                              chore.completed ? "text-green-600" : ""
                            }`}
                            onClick={() => toggleComplete(chore.id)}
                          >
                            <CheckCircle2
                              className={`h-6 w-6 ${
                                !chore.completed && "text-muted-foreground/40"
                              }`}
                            />
                          </Button>
                          <div>
                            <div className="font-medium">{chore.name}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {chore.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge
                            variant="outline"
                            className={`${getChoreStatusClass(
                              chore.dueDate,
                              chore.completed
                            )}`}
                          >
                            <Calendar className="mr-1 h-3 w-3 inline" />
                            {isToday(chore.dueDate)
                              ? "Today"
                              : format(chore.dueDate, "MMM d")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {chores
                    .filter((chore) => chore.completed)
                    .map((chore) => (
                      <div key={chore.id} className="p-4 flex items-start justify-between">
                        <div className="flex gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full p-0 h-6 w-6 text-green-600"
                            onClick={() => toggleComplete(chore.id)}
                          >
                            <CheckCircle2 className="h-6 w-6" />
                          </Button>
                          <div>
                            <div className="font-medium">{chore.name}</div>
                            <div className="flex items-center mt-1">
                              <Avatar className="h-5 w-5 mr-1">
                                <AvatarFallback className="text-[10px] bg-brand-purple-light text-brand-purple-dark">
                                  {chore.assignedToInitials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">
                                {chore.assignedTo}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-green-600">
                          Completed
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ChoresPage;
