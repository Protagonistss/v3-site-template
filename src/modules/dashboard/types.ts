export interface DashboardMetric {
  title: string
  value: string
  trend: string
  tone: 'success' | 'warning' | 'primary'
}

export interface DashboardOverview {
  metrics: DashboardMetric[]
  todos: string[]
}
