
import React from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface ExpenseTrendChartProps {
  data: { date: string; amount: number }[];
}

export const ExpenseTrendChart = ({ data }: ExpenseTrendChartProps) => {
  const chartConfig = {
    expenses: {
      label: "Expenses",
      color: "#8B5CF6"
    }
  };

  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }} 
        />
        <YAxis 
          tickFormatter={(value) => `₹${value}`} 
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="amount" 
          name="expenses" 
          stroke="var(--color-expenses)"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <div className="flex flex-col gap-1.5">
          <p className="text-muted-foreground text-xs">{payload[0].payload.date}</p>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
            <p className="font-medium text-foreground">
              ₹{payload[0].value}
            </p>
          </div>
        </div>
      </ChartTooltipContent>
    );
  }
  return null;
};
