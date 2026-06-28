"use client";

import {
  formatAmountInput,
  sanitizeAmountInput,
} from "@/lib/utils/format";
import { cn } from "@/lib/utils";

interface AmountInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

/** Naira amount field with prefix, decimal suffix, and no number spinners. */
export function AmountInput({
  id,
  value,
  onChange,
  required,
  className,
}: AmountInputProps) {
  const showDecimalSuffix = value.length > 0 && !value.includes(".");

  const handleBlur = () => {
    if (!value.trim()) {
      return;
    }

    const formatted = formatAmountInput(value);

    if (formatted) {
      onChange(formatted);
    }
  };

  return (
    <div
      className={cn(
        "flex h-11 w-full min-w-0 items-center rounded-xl border border-input bg-white px-3 shadow-sm transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
        className
      )}
    >
      <span className="mr-2 shrink-0 text-sm font-semibold text-primary">₦</span>
      <div className="flex min-w-0 flex-1 items-center">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          required={required}
          value={value}
          placeholder="0"
          onChange={(event) => onChange(sanitizeAmountInput(event.target.value))}
          onBlur={handleBlur}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {showDecimalSuffix ? (
          <span className="shrink-0 text-sm text-muted-foreground">.00</span>
        ) : null}
      </div>
    </div>
  );
}
