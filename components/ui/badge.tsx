import * as React from "react";
import { cn } from "@/lib/utils";

/** Small status badge for categories and labels. */
function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
