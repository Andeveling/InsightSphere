// src/app/profile/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    // Redirige a login si no hay sesión
    redirect("/login");
  }

  // Placeholder para el display del perfil
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      {/* Aquí irá el componente de visualización del perfil */}
      <div className="rounded-lg border p-6 bg-background">
        <p>Bienvenido a tu perfil. Aquí podrás ver y editar tu información personal y fortalezas.</p>
      </div>
    </main>
  );
}
