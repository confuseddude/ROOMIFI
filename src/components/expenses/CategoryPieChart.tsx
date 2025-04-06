
import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  Tooltip
} from "recharts";

interface CategoryPieChartProps {
  data: { name: string; value: number; color: string }[];
}

export const CategoryPieChart = ({ data }: CategoryPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const renderCustomizedLabel = ({ 
    cx, cy, midAngle, innerRadius, outerRadius, percent, index 
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-4 text-xs">
        {payload.map((entry: any, index: number) => (
          <div 
            key={`item-${index}`} 
            className="flex items-center gap-1.5"
          >
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}: ₹{data[index].value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationDuration={500}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke={activeIndex === index ? '#fff' : 'transparent'}
                strokeWidth={activeIndex === index ? 2 : 0}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`₹${value}`, 'Amount']} 
            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
          />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
