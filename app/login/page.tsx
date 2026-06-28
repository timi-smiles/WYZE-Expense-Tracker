import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Loading } from "@/components/ui/loading";

export default function LoginPage() {
  return (
    <>
      <MarketingNav />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4 py-12 sm:px-6">
        <Suspense fallback={<Loading layout="fullscreen" />}>
          <AuthForm mode="login" />
        </Suspense>
      </main>
      <p className="pb-8 text-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Back to home
        </Link>
      </p>
    </>
  );
}
