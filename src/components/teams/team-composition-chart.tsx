"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export function TeamCompositionChart({ data }: { data: Record<string, number> }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))

  if (!chartData.length) return <div className="text-muted">No hay datos de composición</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
