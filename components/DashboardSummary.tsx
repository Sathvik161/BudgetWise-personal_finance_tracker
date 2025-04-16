"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

interface DashboardSummaryProps {
  transactions: Transaction[];
}

export function DashboardSummary({ transactions }: DashboardSummaryProps) {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  const thisMonth = new Date().getMonth();
  const thisMonthExpenses = transactions
    .filter((t) => t.date.getMonth() === thisMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  const lastMonth = (thisMonth - 1 + 12) % 12;
  const lastMonthExpenses = transactions
    .filter((t) => t.date.getMonth() === lastMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyChange = thisMonthExpenses - lastMonthExpenses;
  const monthlyChangePercent = lastMonthExpenses
    ? (monthlyChange / lastMonthExpenses) * 100
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">All time total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${thisMonthExpenses.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Current month expenses
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
          {monthlyChange > 0 ? (
            <TrendingUp className="h-4 w-4 text-destructive" />
          ) : (
            <TrendingDown className="h-4 w-4 text-primary" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {monthlyChangePercent > 0 ? "+" : ""}
            {monthlyChangePercent.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            From last month (${lastMonthExpenses.toFixed(2)})
          </p>
        </CardContent>
      </Card>
    </div>
  );
}