import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroIllustration } from "@/components/marketing/HeroIllustration";

/** Landing page hero section with headline and CTA. */
export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-14">
      <div className="animate-fade-up space-y-4">
        <h1 className="hero-gradient-text text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
          Know exactly where your money goes.
        </h1>
        <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          WYZE helps you track spending, understand patterns, and stay in control
          with a clean dashboard built for everyday use.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/register">
              Start tracking free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>

      <div>
        <HeroIllustration />
      </div>
    </section>
  );
}
