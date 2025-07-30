import { z } from "zod";

// Schema for user profile update
export const profileSchema = z.object({
  age: z
    .number()
    .int()
    .min(16, "La edad mínima es 16 años")
    .max(99, "La edad máxima es 99 años")
    .optional(),
  
  career: z
    .string()
    .min(2, "La carrera debe tener al menos 2 caracteres")
    .max(100, "La carrera no puede exceder 100 caracteres")
    .optional(),
  
  hobbies: z
    .string()
    .min(10, "Los hobbies deben tener al menos 10 caracteres")
    .max(500, "Los hobbies no pueden exceder 500 caracteres")
    .optional(),
  
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres")
    .max(1000, "La descripción no puede exceder 1000 caracteres"),
  
  strengthIds: z
    .array(z.cuid("ID de fortaleza inválido"))
    .length(5, "Debes seleccionar exactamente 5 fortalezas")
});

// Schema for profile form input (includes string age for form handling)
export const profileFormSchema = z.object({
  age: z
    .string()
    .transform((val) => {
      const num = parseInt(val, 10);
      if (isNaN(num)) return undefined;
      return num;
    })
    .pipe(
      z
        .number()
        .int()
        .min(16, "La edad mínima es 16 años")
        .max(99, "La edad máxima es 99 años")
        .optional()
    ),
  
  career: z
    .string()
    .min(2, "La carrera debe tener al menos 2 caracteres")
    .max(100, "La carrera no puede exceder 100 caracteres")
    .optional()
    .or(z.literal("")),
  
  hobbies: z
    .string()
    .min(10, "Los hobbies deben tener al menos 10 caracteres")
    .max(500, "Los hobbies no pueden exceder 500 caracteres")
    .optional()
    .or(z.literal("")),
  
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres")
    .max(1000, "La descripción no puede exceder 1000 caracteres"),
  
  strengthIds: z
    .array(z.string().cuid("ID de fortaleza inválido"))
    .length(5, "Debes seleccionar exactamente 5 fortalezas")
});

// Schema for strength selection validation
export const strengthSelectionSchema = z.object({
  strengthIds: z
    .array(z.string().cuid("ID de fortaleza inválido"))
    .length(5, "Debes seleccionar exactamente 5 fortalezas")
});

// Schema for individual field updates
export const profileFieldSchema = z.object({
  field: z.enum(["age", "career", "hobbies", "description"]),
  value: z.union([z.string(), z.number(), z.undefined()])
});

// Type definitions
export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type ProfileData = z.infer<typeof profileSchema>;
export type StrengthSelection = z.infer<typeof strengthSelectionSchema>;
export type ProfileFieldUpdate = z.infer<typeof profileFieldSchema>;

// Validation helper functions
export function validateProfileData(data: unknown): ProfileData {
  return profileSchema.parse(data);
}

export function validateProfileFormData(data: unknown): ProfileFormData {
  return profileFormSchema.parse(data);
}

export function validateStrengthSelection(data: unknown): StrengthSelection {
  return strengthSelectionSchema.parse(data);
}

// Profile completion checker
export function isProfileComplete(user: {
  age?: number | null;
  career?: string | null;
  hobbies?: string | null;
  description?: string | null;
  userStrengths?: Array<{ strengthId: string }>;
}): boolean {
  return !!(
    user.age &&
    user.career && 
    user.career.length >= 2 &&
    user.hobbies && 
    user.hobbies.length >= 10 &&
    user.description && 
    user.description.length >= 20 &&
    user.userStrengths && 
    user.userStrengths.length === 5
  );
}
