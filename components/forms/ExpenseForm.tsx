"use client";

import { FormEvent, useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { AmountInput } from "@/components/forms/AmountInput";
import { CategoryPicker } from "@/components/forms/CategoryPicker";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTodayDateString, formatAmountInput } from "@/lib/utils/format";
import type { ExpenseInput } from "@/types/expense";

export interface ExpenseFormValues {
  amount: string;
  category: Category;
  description: string;
  date: string;
}

interface ExpenseFormProps {
  initialValues?: ExpenseFormValues;
  submitLabel: string;
  onSubmit: (input: ExpenseInput) => Promise<void>;
  onCancel?: () => void;
}

const createDefaultValues = (): ExpenseFormValues => ({
  amount: "",
  category: Category.Food,
  description: "",
  date: "",
});

/** Shared form for creating and editing expenses. */
export function ExpenseForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: ExpenseFormProps) {
  const [values, setValues] = useState<ExpenseFormValues>(
    initialValues ?? createDefaultValues()
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setValues({
        ...initialValues,
        amount: initialValues.amount
          ? formatAmountInput(initialValues.amount)
          : "",
      });
      return;
    }

    setValues((current) => ({
      ...current,
      date: getTodayDateString(),
    }));
  }, [initialValues]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const normalizedAmount = formatAmountInput(values.amount);
      const amount = Number.parseFloat(normalizedAmount);

      if (!normalizedAmount || Number.isNaN(amount) || amount <= 0) {
        throw new Error("Amount must be a positive number.");
      }

      await onSubmit({
        amount,
        category: values.category,
        description: values.description.trim(),
        date: values.date,
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save expense."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="min-w-0 space-y-4 overflow-hidden" onSubmit={handleSubmit}>
      <div className="min-w-0 space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <AmountInput
          id="amount"
          value={values.amount}
          onChange={(amount) =>
            setValues((current) => ({ ...current, amount }))
          }
          required
        />
      </div>

      <div className="min-w-0 space-y-2">
        <Label htmlFor="category">Category</Label>
        <CategoryPicker
          id="category"
          value={values.category}
          onChange={(category) =>
            setValues((current) => ({
              ...current,
              category,
            }))
          }
        />
      </div>

      <div className="min-w-0 space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          className="block w-full min-w-0 max-w-full"
          value={values.date}
          onChange={(event) =>
            setValues((current) => ({ ...current, date: event.target.value }))
          }
          required
        />
      </div>

      <div className="min-w-0 space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Optional note about this expense"
          value={values.description}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          maxLength={500}
        />
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex flex-wrap justify-end gap-2 pt-1">
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner size="sm" /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
