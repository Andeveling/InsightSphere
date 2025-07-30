"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { 
  ProfileFormDataSchema, 
  isProfileComplete, 
  type ActionResponse,
  type ProfileFormData 
} from "@/lib/validations/profile";

/**
 * Submit profile form using React 19 useActionState pattern
 * Following Lee Robinson's pattern from the video
 */
export async function submitProfile(
  prevState: ActionResponse | null, 
  formData: FormData
): Promise<ActionResponse> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "No autorizado - Inicia sesión para continuar"
    };
  }

  try {
    // Extract data from FormData
    const rawData: Record<string, string> = {
      age: formData.get('age') as string,
      career: formData.get('career') as string,
      hobbies: formData.get('hobbies') as string,
      description: formData.get('description') as string,
      strengthIds: formData.get('strengthIds') as string
    };

    // Validate the form data using Zod
    const validatedData = ProfileFormDataSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Por favor corrige los errores en el formulario",
        errors: validatedData.error.flatten().fieldErrors
      };
    }

    const { age, career, hobbies, description, strengthIds } = validatedData.data;

    // Start database transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update user basic information
      const updatedUser = await tx.user.update({
        where: { id: session.user.id },
        data: {
          age,
          career,
          hobbies,
          description
        }
      });

      // Delete existing user strengths
      await tx.userStrength.deleteMany({
        where: { userId: session.user.id }
      });

      // Create new user strengths
      await tx.userStrength.createMany({
        data: strengthIds.map(strengthId => ({
          userId: session.user.id!,
          strengthId
        }))
      });

      // Get updated user with relations to check completion
      const userWithRelations = await tx.user.findUnique({
        where: { id: session.user.id },
        include: {
          userStrengths: {
            select: { strengthId: true }
          }
        }
      });

      if (!userWithRelations) {
        throw new Error("Usuario no encontrado después de la actualización");
      }

      // Check if profile is now complete
      const profileCompleteStatus = isProfileComplete(userWithRelations);

      // Update profileComplete field
      await tx.user.update({
        where: { id: session.user.id },
        data: { profileComplete: profileCompleteStatus }
      });

      return {
        updatedUser,
        profileComplete: profileCompleteStatus
      };
    });

    // Revalidate relevant paths
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: result.profileComplete 
        ? "¡Perfil completado exitosamente! Redirigiendo al dashboard..." 
        : "Perfil actualizado exitosamente",
      data: {
        profileComplete: result.profileComplete,
        redirectTo: result.profileComplete ? "/dashboard" : undefined
      }
    };

  } catch (error) {
    console.error("Error updating profile:", error);
    
    if (error instanceof Error) {
      return {
        success: false,
        message: `Error al actualizar el perfil: ${error.message}`
      };
    }
    
    return {
      success: false,
      message: "Error inesperado al actualizar el perfil"
    };
  }
}
