import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProfileForm } from "@/components/profile/profile-form";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

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
    <>
      <PageHeader
        title="Mi Perfil"
        description="Gestiona tu información personal y selecciona tus fortalezas principales."
      />

      <ProfileForm user={user} domains={domains} />
    </>
  );
}
