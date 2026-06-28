import { CATEGORY_LABELS } from "@/lib/constants/categories";
import { formatCurrency } from "@/lib/utils/format";
import type { DashboardData } from "@/types/expense";

/**
 * Builds up to three human-readable insight messages from dashboard data.
 */
export function buildExpenseInsights(
  userName: string,
  data: DashboardData
): string[] {
  const { summary, insights } = data;
  const firstName = userName.split(" ")[0];
  const messages: string[] = [
    `Welcome back, ${firstName}.`,
    `You've spent ${formatCurrency(summary.monthlyTotal)} this month.`,
  ];

  if (summary.monthlyTotal === 0) {
    messages.push("Start logging expenses to unlock more insights.");
    return messages;
  }

  if (insights.monthlyChangePercent !== null && insights.lastMonthTotal > 0) {
    const change = Math.abs(Math.round(insights.monthlyChangePercent));

    if (insights.monthlyChangePercent < 0) {
      messages.push(`You spent ${change}% less than last month.`);
      return messages;
    }

    if (insights.monthlyChangePercent > 0) {
      messages.push(`You spent ${change}% more than last month.`);
      return messages;
    }

    messages.push("Your spending is unchanged compared to last month.");
    return messages;
  }

  if (insights.topCategory) {
    const percentage = Math.round(
      (insights.topCategory.total / summary.monthlyTotal) * 100
    );

    messages.push(
      `${CATEGORY_LABELS[insights.topCategory.category]} accounts for ${percentage}% of your spending.`
    );
    return messages;
  }

  if (insights.largestExpenseThisMonth) {
    messages.push(
      `Your largest expense this month was ${formatCurrency(insights.largestExpenseThisMonth.amount)}.`
    );
    return messages;
  }

  messages.push(
    `You've logged ${insights.monthlyCount} expense${insights.monthlyCount === 1 ? "" : "s"} this month.`
  );

  return messages;
}
