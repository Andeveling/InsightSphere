import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProfileForm } from "@/components/profile/profile-form";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProfileEditPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Get user data with current strengths
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      userStrengths: {
        include: {
          strength: true
        }
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

  const breadcrumbItems = [
    { label: "Perfil", href: "/dashboard/profile/view" },
    { label: "Editar", current: true }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Editar Perfil"
        description="Gestiona tu información personal y selecciona tus TOP 5 fortalezas."
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/profile/view">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Perfil
          </Link>
        </Button>
      </PageHeader>

      <ProfileForm user={user} domains={domains} />
    </div>
  );
}
