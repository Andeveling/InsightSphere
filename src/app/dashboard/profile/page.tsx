import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Get user data with current strengths
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      userStrengths: {
        select: { strengthId: true }
      }
    }
  });

  if (!user) {
    redirect("/auth/signin");
  }

  // Get all domains with their strengths
  const domains = await prisma.domain.findMany({
    include: {
      strengths: {
        orderBy: { name: 'asc' }
      }
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Gestiona tu información personal y selecciona tus fortalezas principales.
          </p>
        </div>

        <ProfileForm user={user} domains={domains} />
      </div>
    </div>
  );
}
