"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { isProfileComplete, validateProfileData, type ProfileData } from "@/lib/validations/profile";
import { revalidatePath } from "next/cache";

/**
 * Update user profile with validation
 */
export async function updateUserProfile(data: ProfileData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }

  try {
    // Validate input data
    const validatedData = validateProfileData(data);

    // Start transaction to update user and user strengths
    const result = await prisma.$transaction(async (tx) => {
      // Update user basic information
      const updatedUser = await tx.user.update({
        where: { id: session.user.id },
        data: {
          age: validatedData.age,
          career: validatedData.career,
          hobbies: validatedData.hobbies,
          description: validatedData.description
        }
      });

      // Delete existing user strengths
      await tx.userStrength.deleteMany({
        where: { userId: session.user.id }
      });

      // Create new user strengths
      await tx.userStrength.createMany({
        data: validatedData.strengthIds.map(strengthId => ({
          userId: session.user.id!,
          strengthId
        }))
      });

      // Get updated user with relations to check completion
      const userWithRelations = await tx.user.findUnique({
        where: { id: session.user.id },
        include: {
          userStrengths: {
            select: {
              strengthId: true
            }
          }
        }
      });

      if (!userWithRelations) {
        throw new Error("Usuario no encontrado después de la actualización");
      }

      // Check if profile is now complete
      const profileCompleteStatus = isProfileComplete(userWithRelations);

      // Update profileComplete field if it has changed
      if (userWithRelations.profileComplete !== profileCompleteStatus) {
        await tx.user.update({
          where: { id: session.user.id },
          data: { profileComplete: profileCompleteStatus }
        });
      }

      return {
        ...updatedUser,
        profileComplete: profileCompleteStatus
      };
    });

    // Revalidate relevant paths
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Perfil actualizado exitosamente",
      profileComplete: result.profileComplete
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    
    if (error instanceof Error) {
      throw new Error(`Error al actualizar el perfil: ${error.message}`);
    }
    
    throw new Error("Error desconocido al actualizar el perfil");
  }
}

/**
 * Update specific profile field
 */
export async function updateProfileField(field: string, value: string | number | undefined) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }

  try {
    const updateData: Record<string, any> = {};
    updateData[field] = value;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      include: {
        userStrengths: {
          select: {
            strengthId: true
          }
        }
      }
    });

    // Check if profile is complete after update
    const profileCompleteStatus = isProfileComplete(updatedUser);

    // Update profileComplete field if it has changed
    if (updatedUser.profileComplete !== profileCompleteStatus) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { profileComplete: profileCompleteStatus }
      });
    }

    revalidatePath("/dashboard/profile");

    return {
      success: true,
      message: "Campo actualizado exitosamente",
      profileComplete: profileCompleteStatus
    };
  } catch (error) {
    console.error("Error updating profile field:", error);
    throw new Error("Error al actualizar el campo del perfil");
  }
}

/**
 * Update user strengths only
 */
export async function updateUserStrengths(strengthIds: string[]) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }

  if (strengthIds.length !== 5) {
    throw new Error("Debes seleccionar exactamente 5 fortalezas");
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
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

      // Get updated user to check completion
      const userWithRelations = await tx.user.findUnique({
        where: { id: session.user.id },
        include: {
          userStrengths: {
            select: {
              strengthId: true
            }
          }
        }
      });

      if (!userWithRelations) {
        throw new Error("Usuario no encontrado después de la actualización");
      }

      // Check if profile is complete
      const profileCompleteStatus = isProfileComplete(userWithRelations);

      // Update profileComplete field if it has changed
      if (userWithRelations.profileComplete !== profileCompleteStatus) {
        await tx.user.update({
          where: { id: session.user.id },
          data: { profileComplete: profileCompleteStatus }
        });
      }

      return profileCompleteStatus;
    });

    revalidatePath("/dashboard/profile");

    return {
      success: true,
      message: "Fortalezas actualizadas exitosamente",
      profileComplete: result
    };
  } catch (error) {
    console.error("Error updating user strengths:", error);
    throw new Error("Error al actualizar las fortalezas");
  }
}

/**
 * Get the current user's profile with all related data
 */
export async function getUserProfile() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            description: true
          }
        },
        userStrengths: {
          include: {
            strength: {
              include: {
                domain: {
                  select: {
                    id: true,
                    name: true,
                    description: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Calculate if profile is complete
    const profileCompleteStatus = isProfileComplete(user);

    return {
      ...user,
      profileComplete: profileCompleteStatus,
      strengths: user.userStrengths.map(us => ({
        id: us.strength.id,
        name: us.strength.name,
        description: us.strength.description,
        domain: us.strength.domain
      }))
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Error al obtener el perfil del usuario");
  }
}

/**
 * Get basic user profile information (lightweight version)
 */
export async function getUserBasicProfile() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        career: true,
        hobbies: true,
        description: true,
        profileComplete: true,
        teamId: true,
        userStrengths: {
          select: {
            strengthId: true
          }
        }
      }
    });

    if (!user) {
      return null;
    }

    // Calculate actual profile completion status
    const actualProfileComplete = isProfileComplete(user);

    return {
      ...user,
      profileComplete: actualProfileComplete
    };
  } catch (error) {
    console.error("Error fetching basic user profile:", error);
    return null;
  }
}

/**
 * Check if current user's profile is complete
 */
export async function checkProfileComplete(): Promise<boolean> {
  const session = await auth();

  if (!session?.user?.id) {
    return false;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        age: true,
        career: true,
        hobbies: true,
        description: true,
        userStrengths: {
          select: {
            strengthId: true
          }
        }
      }
    });

    if (!user) {
      return false;
    }

    return isProfileComplete(user);
  } catch (error) {
    console.error("Error checking profile completion:", error);
    return false;
  }
}
