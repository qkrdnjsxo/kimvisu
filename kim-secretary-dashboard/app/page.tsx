'use client'

import { useState, useEffect, useMemo } from 'react'
import StatsCard from '@/components/StatsCard'
import TaskItem from '@/components/TaskItem'
import ProjectCard from '@/components/ProjectCard'
import ChatInterface from '@/components/ChatInterface'
import salesData from '@/data/sales.json'
import tasksData from '@/data/tasks.json'
import projectsData from '@/data/projects.json'

interface SalesItem {
  totalSales: number
}

interface Task {
  id: number
  title: string
  priority: 'high' | 'medium' | 'low'
  status: 'completed' | 'in_progress' | 'pending'
  dueDate: string
  assignee: string
  category: string
}

interface Project {
  id: number
  name: string
  progress: number
  status: string
  assignee: string
  spent: number
  budget: number
}

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved ? saved === 'dark' : prefersDark
    setIsDarkMode(dark)
    updateTheme(dark)
  }, [])

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    updateTheme(newMode)
  }

  // Calculate stats
  const stats = useMemo(() => {
    const totalSales = (salesData as SalesItem[]).reduce((sum, item) => sum + item.totalSales, 0)
    const completedTasks = (tasksData as Task[]).filter(t => t.status === 'completed').length
    const inProgressTasks = (tasksData as Task[]).filter(t => t.status === 'in_progress').length
    const totalProjects = (projectsData as Project[]).length
    const avgProgress = Math.round(
      (projectsData as Project[]).reduce((sum, p) => sum + p.progress, 0) / totalProjects
    )

    return {
      totalSales,
      completedTasks,
      inProgressTasks,
      totalProjects,
      avgProgress
    }
  }, [])

  // Get high priority tasks
  const highPriorityTasks = useMemo(() => {
    return (tasksData as Task[])
      .filter(t => t.priority === 'high')
      .slice(0, 5)
  }, [])

  // Get in-progress projects
  const inProgressProjects = useMemo(() => {
    return (projectsData as Project[])
      .filter(p => ['진행중', '마무리'].includes(p.status))
      .slice(0, 4)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light to-bg-light-alt dark:from-bg-dark dark:to-bg-dark-alt">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 w-16 h-16 rounded-full glass-card flex items-center justify-center text-2xl z-50 hover:scale-110 transition-transform"
        title="다크/라이트 모드 전환"
      >
        {isDarkMode ? '🌙' : '☀️'}
      </button>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold primary-text mb-2">
            📊 김비서 대시보드
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            2026년 3월 현재 비즈니스 현황을 한눈에 파악하세요
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatsCard
            icon="💰"
            label="총 매출액"
            value={Math.floor(stats.totalSales / 1000000)}
            unit="백만원"
            color="purple"
          />
          <StatsCard
            icon="✅"
            label="완료한 업무"
            value={stats.completedTasks}
            unit="개"
            color="green"
          />
          <StatsCard
            icon="🔄"
            label="진행 중인 업무"
            value={stats.inProgressTasks}
            unit="개"
            color="blue"
          />
          <StatsCard
            icon="📈"
            label="평균 프로젝트 진행률"
            value={stats.avgProgress}
            unit="%"
            color="pink"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-2xl font-bold primary-text mb-4 flex items-center gap-2">
                <span>📋</span> 우선순위 높은 업무
              </h3>
              <div>
                {highPriorityTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    title={task.title}
                    priority={task.priority}
                    status={task.status}
                    dueDate={task.dueDate}
                    assignee={task.assignee}
                  />
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <h3 className="text-2xl font-bold primary-text mb-4 flex items-center gap-2">
                <span>🚀</span> 진행 중인 프로젝트
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inProgressProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    name={project.name}
                    progress={project.progress}
                    status={project.status}
                    assignee={project.assignee}
                    spent={project.spent}
                    budget={project.budget}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div>
            <div className="glass-card p-6 rounded-glass mb-6">
              <h3 className="text-lg font-bold primary-text mb-4">📊 통계</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">전체 업무</p>
                  <p className="text-2xl font-bold primary-text">{tasksData.length}개</p>
                </div>
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">전체 프로젝트</p>
                  <p className="text-2xl font-bold primary-text">{stats.totalProjects}개</p>
                </div>
                <div className="pb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">거래 건수</p>
                  <p className="text-2xl font-bold primary-text">{salesData.length}건</p>
                </div>
              </div>
            </div>

            {/* AI Chat */}
            <div className="mb-6">
              <ChatInterface />
            </div>

            {/* Quick Links */}
            <div className="glass-card p-6 rounded-glass">
              <h3 className="text-lg font-bold primary-text mb-4">✨ 기능</h3>
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                <li>✅ 실시간 매출 분석</li>
                <li>✅ 업무 우선순위 관리</li>
                <li>✅ 프로젝트 진행률 추적</li>
                <li>✅ 팀원 할당 현황</li>
                <li>✅ 🤖 AI 어시스턴트</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
