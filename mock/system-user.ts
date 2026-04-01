import type { PageQuery } from '../src/shared/request/types'
import type {
  SystemUser,
  SystemUserPageResult
} from '../src/modules/system-user/types'

const users: SystemUser[] = [
  {
    id: '1',
    name: '林川',
    role: '管理员',
    email: 'linchuan@example.com',
    status: 'enabled'
  },
  {
    id: '2',
    name: '谢宁',
    role: '运营',
    email: 'xiening@example.com',
    status: 'enabled'
  },
  {
    id: '3',
    name: '周越',
    role: '审计',
    email: 'zhouyue@example.com',
    status: 'disabled'
  }
]

async function wait(delay = 180): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delay))
}

export async function mockFetchUsers(
  query: PageQuery
): Promise<SystemUserPageResult> {
  await wait()

  const keyword = query.keyword?.trim().toLowerCase()
  const filtered = keyword
    ? users.filter((item) => {
        return (
          item.name.toLowerCase().includes(keyword) ||
          item.email.toLowerCase().includes(keyword) ||
          item.role.toLowerCase().includes(keyword)
        )
      })
    : users

  const start = (query.page - 1) * query.pageSize
  const end = start + query.pageSize

  return {
    list: filtered.slice(start, end),
    total: filtered.length,
    page: query.page,
    pageSize: query.pageSize
  }
}
