"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorDisplay } from "@/components/ui/error-display";
import { StrengthRankingSelector } from "@/components/profile/strength-ranking-selector";
import { submitProfile } from "@/actions/profile";
import { toast } from "sonner";
import type { ActionResponse } from "@/lib/validations/profile";
import type { User, Strength, Domain, UserStrength } from "@prisma/client";

interface ProfileFormProps {
  user: User & {
    userStrengths: (UserStrength & {
      strength: Strength;
    })[];
  };
  domains: (Domain & {
    strengths: Strength[];
  })[];
}

const initialState: ActionResponse = {
  success: false,
  message: ""
};

export function ProfileForm({ user, domains }: ProfileFormProps) {
  const router = useRouter();
  
  // React 19 useActionState hook following Lee Robinson's pattern
  const [state, formAction, isPending] = useActionState(submitProfile, initialState);

  // State for strength rankings
  const [strengthRankings, setStrengthRankings] = useState<Array<{ strengthId: string; position: number }>>([]);

  // Initialize strength rankings from user data
  useEffect(() => {
    if (user.userStrengths.length > 0) {
      const rankings = user.userStrengths
        .filter(us => us.position !== null)
        .map(us => ({
          strengthId: us.strengthId,
          position: us.position!
        }))
        .sort((a, b) => a.position - b.position);
      
      setStrengthRankings(rankings);
    }
  }, [user.userStrengths]);

  // Handle success state and redirects
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      
      // Handle redirect if profile is complete
      if (state.data?.profileComplete && state.data?.redirectTo) {
        setTimeout(() => {
          router.push(state.data.redirectTo);
        }, 1500); // Give time for success message
      }
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completa tu Perfil</CardTitle>
        <CardDescription>
          Completa tu información personal y selecciona exactamente 5 fortalezas que mejor te representen.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form action={formAction} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Personal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="100"
                  defaultValue={user.age?.toString() || ""}
                  placeholder="Ej: 25"
                  disabled={isPending}
                />
                {state?.errors?.age && (
                  <ErrorDisplay errors={state.errors.age} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="career">Profesión/Carrera</Label>
                <Input
                  id="career"
                  name="career"
                  defaultValue={user.career || ""}
                  placeholder="Ej: Desarrollador de Software"
                  disabled={isPending}
                />
                {state?.errors?.career && (
                  <ErrorDisplay errors={state.errors.career} />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hobbies">Hobbies e Intereses</Label>
              <Input
                id="hobbies"
                name="hobbies"
                defaultValue={user.hobbies || ""}
                placeholder="Ej: Lectura, deportes, música, viajes..."
                disabled={isPending}
              />
              {state?.errors?.hobbies && (
                <ErrorDisplay errors={state.errors.hobbies} />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Personal</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={user.description || ""}
                placeholder="Cuéntanos un poco sobre ti, tus objetivos y qué te motiva..."
                rows={4}
                disabled={isPending}
              />
              {state?.errors?.description && (
                <ErrorDisplay errors={state.errors.description} />
              )}
            </div>
          </div>

          {/* Strengths Selection Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Selecciona tus TOP 5 Fortalezas</h3>
              <p className="text-sm text-muted-foreground">
                Elige exactamente 5 fortalezas que mejor te representen y ordénalas por prioridad (1-5).
              </p>
            </div>

            <StrengthRankingSelector
              domains={domains}
              selectedRankings={strengthRankings}
              onChange={setStrengthRankings}
              disabled={isPending}
              name="strengthRankings"
            />
            
            {state?.errors?.strengthRankings && (
              <ErrorDisplay errors={state.errors.strengthRankings} />
            )}
            {state?.errors?.strengthIds && (
              <ErrorDisplay errors={state.errors.strengthIds} />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="submit"
              className="flex-1"
              disabled={isPending}
            >
              {isPending ? "Guardando..." : "Guardar Perfil"}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={isPending}
            >
              Cancelar
            </Button>
          </div>

          {/* Error Display */}
          {state?.message && !state.success && (
            <div className="pt-4">
              <ErrorDisplay errors={[state.message]} />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
