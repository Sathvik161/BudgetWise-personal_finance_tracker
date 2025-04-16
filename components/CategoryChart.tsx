"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Transaction, CategoryTotal } from "@/lib/types";

interface CategoryChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function CategoryChart({ transactions }: CategoryChartProps) {
  const categoryTotals = transactions.reduce((acc: CategoryTotal[], transaction) => {
    const existingCategory = acc.find((item) => item.category === transaction.category);
    if (existingCategory) {
      existingCategory.total += transaction.amount;
    } else {
      acc.push({ category: transaction.category, total: transaction.amount });
    }
    return acc;
  }, []);

  const sortedData = categoryTotals.sort((a, b) => b.total - a.total);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sortedData}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={entry.category}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}