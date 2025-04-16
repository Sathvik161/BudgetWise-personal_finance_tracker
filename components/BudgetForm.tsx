"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Budget, BudgetFormData, Category } from "@/lib/types";

const categories: Category[] = [
  "Food",
  "Transportation",
  "Housing",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Utilities",
  "Other",
];

const formSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.enum([
    "Food",
    "Transportation",
    "Housing",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Education",
    "Utilities",
    "Other",
  ]),
});

interface BudgetFormProps {
  onSubmit: (budget: Budget) => void;
  existingBudgets: Budget[];
}

export function BudgetForm({ onSubmit, existingBudgets }: BudgetFormProps) {
  const form = useForm<BudgetFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: "Other",
    },
  });

  const handleSubmit = (data: BudgetFormData) => {
    const budget: Budget = {
      category: data.category,
      amount: data.amount,
    };
    onSubmit(budget);
    form.reset();
  };

  const availableCategories = categories.filter(
    (category) => !existingBudgets.some((budget) => budget.category === category)
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Budget</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Set Budget
        </Button>
      </form>
    </Form>
  );
}