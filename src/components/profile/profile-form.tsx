"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ErrorDisplay } from "@/components/ui/error-display"
import { StrengthRankingSelector } from "@/components/profile/strength-ranking-selector"
import { submitProfile } from "@/actions/profile.actions"
import { toast } from "sonner"
import { User, Calendar, Briefcase, Heart, FileText, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ActionResponse } from "@/lib/validations/profile.schema"
import type { InferSafeActionFnResult } from "next-safe-action"
import { getUserWithStrengths } from "@/actions/user.actions"
import { getAllDomainsWithStrengths } from "@/actions/strengths.actions"

export type UserWithStrengthsResult = InferSafeActionFnResult<typeof getUserWithStrengths>
export type DomainsResult = InferSafeActionFnResult<typeof getAllDomainsWithStrengths>

interface ProfileFormProps {
  user: UserWithStrengthsResult["data"]
  domains: DomainsResult["data"]
}

const initialState: ActionResponse = {
  success: false,
  message: "",
}

export function ProfileForm({ user, domains }: ProfileFormProps) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(submitProfile, initialState)
  
  const [strengthRankings, setStrengthRankings] = useState<Array<{ strengthId: string; position: number | null }>>(() => {
    if (!user?.userStrengths?.length) return []
    
    return user.userStrengths
      .map((us) => ({
        strengthId: us.strengthId,
        position: us.position ?? null,
      }))
      .sort((a, b) => {
        if (a.position == null && b.position != null) return 1
        if (a.position != null && b.position == null) return -1
        if (a.position == null && b.position == null) return 0
        return (a.position as number) - (b.position as number)
      })
  })

  // Handle success state and redirects
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      if (state.data?.profileComplete && state.data?.redirectTo) {
        setTimeout(() => {
          router.push(state.data.redirectTo)
        }, 1500)
      }
    } else if (state?.message && !state.success) {
      toast.error(state.message)
    }
  }, [state, router])

  // Early return if user or domains are not available
  if (!user || !domains) {
    return <div>Loading...</div>
  }

  // Check if personal info is complete
  const isPersonalInfoComplete = user.age && user.career && user.hobbies && user.description
  const isStrengthsComplete = strengthRankings.filter(r => r.position !== null).length === 5

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-3">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Completa tu Perfil</h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Comparte tu información personal y selecciona tus 5 fortalezas principales
          </p>
        </div>

        <form action={formAction} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Personal Information */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent rounded-lg">
                    <FileText className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Información Personal</CardTitle>
                    <CardDescription className="text-sm">Datos básicos sobre ti</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center space-x-2 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      <span>Edad</span>
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="100"
                      defaultValue={user.age?.toString() || ""}
                      placeholder="Ej: 25"
                      disabled={isPending}
                      className="h-10"
                    />
                    {state?.errors?.age && <ErrorDisplay errors={state.errors.age} />}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="career" className="flex items-center space-x-2 text-sm font-medium">
                      <Briefcase className="w-4 h-4" />
                      <span>Profesión/Carrera</span>
                    </Label>
                    <Input
                      id="career"
                      name="career"
                      defaultValue={user.career || ""}
                      placeholder="Ej: Desarrollador de Software"
                      disabled={isPending}
                      className="h-10"
                    />
                    {state?.errors?.career && <ErrorDisplay errors={state.errors.career} />}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hobbies" className="flex items-center space-x-2 text-sm font-medium">
                    <Heart className="w-4 h-4" />
                    <span>Hobbies e Intereses</span>
                  </Label>
                  <Input
                    id="hobbies"
                    name="hobbies"
                    defaultValue={user.hobbies || ""}
                    placeholder="Ej: Lectura, deportes, música, viajes..."
                    disabled={isPending}
                    className="h-10"
                  />
                  {state?.errors?.hobbies && <ErrorDisplay errors={state.errors.hobbies} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center space-x-2 text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    <span>Descripción Personal</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={user.description || ""}
                    placeholder="Cuéntanos un poco sobre ti, tus objetivos y qué te motiva..."
                    rows={4}
                    disabled={isPending}
                    className="resize-none"
                  />
                  {state?.errors?.description && <ErrorDisplay errors={state.errors.description} />}
                </div>

                {/* Personal Info Status */}
                <div
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg text-sm",
                    isPersonalInfoComplete
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {isPersonalInfoComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-current" />
                  )}
                  <span className="font-medium">
                    {isPersonalInfoComplete ? "Información personal completa" : "Completa tu información personal"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    disabled={isPending || !isPersonalInfoComplete || !isStrengthsComplete}
                    className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Guardar Perfil
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard")}
                    disabled={isPending}
                    className="h-10"
                  >
                    Cancelar
                  </Button>
                </div>

                {(!isPersonalInfoComplete || !isStrengthsComplete) && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Perfil incompleto:</strong> Completa toda la información personal y selecciona exactamente
                      5 fortalezas para continuar.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Error Display */}
            {state?.message && !state.success && <ErrorDisplay errors={[state.message]} />}
          </div>

          {/* Right Column - Strengths Selection */}
          <div className="space-y-6">
            <StrengthRankingSelector
              domains={domains}
              selectedRankings={strengthRankings}
              onChange={setStrengthRankings}
              disabled={isPending}
              name="strengthRankings"
            />

            {state?.errors?.strengthRankings && <ErrorDisplay errors={state.errors.strengthRankings} />}
            {state?.errors?.strengthIds && <ErrorDisplay errors={state.errors.strengthIds} />}
          </div>
        </form>
      </div>
    </div>
  )
}
