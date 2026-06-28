const steps = [
  {
    number: "01",
    title: "Create your account",
    description: "Sign up in under a minute and get your own private expense workspace.",
  },
  {
    number: "02",
    title: "Add your expenses",
    description: "Record spending with amount, category, date, and optional notes.",
  },
  {
    number: "03",
    title: "Review your dashboard",
    description: "See totals, charts, and insights that help you understand your habits.",
  },
];

/** Simple three-step explanation of the product flow. */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it Works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            From signup to insight in three steps
          </h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-bold text-primary">{step.number}</p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
