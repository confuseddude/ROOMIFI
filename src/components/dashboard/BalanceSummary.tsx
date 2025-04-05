
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface BalanceSummaryProps {
  totalOwed: number;
  totalOwing: number;
}

export const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  totalOwed,
  totalOwing,
}) => {
  const netBalance = totalOwed - totalOwing;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Balance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">You are owed</span>
            <div className="flex items-center mt-1">
              <ArrowDownCircle className="h-4 w-4 mr-1 expense-paid" />
              <span className="text-lg font-semibold expense-paid">
                ₹{totalOwed.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">You owe</span>
            <div className="flex items-center mt-1">
              <ArrowUpCircle className="h-4 w-4 mr-1 expense-owed" />
              <span className="text-lg font-semibold expense-owed">
                ₹{totalOwing.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Net Balance</span>
            <span
              className={`text-lg font-semibold ${
                netBalance >= 0 ? "expense-paid" : "expense-owed"
              }`}
            >
              ₹{Math.abs(netBalance).toFixed(2)}
              {netBalance >= 0 ? " in your favor" : " you owe"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceSummary;
