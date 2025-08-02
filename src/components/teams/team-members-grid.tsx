"use client"
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function TeamMembersGrid({ members }: { members: Array<{ id: string; name: string; strengths: string[]; domain: string }> }) {
  if (!members.length) {
    return <div className="text-muted">No hay miembros en el equipo</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <Card key={member.id} className="p-4">
          <div className="font-semibold text-lg mb-2">{member.name}</div>
          <div className="mb-2 text-sm text-muted">Dominio: {member.domain}</div>
          <div className="flex flex-wrap gap-2">
            {member.strengths.map((strength) => (
              <Badge key={strength} variant="secondary">{strength}</Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
