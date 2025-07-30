import React from "react";
import Link from "next/link";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-3xl mx-auto py-8 px-4">
      <nav className="mb-6 text-sm text-muted-foreground flex gap-2 items-center">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <span>/</span>
        <span className="font-semibold text-primary">Perfil</span>
      </nav>
      {children}
    </section>
  );
}
