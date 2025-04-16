"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Budget, Transaction, CategoryBudgetStatus } from "@/lib/types";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface BudgetOverviewProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export function BudgetOverview({ budgets, transactions }: BudgetOverviewProps) {
  const currentMonth = new Date().getMonth();
  const currentMonthTransactions = transactions.filter(
    (t) => t.date.getMonth() === currentMonth
  );

  const getBudgetStatus = (): CategoryBudgetStatus[] => {
    return budgets.map((budget) => {
      const spent = currentMonthTransactions
        .filter((t) => t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        category: budget.category,
        spent,
        budget: budget.amount,
        percentage: (spent / budget.amount) * 100,
      };
    });
  };

  const budgetStatus = getBudgetStatus();

  return (
    <div className="space-y-4">
      {budgetStatus.map((status) => (
        <Card key={status.category} className="p-4">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{status.category}</h3>
                <p className="text-sm text-muted-foreground">
                  ${status.spent.toFixed(2)} of ${status.budget.toFixed(2)}
                </p>
              </div>
              {status.percentage >= 90 ? (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              ) : status.percentage <= 75 ? (
                <CheckCircle className="h-5 w-5 text-primary" />
              ) : null}
            </div>
            <Progress value={Math.min(status.percentage, 100)} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {status.percentage >= 100
                ? "Budget exceeded!"
                : status.percentage >= 90
                ? "Near budget limit!"
                : status.percentage >= 75
                ? "Approaching budget limit"
                : "Within budget"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}