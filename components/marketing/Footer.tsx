import Link from "next/link";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
];

const accountLinks = [
  { label: "Sign in", href: "/login" },
  { label: "Register", href: "/register" },
];

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "text-sm text-muted-foreground transition-colors duration-200 hover:text-primary";

  if (external) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function LinkGroup({
  title,
  links,
  anchor,
}: {
  title: string;
  links: { label: string; href: string }[];
  anchor?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink
              href={link.href}
              label={link.label}
              external={anchor}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Marketing site footer. */
export function Footer() {
  return (
    <footer className="border-t border-border bg-[hsl(214,40%,97%)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 8.5C4 6.567 5.567 5 7.5 5H16.5C18.433 5 20 6.567 20 8.5V10H4V8.5Z"
                    fill="currentColor"
                    opacity="0.25"
                  />
                  <path
                    d="M4 10H20V15.5C20 17.433 18.433 19 16.5 19H7.5C5.567 19 4 17.433 4 15.5V10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 14H11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">
                WYZE Expense Manager
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Simple expense tracking for professionals and teams who want
              clarity without complexity.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 sm:gap-20">
            <LinkGroup title="Product" links={productLinks} anchor />
            <LinkGroup title="Account" links={accountLinks} />
          </div>
        </div>

        <div className="mt-10 border-t border-border/80 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Timilehin Ogunnowo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
