
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { BalanceSummary } from "@/components/dashboard/BalanceSummary";
import { UpcomingChores } from "@/components/dashboard/UpcomingChores";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { ReminderGenerator } from "@/components/dashboard/ReminderGenerator";

// Mock data
const mockChores = [
  {
    id: "1",
    name: "Take out trash",
    assignedTo: "You",
    dueDate: new Date(),
    completed: false,
  },
  {
    id: "2",
    name: "Clean bathroom",
    assignedTo: "Sam",
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    completed: false,
  },
  {
    id: "3", 
    name: "Vacuum living room",
    assignedTo: "Alex",
    dueDate: new Date(Date.now() - 86400000), // Yesterday
    completed: false,
  },
];

const mockExpenses = [
  {
    id: "1",
    description: "Groceries",
    amount: 1800,
    paidBy: "You",
    paidByInitials: "YO",
    date: new Date(),
    splitWith: [
      { name: "You", amount: 600 },
      { name: "Sam", amount: 600 },
      { name: "Alex", amount: 600 },
    ],
  },
  {
    id: "2",
    description: "Electricity Bill",
    amount: 1200,
    paidBy: "Sam",
    paidByInitials: "SA",
    date: new Date(Date.now() - 2 * 86400000), // 2 days ago
    splitWith: [
      { name: "You", amount: 400 },
      { name: "Sam", amount: 400 },
      { name: "Alex", amount: 400 },
    ],
  },
  {
    id: "3",
    description: "Internet",
    amount: 999,
    paidBy: "Alex",
    paidByInitials: "AL",
    date: new Date(Date.now() - 5 * 86400000), // 5 days ago
    splitWith: [
      { name: "You", amount: 333 },
      { name: "Sam", amount: 333 },
      { name: "Alex", amount: 333 },
    ],
  },
];

const Index = () => {
  return (
    <MainLayout title="Home">
      <div className="space-y-6">
        <BalanceSummary totalOwed={1800} totalOwing={733} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <UpcomingChores chores={mockChores} />
          <RecentExpenses expenses={mockExpenses} />
        </div>
        
        <ReminderGenerator />
      </div>
    </MainLayout>
  );
};

export default Index;
