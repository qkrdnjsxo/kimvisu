'use client'

interface TaskItemProps {
  title: string
  priority: 'high' | 'medium' | 'low'
  status: 'completed' | 'in_progress' | 'pending'
  dueDate: string
  assignee: string
}

export default function TaskItem({
  title,
  priority,
  status,
  dueDate,
  assignee,
}: TaskItemProps) {
  const priorityColors = {
    high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  }

  const statusIcons = {
    completed: '✅',
    in_progress: '🔄',
    pending: '⏳',
  }

  const priorityKorean = {
    high: '높음',
    medium: '보통',
    low: '낮음',
  }

  return (
    <div className="glass glass-card p-4 rounded-glass mb-3 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{statusIcons[status]}</span>
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <span className={`px-2 py-1 rounded-full ${priorityColors[priority]}`}>
              {priorityKorean[priority]}
            </span>
            <span className="text-gray-600 dark:text-gray-400">📅 {dueDate}</span>
            <span className="text-gray-600 dark:text-gray-400">👤 {assignee}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
