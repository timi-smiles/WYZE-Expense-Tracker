"use client";

import { Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import type { ExpenseSummary } from "@/types/expense";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface StatCardsProps {
  summary: ExpenseSummary;
  onAddExpense: () => void;
}

/** Top-level summary metrics with a quick add action. */
export function StatCards({ summary, onAddExpense }: StatCardsProps) {
  const stats = [
    {
      label: "Total Expenses",
      value: formatCurrency(summary.total),
      highlight: false,
    },
    {
      label: "This Month",
      value: formatCurrency(summary.monthlyTotal),
      highlight: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex flex-wrap gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="w-[148px] shrink-0">
            <CardHeader className="space-y-0 p-4 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p
                className={
                  stat.highlight
                    ? "text-xl font-bold tracking-tight text-primary"
                    : "text-xl font-bold tracking-tight"
                }
              >
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button size="lg" onClick={onAddExpense} className="w-full sm:w-auto">
        <Plus className="h-4 w-4" />
        Add Expense
      </Button>
    </div>
  );
}
