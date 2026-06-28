"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ExpenseForm,
  type ExpenseFormValues,
} from "@/components/forms/ExpenseForm";
import type { Expense, ExpenseInput } from "@/types/expense";

interface EditExpenseModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, input: ExpenseInput) => Promise<void>;
}

/** Modal wrapper for editing an existing expense. */
export function EditExpenseModal({
  expense,
  isOpen,
  onClose,
  onSubmit,
}: EditExpenseModalProps) {
  if (!expense) {
    return null;
  }

  const initialValues: ExpenseFormValues = {
    amount: expense.amount.toString(),
    category: expense.category,
    description: expense.description,
    date: expense.date,
  };

  const handleSubmit = async (input: ExpenseInput) => {
    await onSubmit(expense.id, input);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        <ExpenseForm
          key={expense.id}
          initialValues={initialValues}
          submitLabel="Save Changes"
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
