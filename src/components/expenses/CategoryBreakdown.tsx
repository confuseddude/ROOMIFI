
import React, { useState } from "react";

interface CategoryBreakdownProps {
  categories: {
    name: string;
    value: number;
    transactions: number;
    color: string;
  }[];
}

export const CategoryBreakdown = ({ categories }: CategoryBreakdownProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.value, 0);
  
  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Category</span>
        <div className="flex gap-x-12">
          <span>Amount</span>
          <span>% of Total</span>
          <span>Transactions</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="space-y-2"
          >
            <div 
              className="flex items-center justify-between hover:bg-accent/50 p-2 rounded-lg cursor-pointer transition-colors"
              onClick={() => toggleCategory(category.name)}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="flex gap-x-12 text-right">
                <span>₹{category.value.toLocaleString()}</span>
                <span>{((category.value / totalSpent) * 100).toFixed(1)}%</span>
                <span>{category.transactions}</span>
              </div>
            </div>
            
            {expandedCategory === category.name && (
              <div className="ml-5 pl-2 border-l-2 border-l-accent text-sm space-y-1 animate-accordion-down">
                <p className="text-muted-foreground">Click to view {category.transactions} transaction details</p>
                {/* We could add detailed transaction list here in a future update */}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="border-t pt-3 flex justify-between font-medium">
        <span>Total</span>
        <span>₹{totalSpent.toLocaleString()}</span>
      </div>
    </div>
  );
};
