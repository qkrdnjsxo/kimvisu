// Task 타입
export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in_progress' | 'pending';
  assignee: string;
  dueDate: string;
  category: string;
}

// Sales Data 타입
export interface SalesData {
  date: string;
  product: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalSales: number;
  region: string;
}

// Project 타입
export interface Project {
  id: string;
  name: string;
  progress: number; // 0-100
  status: 'planning' | 'in_progress' | 'finishing' | 'completed';
  assignee: string;
  startDate: string;
  dueDate: string;
  budget: number;
  spent: number;
}

// Schedule Item 타입
export interface ScheduleItem {
  day: string; // 요일
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  title: string;
}

// Dashboard Stats 타입
export interface DashboardStats {
  totalSales: number;
  totalProjects: number;
  completedTasks: number;
  pendingTasks: number;
}
