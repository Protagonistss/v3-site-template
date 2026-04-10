export interface DashboardMetric {
  title: string
  value: string
  trend: string
  tone: 'success' | 'warning' | 'primary'
  icon: 'orders' | 'conversion' | 'tickets'
}

export interface DashboardOverview {
  metrics: DashboardMetric[]
  todos: string[]
}
