"use client";

import { Pencil, Trash2 } from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/constants/categories";
import { MESSAGES } from "@/lib/constants/messages";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import type { Expense } from "@/types/expense";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExpenseTableProps {
  expenses: Expense[];
  isFiltered: boolean;
  deletingId: string | null;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

/** Responsive expense table with edit and delete actions. */
export function ExpenseTable({
  expenses,
  isFiltered,
  deletingId,
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
        <p className="text-sm font-medium">
          {isFiltered ? MESSAGES.emptyFiltered : MESSAGES.emptyExpenses}
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>
              <Badge>{CATEGORY_LABELS[expense.category]}</Badge>
            </TableCell>
            <TableCell className="max-w-[220px] truncate">
              {expense.description || "No description"}
            </TableCell>
            <TableCell>{formatDate(expense.date)}</TableCell>
            <TableCell className="text-right font-semibold">
              {formatCurrency(expense.amount)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(expense)}
                  aria-label="Edit expense"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(expense.id)}
                  disabled={deletingId === expense.id}
                  aria-label="Delete expense"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
