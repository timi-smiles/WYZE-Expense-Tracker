import {
  BarChart3,
  LineChart,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const features = [
  {
    icon: Wallet,
    title: "Track every expense",
    description:
      "Log purchases in seconds with categories, notes, and dates that stay organized.",
  },
  {
    icon: BarChart3,
    title: "See spending clearly",
    description:
      "Review totals, monthly trends, and category breakdowns in one focused dashboard.",
  },
  {
    icon: LineChart,
    title: "Understand your habits",
    description:
      "Spot where your money goes most and compare spending month over month.",
  },
  {
    icon: ShieldCheck,
    title: "Your private workspace",
    description:
      "Every account gets its own secure space. Your expenses are visible only to you.",
  },
];

/** Feature cards highlighting product benefits. */
export function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to stay on top of spending
          </h2>
          <p className="mt-3 text-muted-foreground">
            A focused set of tools designed to help you track, review, and improve
            your financial habits without complexity.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <CardHeader className="pb-5">
                <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
