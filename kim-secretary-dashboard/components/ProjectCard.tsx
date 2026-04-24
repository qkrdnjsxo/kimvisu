'use client'

import ProgressBar from './ProgressBar'

interface ProjectCardProps {
  name: string
  progress: number
  status: string
  assignee: string
  spent: number
  budget: number
}

export default function ProjectCard({
  name,
  progress,
  status,
  assignee,
  spent,
  budget,
}: ProjectCardProps) {
  const statusIcons = {
    '진행중': '🚀',
    '준비중': '📋',
    '마무리': '✨',
    '기획중': '💡',
  }

  return (
    <div className="glass glass-card p-5 rounded-glass hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{statusIcons[status as keyof typeof statusIcons] || '📊'}</span>
            <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">👤 {assignee}</p>
        </div>
        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{progress}%</span>
      </div>

      <ProgressBar progress={progress} />

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600 dark:text-gray-400">
            예산: {spent} / {budget}만원
          </span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}
