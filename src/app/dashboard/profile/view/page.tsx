import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { StrengthsDisplay } from "@/components/profile/strengths-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Briefcase, Heart, FileText, Edit } from "lucide-react";
import Link from "next/link";

export default async function ProfileViewPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Get user data with complete profile information
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      team: true,
      userStrengths: {
        include: {
          strength: {
            include: {
              domain: true
            }
          }
        }
      }
    }
  });

  if (!user) {
    redirect("/auth/signin");
  }

  const breadcrumbItems = [
    { label: "Perfil", href: "/dashboard/profile" },
    { label: "Ver Perfil", current: true }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Mi Perfil"
        description="Visualiza tu información personal y tus fortalezas HIGH5"
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      >
        <Button asChild>
          <Link href="/dashboard/profile/edit">
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                  <p className="text-base">{user.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base">{user.email}</p>
                </div>

                {user.age && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Edad</p>
                      <p className="text-base">{user.age} años</p>
                    </div>
                  </div>
                )}

                {user.career && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Profesión</p>
                      <p className="text-base">{user.career}</p>
                    </div>
                  </div>
                )}

                {user.hobbies && (
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Hobbies</p>
                      <p className="text-base">{user.hobbies}</p>
                    </div>
                  </div>
                )}

                {user.team && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Equipo</p>
                    <Badge variant="outline" className="mt-1">
                      {user.team.name}
                    </Badge>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado del Perfil</p>
                  <Badge 
                    variant={user.profileComplete ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {user.profileComplete ? "Completo" : "Incompleto"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {user.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Descripción Personal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {user.description}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Strengths Display */}
        <div className="lg:col-span-2">
          <StrengthsDisplay user={user} />
        </div>
      </div>

      {!user.profileComplete && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/10">
          <CardHeader>
            <CardTitle className="text-amber-800 dark:text-amber-200">
              Perfil Incompleto
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300">
              Para aprovechar al máximo InsightSphere, completa toda tu información personal y selecciona tus 5 fortalezas principales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="default">
              <Link href="/dashboard/profile/edit">
                Completar Perfil
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
