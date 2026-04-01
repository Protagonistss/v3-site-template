import type { PageResult } from '@/shared/request/types'

export interface SystemUser {
  id: string
  name: string
  role: string
  email: string
  status: 'enabled' | 'disabled'
}

export type SystemUserPageResult = PageResult<SystemUser>
