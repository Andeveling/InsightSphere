"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { useAction } from 'next-safe-action/hooks'
import { getTeamComposition } from '@/actions/team-analytics.actions'
import { useEffect, useState } from 'react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function TeamCompositionChart({ teamId }: { teamId: string }) {
  const { execute, result } = useAction(getTeamComposition)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    execute({ teamId })
  }, [teamId])

  useEffect(() => {
    if (result?.data?.strengthsCount) {
      setData(
        Object.entries(result.data.strengthsCount).map(([name, value]) => ({ name, value }))
      )
    }
  }, [result])

  if (!data.length) return <div className="text-muted">No hay datos de composición</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
