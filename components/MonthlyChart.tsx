"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/lib/types";

interface MonthlyChartProps {
  transactions: Transaction[];
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const month = transaction.date.toLocaleString("default", { month: "short" });
    const existingMonth = acc.find((item) => item.month === month);

    if (existingMonth) {
      existingMonth.amount += transaction.amount;
    } else {
      acc.push({ month, amount: transaction.amount });
    }

    return acc;
  }, []);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
          />
          <Bar dataKey="amount" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}