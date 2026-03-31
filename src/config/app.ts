import { envConfig } from './env';

export const appConfig = {
  title: envConfig.title,
  homePath: '/dashboard',
  loginPath: '/login'
} as const;
