'use client'

interface StatsCardProps {
  icon: string
  label: string
  value: string | number
  unit?: string
  color?: 'purple' | 'pink' | 'blue' | 'green'
}

export default function StatsCard({
  icon,
  label,
  value,
  unit,
  color = 'purple'
}: StatsCardProps) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
  }

  return (
    <div className={`glass glass-card bg-gradient-to-br ${colorClasses[color]} p-6 rounded-glass`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold primary-text">{value}</p>
            {unit && <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>}
          </div>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}
