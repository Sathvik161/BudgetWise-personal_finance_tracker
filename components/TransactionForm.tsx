"use client";

import { useState } from "react";
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
import { Transaction, TransactionFormData, Category } from "@/lib/types";

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
  description: z.string().min(1, "Description is required"),
  date: z.string(),
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

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
  initialData?: Transaction;
}

export function TransactionForm({ onSubmit, initialData }: TransactionFormProps) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          amount: initialData.amount,
          description: initialData.description,
          date: initialData.date.toISOString().split("T")[0],
          category: initialData.category,
        }
      : {
          amount: 0,
          description: "",
          date: new Date().toISOString().split("T")[0],
          category: "Other",
        },
  });

  const handleSubmit = (data: TransactionFormData) => {
    try {
      // Log the form data
      console.log('Form data:', data);
      
      const transaction: Transaction = {
        id: initialData?.id || '', // MongoDB will generate this
        amount: Number(data.amount), // Ensure amount is a number
        description: data.description.trim(),
        date: new Date(data.date), // Ensure date is a valid Date object
        category: data.category,
      };
      
      // Log the transaction object
      console.log('Created transaction object:', transaction);
      
      onSubmit(transaction);
      form.reset();
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  {categories.map((category) => (
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

        <Button type="submit" className="w-full">
          {initialData ? "Update Transaction" : "Add Transaction"}
        </Button>
      </form>
    </Form>
  );
}