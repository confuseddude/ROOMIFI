
import React from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

interface RoommateContributionChartProps {
  data: { name: string; paid: number; owed: number }[];
}

export const RoommateContributionChart = ({ data }: RoommateContributionChartProps) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            tickFormatter={(value) => `₹${value}`}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            scale="band"
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => [`₹${value}`, undefined]}
            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
            itemStyle={{ padding: '2px 0' }}
          />
          <Legend />
          <Bar 
            dataKey="paid" 
            name="Paid" 
            fill="#9b87f5" 
            radius={[0, 4, 4, 0]}
          />
          <Bar 
            dataKey="owed" 
            name="Owed" 
            fill="#D6BCFA" 
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
