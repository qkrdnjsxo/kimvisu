'use client'

interface ProgressBarProps {
  progress: number
  color?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({
  progress,
  color = 'primary',
  size = 'md'
}: ProgressBarProps) {
  const colorClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500',
  }

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3',
  }

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heightClasses[size]}`}>
      <div
        className={`${colorClasses[color]} rounded-full transition-all duration-500 ease-out ${heightClasses[size]}`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  )
}
