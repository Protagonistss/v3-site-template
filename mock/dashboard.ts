import type { DashboardOverview } from '../src/modules/dashboard/types'

async function wait(delay = 180): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delay))
}

export async function mockFetchDashboardOverview(): Promise<DashboardOverview> {
  await wait()

  return {
    metrics: [
      {
        title: '本周新增订单',
        value: '1,284',
        trend: '+12.4%',
        tone: 'primary',
        icon: 'orders'
      },
      {
        title: '转化率',
        value: '24.8%',
        trend: '+3.1%',
        tone: 'success',
        icon: 'conversion'
      },
      {
        title: '待处理工单',
        value: '37',
        trend: '-8.0%',
        tone: 'warning',
        icon: 'tickets'
      }
    ],
    todos: ['检查上线审批流', '复核 2 个异常报警', '确认四月活动排期']
  }
}
