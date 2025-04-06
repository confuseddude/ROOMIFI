
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { ExpenseTrendChart } from "@/components/expenses/ExpenseTrendChart";
import { CategoryPieChart } from "@/components/expenses/CategoryPieChart";
import { RoommateContributionChart } from "@/components/expenses/RoommateContributionChart";
import { CategoryBreakdown } from "@/components/expenses/CategoryBreakdown";

// Mock data
const mockCategories = [
  { name: "Food", value: 4500, transactions: 12, color: "#9b87f5" },
  { name: "Rent", value: 12000, transactions: 1, color: "#7E69AB" },
  { name: "Utilities", value: 3000, transactions: 3, color: "#D6BCFA" },
  { name: "Subscriptions", value: 1500, transactions: 5, color: "#8B5CF6" },
  { name: "Other", value: 2000, transactions: 7, color: "#1EAEDB" },
];

const mockTrendData = [
  { date: "Apr 1", amount: 500 },
  { date: "Apr 5", amount: 1200 },
  { date: "Apr 10", amount: 800 },
  { date: "Apr 15", amount: 1500 },
  { date: "Apr 20", amount: 600 },
  { date: "Apr 25", amount: 2000 },
  { date: "Apr 30", amount: 1000 },
];

const mockRoommateData = [
  { name: "You", paid: 8000, owed: 7500 },
  { name: "Sam", paid: 7000, owed: 7500 },
  { name: "Alex", paid: 8000, owed: 8000 },
];

const ExpensesGraphPage = () => {
  const [dateRange, setDateRange] = useState("month");

  return (
    <MainLayout title="Spending Insights">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/expenses">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Expenses
            </Button>
          </Link>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Expense Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseTrendChart data={mockTrendData} />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryPieChart data={mockCategories} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Roommate Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <RoommateContributionChart data={mockRoommateData} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Category Details</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <CategoryBreakdown categories={mockCategories} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ExpensesGraphPage;
