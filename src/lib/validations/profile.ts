import { z } from "zod";

// Base schemas for reusability
const ageSchema = z
  .number()
  .int()
  .min(16, "La edad mínima es 16 años")
  .max(99, "La edad máxima es 99 años");

const careerSchema = z
  .string()
  .min(2, "La carrera debe tener al menos 2 caracteres")
  .max(100, "La carrera no puede exceder 100 caracteres")
  .trim();

const hobbiesSchema = z
  .string()
  .min(10, "Los hobbies deben tener al menos 10 caracteres")
  .max(500, "Los hobbies no pueden exceder 500 caracteres")
  .trim();

const descriptionSchema = z
  .string()
  .min(20, "La descripción debe tener al menos 20 caracteres")
  .max(1000, "La descripción no puede exceder 1000 caracteres")
  .trim();

const strengthIdsSchema = z
  .array(z.string().cuid("ID de fortaleza inválido"))
  .length(5, "Debes seleccionar exactamente 5 fortalezas");

// Form data schema (from FormData - strings)
/**
 * Schema for profile form data coming from FormData
 * Transforms string inputs to proper types
 */
export const ProfileFormDataSchema = z.object({
  age: ageSchema,
  career: careerSchema,
  hobbies: hobbiesSchema,
  description: descriptionSchema,
  strengthIds: z.string()
    .transform((str) => {
      try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })
    .pipe(z.array(z.string()).length(5, "Debes seleccionar exactamente 5 fortalezas"))
}).transform(data => ({
  age: Number(data.age),
  career: data.career,
  hobbies: data.hobbies,
  description: data.description,
  strengthIds: data.strengthIds
}));

// Profile update schema (processed data)
export const ProfileUpdateSchema = z.object({
  age: ageSchema.optional(),
  career: careerSchema.optional(),
  hobbies: hobbiesSchema.optional(),
  description: descriptionSchema,
  strengthIds: strengthIdsSchema
});

// Profile display schema (from database)
export const ProfileDisplaySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().email(),
  age: ageSchema.nullable(),
  career: careerSchema.nullable(),
  hobbies: hobbiesSchema.nullable(),
  description: descriptionSchema.nullable(),
  profileComplete: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userStrengths: z.array(z.object({
    id: z.string().cuid(),
    strengthId: z.string().cuid(),
    strength: z.object({
      id: z.string().cuid(),
      name: z.string(),
      description: z.string(),
      domain: z.object({
        id: z.string().cuid(),
        name: z.string(),
        description: z.string()
      })
    })
  }))
});

// Domain and Strength schemas for type safety
export const DomainSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string()
});

export const StrengthSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  domainId: z.string().cuid(),
  domain: DomainSchema
});

export const DomainWithStrengthsSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  strengths: z.array(StrengthSchema.omit({ domain: true }))
});

// Action Response schema for server actions
export const ActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
  data: z.any().optional()
});

// Type exports using z.infer
export type ProfileFormData = z.infer<typeof ProfileFormDataSchema>;
export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>;
export type ProfileDisplay = z.infer<typeof ProfileDisplaySchema>;
export type Domain = z.infer<typeof DomainSchema>;
export type Strength = z.infer<typeof StrengthSchema>;
export type DomainWithStrengths = z.infer<typeof DomainWithStrengthsSchema>;
export type ActionResponse = z.infer<typeof ActionResponseSchema>;

// Additional utility types
export type StrengthSelection = {
  strengthIds: string[];
};

export type ProfileFieldUpdate = {
  field: "age" | "career" | "hobbies" | "description";
  value: string | number | undefined;
};

// Validation helper functions
export function validateProfileFormData(data: unknown): ProfileFormData {
  return ProfileFormDataSchema.parse(data);
}

export function validateProfileUpdate(data: unknown): ProfileUpdate {
  return ProfileUpdateSchema.parse(data);
}

export function validateActionResponse(data: unknown): ActionResponse {
  return ActionResponseSchema.parse(data);
}

// Profile completion checker with type safety
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

// Schema utilities for reuse
export const schemas = {
  age: ageSchema,
  career: careerSchema,
  hobbies: hobbiesSchema,
  description: descriptionSchema,
  strengthIds: strengthIdsSchema
} as const;
