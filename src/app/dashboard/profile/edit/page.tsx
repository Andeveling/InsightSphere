import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfileEditPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Placeholder para el formulario de edición de perfil
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      {/* Aquí irá el formulario de edición de perfil */}
      <div className="rounded-lg border p-6 bg-background">
        <p>Edita tu información personal y fortalezas aquí.</p>
      </div>
    </main>
  );
}
