"use client";

import { Bot } from "lucide-react";
import { buildExpenseInsights } from "@/lib/utils/insights";
import type { DashboardData } from "@/types/expense";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface InsightsPanelProps {
  userName: string;
  data: DashboardData;
}

/** Conversational insights panel powered by the user's expense data. */
export function InsightsPanel({ userName, data }: InsightsPanelProps) {
  const messages = buildExpenseInsights(userName, data);

  return (
    <Card className="h-full bg-gradient-to-br from-white to-accent/40">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Expense Insights</CardTitle>
            <CardDescription>Smart summaries from your spending data</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((message, index) => (
          <div
            key={`${message}-${index}`}
            className="max-w-[95%] rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3 text-sm leading-6 shadow-sm"
          >
            {message}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
