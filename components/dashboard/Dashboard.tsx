"use client";

import { useState } from "react";
import { Category } from "@prisma/client";
import { Search } from "lucide-react";
import { AddExpenseModal } from "@/components/dashboard/AddExpenseModal";
import { CategoryFilter } from "@/components/dashboard/CategoryFilter";
import { EditExpenseModal } from "@/components/dashboard/EditExpenseModal";
import { ExpenseTable } from "@/components/dashboard/ExpenseTable";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { StatCards } from "@/components/dashboard/StatCards";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useDashboard } from "@/hooks/useDashboard";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { MESSAGES } from "@/lib/constants/messages";
import {
  createExpenseRequest,
  deleteExpenseRequest,
  updateExpenseRequest,
} from "@/lib/utils/api-client";
import type { Expense, ExpenseInput } from "@/types/expense";

/** Main dashboard orchestrating expense data, filters, and actions. */
export function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, error, refresh, userName } = useDashboard(
    selectedCategory,
    debouncedSearch
  );

  const handleCreateExpense = async (input: ExpenseInput) => {
    await createExpenseRequest(input);
    setFormKey((current) => current + 1);
    await refresh();
  };

  const handleUpdateExpense = async (id: string, input: ExpenseInput) => {
    await updateExpenseRequest(id, input);
    await refresh();
  };

  const handleDeleteExpense = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteExpenseRequest(id);
      await refresh();
    } catch (deleteError) {
      console.error(deleteError);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {isLoading && !data ? (
          <Loading layout="page" size="lg" />
        ) : data ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Welcome back, {userName}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Here&apos;s a quick look at your spending so far.
              </p>
            </div>

            <StatCards
              summary={data.summary}
              onAddExpense={() => setIsAddModalOpen(true)}
            />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <SpendingChart summary={data.summary} />
              <InsightsPanel userName={userName} data={data} />
            </div>

            <Card>
              <CardHeader className="space-y-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <CardTitle>Recent Expenses</CardTitle>
                  <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search expenses..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Loading layout="section" />
                ) : (
                  <ExpenseTable
                    expenses={data.expenses}
                    isFiltered={
                      selectedCategory !== "All" || debouncedSearch.length > 0
                    }
                    deletingId={deletingId}
                    onEdit={setEditingExpense}
                    onDelete={handleDeleteExpense}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="py-20 text-center text-sm text-muted-foreground">
            {MESSAGES.loadFailed}
          </div>
        )}

        <AddExpenseModal
          isOpen={isAddModalOpen}
          formKey={formKey}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleCreateExpense}
        />

        <EditExpenseModal
          expense={editingExpense}
          isOpen={Boolean(editingExpense)}
          onClose={() => setEditingExpense(null)}
          onSubmit={handleUpdateExpense}
        />
    </>
  );
}
