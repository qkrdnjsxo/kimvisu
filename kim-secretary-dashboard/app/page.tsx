'use client'

import { useState, useEffect } from 'react'

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
            전사 매출, 프로젝트, 일정, 회의를 한곳에서 관리하세요
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-4">📋 준비 중...</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Next.js 프로젝트 구축이 진행 중입니다. 곧 모든 기능이 준비될 예정입니다.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-4">✨ 주요 기능</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>📊 실시간 매출 현황</li>
              <li>📋 우선순위별 업무 관리</li>
              <li>📅 주간 일정 조회</li>
              <li>📈 프로젝트 진행률</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
