import { ProfileForm } from "./profile-form";
import type { User, Strength, Domain, UserStrength } from "@prisma/client";

interface ProfileFormWrapperProps {
  user: User & {
    userStrengths: (UserStrength & {
      strength: Strength;
    })[];
  };
  domains: (Domain & {
    strengths: Strength[];
  })[];
}

/**
 * Server Component wrapper that processes user strengths data 
 * and passes clean props to the client component
 */
export async function ProfileFormWrapper({ user, domains }: ProfileFormWrapperProps) {
  // Process the user strengths on the server side
  const processedStrengthRankings = user.userStrengths
    .filter((us) => us.position !== null && us.position !== undefined)
    .map((us) => ({
      strengthId: us.strengthId,
      position: Number(us.position!),
    }))
    .sort((a, b) => a.position - b.position);

  console.log("🚀 Server Component - Processed rankings:", processedStrengthRankings);

  return (
    <ProfileForm 
      user={user} 
      domains={domains} 
      initialStrengthRankings={processedStrengthRankings}
    />
  );
}
