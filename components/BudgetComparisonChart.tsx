"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Budget, Transaction } from "@/lib/types";

interface BudgetComparisonChartProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export function BudgetComparisonChart({
  budgets,
  transactions,
}: BudgetComparisonChartProps) {
  const currentMonth = new Date().getMonth();
  const currentMonthTransactions = transactions.filter(
    (t) => t.date.getMonth() === currentMonth
  );

  const data = budgets.map((budget) => {
    const spent = currentMonthTransactions
      .filter((t) => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: budget.category,
      Budget: budget.amount,
      Spent: spent,
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis
            width={60}
            tickFormatter={(value) => `$${value}`}
            domain={[0, 'auto']}
            allowDecimals={false}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
            labelStyle={{ color: 'var(--foreground)' }}
            contentStyle={{
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)'
            }}
          />
          <Legend />
          <Bar
            dataKey="Budget"
            fill="hsl(var(--chart-1))"
            name="Monthly Budget"
          />
          <Bar
            dataKey="Spent"
            fill="hsl(var(--chart-2))"
            name="Amount Spent"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}