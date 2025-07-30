// src/app/profile/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <div className="rounded-lg border p-6 bg-background">
        <p>Bienvenido a tu perfil. Aquí podrás ver y editar tu información personal y fortalezas.</p>
      </div>
    </main>
  );
}
