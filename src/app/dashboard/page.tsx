import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Users, BarChart3 } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <PageContainer maxWidth="xl" padding="md" spacing="md">
      <div className="space-y-8">
        <PageHeader
          title={`Bienvenido, ${session.user.name}!`}
          description="Explora tus fortalezas HIGH5 y colabora con tu equipo para descubrir el potencial colectivo."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Tu Perfil</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Completa tu perfil HIGH5 y descubre tus fortalezas principales
              </CardDescription>
              <Button asChild className="w-full">
                <Link href="/dashboard/profile">
                  Gestionar Perfil
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Actividad de Equipo</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Participa en actividades de descubrimiento de fortalezas del equipo
              </CardDescription>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/team">
                  Ver Equipo
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Reportes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Visualiza los insights colectivos de tu equipo
              </CardDescription>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/reports">
                  Ver Reportes
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
