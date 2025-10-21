import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/context/DashboardContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const categories = [
  { value: "food", label: "Food" },
  { value: "utilities", label: "Utilities" },
  { value: "household", label: "Household" },
  { value: "entertainment", label: "Entertainment" },
  { value: "other", label: "Other" },
];

const roommates = [
  { value: "You", label: "You" },
  { value: "Sam", label: "Sam" },
  { value: "Alex", label: "Alex" },
];

export const AddExpensePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addExpense } = useDashboard();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    description: "",
    amount: "",
    paidBy: "",
    paidByInitials: "",
    date: new Date().toISOString().split("T")[0],
    category: "food",
    splitWith: [
      { name: "You", amount: 0 },
      { name: "Sam", amount: 0 },
      { name: "Alex", amount: 0 },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSplitChange = (index: number, value: string) => {
    const amount = parseFloat(value) || 0;
    const newSplitWith = [...formData.splitWith];
    newSplitWith[index] = {
      ...newSplitWith[index],
      amount,
    };
    setFormData(prev => ({
      ...prev,
      splitWith: newSplitWith,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      if (!formData.description || !formData.amount || !formData.paidBy) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Calculate total split amount
      const totalSplit = formData.splitWith.reduce((sum, split) => sum + split.amount, 0);
      const expenseAmount = parseFloat(formData.amount);

      if (totalSplit !== expenseAmount) {
        toast({
          title: "Error",
          description: "Total split amount must equal the expense amount",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Create the expense object
      const newExpense = {
        id: formData.id,
        description: formData.description,
        amount: expenseAmount,
        paidBy: formData.paidBy,
        paidByInitials: formData.paidBy.slice(0, 2).toUpperCase(),
        date: formData.date,
        category: formData.category,
        splitWith: formData.splitWith.map(split => ({
          name: split.name,
          amount: parseFloat(split.amount.toString()),
        })),
      };

      // Add the expense
      await addExpense(newExpense);

      toast({
        title: "Expense added",
        description: "The expense has been successfully added.",
      });

      // Navigate back to expenses page
      navigate("/expenses");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-4 px-4 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/expenses")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Add Expense</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What was this expense for?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">₹</span>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  className="pl-7"
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paidBy">Paid By</Label>
              <Select
                value={formData.paidBy}
                onValueChange={(value) => {
                  setFormData(prev => ({
                    ...prev,
                    paidBy: value,
                    paidByInitials: value.slice(0, 2).toUpperCase(),
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select who paid" />
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
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Split With</Label>
              {formData.splitWith.map((split, index) => (
                <div key={split.name} className="flex items-center gap-2">
                  <span className="w-20">{split.name}</span>
                  <Input
                    type="number"
                    value={split.amount}
                    onChange={(e) => handleSplitChange(index, e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/expenses")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-brand-purple hover:bg-brand-purple-dark"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpensePage; 