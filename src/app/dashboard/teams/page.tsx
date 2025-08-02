import { TeamCompositionChart } from '@/components/teams/team-composition-chart'
import { TeamMembersGrid } from '@/components/teams/team-members-grid'
import { getUserWithStrengths } from '@/actions/user.actions'
import { getTeamComposition } from '@/actions/team-analytics.actions'
import { getTeamMembers } from '@/actions/teams.actions'

export default async function TeamsPage() {
  // Get user and teamId from server action
  const userResult = await getUserWithStrengths()
  const teamId = userResult?.data?.team?.id

  // If no teamId, show message
  if (!teamId) {
    return <div className="p-6">No tienes equipo asignado.</div>
  }

  // Fetch team composition and members
  const teamCompositionResult = await getTeamComposition({ teamId })
  const teamMembersResult = await getTeamMembers({ teamId })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Composición de Fortalezas del Equipo</h1>
      <TeamCompositionChart data={teamCompositionResult?.data?.strengthsCount ?? {}} />
      <h2 className="text-xl font-semibold mt-8 mb-4">Miembros del Equipo</h2>
      <TeamMembersGrid members={teamMembersResult?.data ?? []} />
      {/* Aquí se agregarán más visualizaciones y componentes */}
    </div>
  )
}