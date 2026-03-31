import type { LoginCommand, LoginResult, UserProfile } from '../src/modules/auth/types';

const mockUsers: Array<UserProfile & { password: string; token: string }> = [
  {
    id: 'u_admin',
    name: '超级管理员',
    avatar: 'A',
    password: '123456',
    token: 'token_admin',
    roles: ['admin'],
    permissions: ['user:read', 'user:create', 'dashboard:view']
  },
  {
    id: 'u_editor',
    name: '运营同学',
    avatar: 'E',
    password: '123456',
    token: 'token_editor',
    roles: ['editor'],
    permissions: ['dashboard:view']
  }
];

async function wait(delay = 200): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delay));
}

function toUserProfile(
  account: UserProfile & { password: string; token: string }
): UserProfile {
  return {
    id: account.id,
    name: account.name,
    avatar: account.avatar,
    roles: [...account.roles],
    permissions: [...account.permissions]
  };
}

export async function mockLogin(payload: LoginCommand): Promise<LoginResult> {
  await wait();

  const matchedUser = mockUsers.find((item) => {
    const accountAlias = item.roles.includes('admin') ? 'admin' : 'editor';

    return (
      item.id === payload.username ||
      payload.username === item.roles[0] ||
      payload.username === item.name.toLowerCase() ||
      payload.username === accountAlias
    );
  });

  if (!matchedUser || matchedUser.password !== payload.password) {
    throw new Error('账号或密码错误');
  }

  return {
    token: matchedUser.token,
    userInfo: toUserProfile(matchedUser)
  };
}

export async function mockFetchProfile(token: string): Promise<UserProfile> {
  await wait(120);

  const matchedUser = mockUsers.find((item) => item.token === token);

  if (!matchedUser) {
    throw new Error('登录态已过期');
  }

  return toUserProfile(matchedUser);
}
