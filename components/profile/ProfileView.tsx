"use client";

import { useSession } from "next-auth/react";
import { Mail, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

/** Simple account overview for the signed-in user. */
export function ProfileView() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "User";
  const email = session?.user?.email ?? "No email on file";
  const initials =
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account details and personal information.
        </p>
      </div>

      <Card className="max-w-xl overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/15 via-accent to-primary/10" />
        <CardHeader className="-mt-12 space-y-4">
          <Avatar className="h-20 w-20 border-4 border-white shadow-md">
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{name}</CardTitle>
            <CardDescription>Manage your WYZE account</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
            <UserRound className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Full name
              </p>
              <p className="text-sm font-medium">{name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
            <Mail className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
              </p>
              <p className="text-sm font-medium">{email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
