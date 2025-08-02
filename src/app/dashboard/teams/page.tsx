import { TeamCompositionChart } from '@/components/teams/team-composition-chart'

export default function TeamsPage() {
  // TODO: Obtener el teamId real del usuario/contexto
  const teamId = 'test-team'
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Composición de Fortalezas del Equipo</h1>
      <TeamCompositionChart teamId={teamId} />
      {/* Aquí se agregarán más visualizaciones y componentes */}
    </div>
  )
}