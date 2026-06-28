import { cn } from "@/lib/utils";

const spinnerSizes = {
  sm: "h-4 w-4 border-2",
  md: "h-9 w-9 border-2",
  lg: "h-12 w-12 border-[3px]",
} as const;

const containerSizes = {
  sm: "h-5 w-5",
  md: "h-10 w-10",
  lg: "h-14 w-14",
} as const;

type LoadingSize = keyof typeof spinnerSizes;

interface LoadingSpinnerProps {
  size?: LoadingSize;
  className?: string;
}

/** Branded spinning indicator used inline and inside buttons. */
export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        containerSizes[size],
        className
      )}
    >
      <div className="absolute inset-0 rounded-full bg-primary/10" />
      <div
        className={cn(
          "relative animate-spin rounded-full border-primary/20 border-t-primary",
          spinnerSizes[size]
        )}
      />
    </div>
  );
}

const layoutVariants = {
  inline: "",
  section: "flex items-center justify-center py-10",
  page: "flex min-h-[40vh] items-center justify-center",
  fullscreen: "flex min-h-[calc(100vh-4rem)] items-center justify-center",
} as const;

type LoadingLayout = keyof typeof layoutVariants;

interface LoadingProps {
  size?: LoadingSize;
  layout?: LoadingLayout;
  className?: string;
}

/** Shared loading state wrapper for pages and content sections. */
export function Loading({ size = "md", layout = "section", className }: LoadingProps) {
  return (
    <div className={cn(layoutVariants[layout], className)}>
      <LoadingSpinner size={size} />
    </div>
  );
}
