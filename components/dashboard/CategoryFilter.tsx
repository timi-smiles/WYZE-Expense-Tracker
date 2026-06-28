"use client";

import { Category } from "@prisma/client";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: Category | "All";
  onChange: (category: Category | "All") => void;
}

/** Category filter chips for the expense list. */
export function CategoryFilter({
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("All")}
        className={cn(
          "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
          selectedCategory === "All"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-white text-muted-foreground hover:border-primary hover:text-primary"
        )}
      >
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
            selectedCategory === category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-white text-muted-foreground hover:border-primary hover:text-primary"
          )}
        >
          {CATEGORY_LABELS[category]}
        </button>
      ))}
    </div>
  );
}
