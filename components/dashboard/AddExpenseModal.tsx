"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExpenseForm } from "@/components/forms/ExpenseForm";
import type { ExpenseInput } from "@/types/expense";

interface AddExpenseModalProps {
  isOpen: boolean;
  formKey: number;
  onClose: () => void;
  onSubmit: (input: ExpenseInput) => Promise<void>;
}

/** Modal wrapper for creating a new expense. */
export function AddExpenseModal({
  isOpen,
  formKey,
  onClose,
  onSubmit,
}: AddExpenseModalProps) {
  const handleSubmit = async (input: ExpenseInput) => {
    await onSubmit(input);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <ExpenseForm
          key={formKey}
          submitLabel="Save Expense"
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
