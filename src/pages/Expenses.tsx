
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Receipt } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

// Mock data
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
  {
    id: "4",
    description: "Movie Night",
    amount: 750,
    paidBy: "You",
    paidByInitials: "YO",
    date: new Date(Date.now() - 7 * 86400000), // 7 days ago
    splitWith: [
      { name: "You", amount: 250 },
      { name: "Sam", amount: 250 },
      { name: "Alex", amount: 250 },
    ],
  },
  {
    id: "5",
    description: "Dinner",
    amount: 2400,
    paidBy: "Sam",
    paidByInitials: "SA",
    date: new Date(Date.now() - 10 * 86400000), // 10 days ago
    splitWith: [
      { name: "You", amount: 800 },
      { name: "Sam", amount: 800 },
      { name: "Alex", amount: 800 },
    ],
  },
];

const ExpensesPage = () => {
  return (
    <MainLayout title="Expenses">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <Link to="/expenses/add">
            <Button className="bg-brand-purple hover:bg-brand-purple-dark">
              <Plus className="mr-2 h-4 w-4" /> Add Expense
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">All Expenses</TabsTrigger>
            <TabsTrigger value="you-paid">You Paid</TabsTrigger>
            <TabsTrigger value="you-owe">You Owe</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Showing {mockExpenses.length} expenses
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockExpenses.length > 0 ? (
                    mockExpenses.map((expense) => (
                      <div key={expense.id} className="flex items-start justify-between p-4">
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-brand-purple-light text-brand-purple-dark">
                              {expense.paidByInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {expense.paidBy} paid • {formatDistanceToNow(expense.date, { addSuffix: true })}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {expense.splitWith.length} people
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{expense.amount.toFixed(2)}</div>
                          <div className={`text-sm ${
                            expense.paidBy === "You" 
                              ? "expense-paid" 
                              : "expense-owed"
                          }`}>
                            {expense.paidBy === "You" 
                              ? `You get back ₹${(expense.amount - expense.splitWith[0].amount).toFixed(2)}` 
                              : `You owe ₹${expense.splitWith[0].amount.toFixed(2)}`}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Receipt className="h-12 w-12 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">No expenses found</p>
                      <Link to="/expenses/add">
                        <Button className="mt-4 bg-brand-purple hover:bg-brand-purple-dark">
                          Add Expense
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="you-paid" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <div className="divide-y divide-border">
                  {mockExpenses
                    .filter(expense => expense.paidBy === "You")
                    .map((expense) => (
                      <div key={expense.id} className="flex items-start justify-between py-4 first:pt-0 last:pb-0">
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-brand-purple-light text-brand-purple-dark">
                              {expense.paidByInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            <div className="text-sm text-muted-foreground">
                              You paid • {formatDistanceToNow(expense.date, { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{expense.amount.toFixed(2)}</div>
                          <div className="text-sm expense-paid">
                            You get back ₹{(expense.amount - expense.splitWith[0].amount).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="you-owe" className="mt-0">
            <Card>
              <CardContent className="p-4">
                <div className="divide-y divide-border">
                  {mockExpenses
                    .filter(expense => expense.paidBy !== "You")
                    .map((expense) => (
                      <div key={expense.id} className="flex items-start justify-between py-4 first:pt-0 last:pb-0">
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-brand-purple-light text-brand-purple-dark">
                              {expense.paidByInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {expense.paidBy} paid • {formatDistanceToNow(expense.date, { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹{expense.amount.toFixed(2)}</div>
                          <div className="text-sm expense-owed">
                            You owe ₹{expense.splitWith[0].amount.toFixed(2)}
                          </div>
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

export default ExpensesPage;
