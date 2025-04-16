"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { MonthlyChart } from "@/components/MonthlyChart";
import { CategoryChart } from "@/components/CategoryChart";
import { DashboardSummary } from "@/components/DashboardSummary";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetOverview } from "@/components/BudgetOverview";
import { BudgetComparisonChart } from "@/components/BudgetComparisonChart";
import { Transaction, Budget } from "@/lib/types";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data.map((t: any) => ({
        ...t,
        id: t._id,
        date: new Date(t.date)
      })));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await fetch('/api/budgets');
      const data = await response.json();
      setBudgets(data.map((b: any) => ({
        category: b.category,
        amount: b.amount
      })));
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
    }
  };

  const addTransaction = async (transaction: Transaction) => {
    try {
      const { id, ...transactionData } = transaction;
      
      console.log('Sending transaction data:', transactionData);
      
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to add transaction');
      }
      
      await fetchTransactions();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  const editTransaction = async (updatedTransaction: Transaction) => {
    try {
      const response = await fetch(`/api/transactions/${updatedTransaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });
      if (response.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const addBudget = async (budget: Budget) => {
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budget),
      });
      if (response.ok) {
        fetchBudgets();
      } else {
        const errorData = await response.json();
        console.error('Failed to add budget:', errorData);
      }
    } catch (error) {
      console.error('Failed to add budget:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Personal Finance Visualizer
          </h1>
          <p className="text-muted-foreground">
            Track and visualize your personal finances
          </p>
        </div>

        <DashboardSummary transactions={transactions} />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Add Transaction</h2>
            <TransactionForm onSubmit={addTransaction} />
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Set Monthly Budget</h2>
            <BudgetForm onSubmit={addBudget} existingBudgets={budgets} />
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Budget Overview</h2>
            <BudgetOverview budgets={budgets} transactions={transactions} />
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Budget vs. Spending</h2>
            <BudgetComparisonChart
              budgets={budgets}
              transactions={transactions}
            />
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Monthly Expenses</h2>
            <MonthlyChart transactions={transactions} />
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Category Breakdown</h2>
            <CategoryChart transactions={transactions} />
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">Transaction History</h2>
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
          />
        </Card>
      </div>
    </div>
  );
}