"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CATEGORY_LABELS } from "@/lib/constants/categories";
import { formatCurrency } from "@/lib/utils/format";
import type { ExpenseSummary } from "@/types/expense";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const CHART_COLORS = [
  "hsl(214 84% 56%)",
  "hsl(199 89% 48%)",
  "hsl(262 52% 55%)",
  "hsl(24 95% 53%)",
  "hsl(340 75% 55%)",
  "hsl(0 72% 51%)",
  "hsl(215 16% 47%)",
];

interface SpendingChartProps {
  summary: ExpenseSummary;
}

/** Donut chart showing spending distribution by category. */
export function SpendingChart({ summary }: SpendingChartProps) {
  const chartData = summary.monthlyByCategory
    .filter((item) => item.total > 0)
    .map((item) => ({
      name: CATEGORY_LABELS[item.category],
      value: item.total,
    }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Monthly distribution across your expense categories.</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            Add expenses to see your spending chart.
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value ?? 0))}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(214 20% 90%)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
