import { getAllDomainsWithStrengths } from "@/actions/strengths.actions";
import { getUserWithStrengths } from "@/actions/user.actions";
import { auth } from "@/auth";
import { PageHeader } from "@/components/layout/page-header";
import { ProfileForm } from "@/components/profile/profile-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfileEditPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }
  
  const userResult = await getUserWithStrengths()
  const domainsResult = await getAllDomainsWithStrengths()

  if (!userResult?.data || !domainsResult?.data) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Editar Perfil"
        description="Gestiona tu información personal y selecciona tus TOP 5 fortalezas."
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/profile/view">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Perfil
          </Link>
        </Button>
      </PageHeader>

      <ProfileForm user={userResult.data} domains={domainsResult.data} />
    </div>
  );
}
