import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { unwrapResponse } from '@/shared/request/client';
import { AppRequestError, normalizeRequestError } from '@/shared/request/errors';
import { attachInterceptors } from '@/shared/request/interceptors';

describe('request helpers', () => {
  it('throws business errors from wrapped responses', () => {
    expect(() =>
      unwrapResponse({
        code: 4001,
        message: '业务失败',
        data: null
      })
    ).toThrowError(AppRequestError);

    try {
      unwrapResponse({
        code: 4001,
        message: '业务失败',
        data: null
      });
    } catch (error) {
      const appError = error as AppRequestError;

      expect(appError.kind).toBe('business');
      expect(appError.code).toBe(4001);
      expect(appError.message).toBe('业务失败');
    }
  });

  it('normalizes timeout errors', () => {
    const normalized = normalizeRequestError(new AxiosError('timeout', 'ECONNABORTED'));

    expect(normalized.kind).toBe('timeout');
    expect(normalized.message).toBe('请求超时，请稍后重试');
  });

  it('normalizes network errors', () => {
    const normalized = normalizeRequestError(new AxiosError('网络错误'));

    expect(normalized.kind).toBe('network');
    expect(normalized.message).toBe('网络错误');
  });

  it('runs unauthorized handler once for concurrent 401 responses', async () => {
    const onUnauthorized = vi.fn().mockResolvedValue(undefined);
    const seenHeaders: string[] = [];
    const client = axios.create();

    attachInterceptors(client, {
      getToken: () => 'token_admin',
      onUnauthorized
    });

    client.defaults.adapter = async (config) => {
      const authHeader =
        typeof config.headers.get === 'function'
          ? config.headers.get('Authorization')
          : config.headers.Authorization;

      seenHeaders.push(String(authHeader));

      const response = {
        data: {
          code: 401,
          message: '登录态已过期'
        },
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config
      } satisfies AxiosResponse;

      throw new AxiosError('Unauthorized', 'ERR_BAD_REQUEST', config, null, response);
    };

    const [firstError, secondError] = await Promise.all([
      client.get('/system/users').catch((error) => error),
      client.get('/dashboard/overview').catch((error) => error)
    ]);

    expect(seenHeaders).toEqual(['Bearer token_admin', 'Bearer token_admin']);
    expect(firstError).toBeInstanceOf(AppRequestError);
    expect(secondError).toBeInstanceOf(AppRequestError);
    expect(onUnauthorized).toHaveBeenCalledTimes(1);
  });
});
