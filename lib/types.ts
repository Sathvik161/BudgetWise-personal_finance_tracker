export type Category =
  | "Food"
  | "Transportation"
  | "Housing"
  | "Entertainment"
  | "Shopping"
  | "Healthcare"
  | "Education"
  | "Utilities"
  | "Other";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category: Category;
}

export interface TransactionFormData {
  amount: number;
  description: string;
  date: string;
  category: Category;
}

export interface CategoryTotal {
  category: Category;
  total: number;
}

export interface Budget {
  category: Category;
  amount: number;
}

export interface BudgetFormData {
  category: Category;
  amount: number;
}

export interface CategoryBudgetStatus {
  category: Category;
  spent: number;
  budget: number;
  percentage: number;
}