import { AxiosError } from 'axios';

export type AppRequestErrorKind = 'business' | 'http' | 'network' | 'timeout' | 'unknown';

type AppRequestErrorOptions = {
  message: string;
  kind: AppRequestErrorKind;
  status?: number;
  code?: number;
  cause?: unknown;
};

export class AppRequestError extends Error {
  readonly kind: AppRequestErrorKind;
  readonly status?: number;
  readonly code?: number;
  readonly cause?: unknown;

  constructor(options: AppRequestErrorOptions) {
    super(options.message);
    this.name = 'AppRequestError';
    this.kind = options.kind;
    this.status = options.status;
    this.code = options.code;
    this.cause = options.cause;
  }
}

export function normalizeRequestError(
  error: unknown,
  fallbackMessage = '请求失败'
): AppRequestError {
  if (error instanceof AppRequestError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const responseData = error.response?.data;
    const responseMessage = readResponseMessage(responseData);
    const responseCode = readResponseCode(responseData);

    if (error.code === 'ECONNABORTED') {
      return new AppRequestError({
        message: responseMessage ?? '请求超时，请稍后重试',
        kind: 'timeout',
        status,
        code: responseCode,
        cause: error
      });
    }

    if (!error.response) {
      return new AppRequestError({
        message: error.message || '网络异常，请检查连接',
        kind: 'network',
        cause: error
      });
    }

    return new AppRequestError({
      message: responseMessage ?? error.message ?? fallbackMessage,
      kind: 'http',
      status,
      code: responseCode,
      cause: error
    });
  }

  if (error instanceof Error) {
    return new AppRequestError({
      message: error.message || fallbackMessage,
      kind: 'unknown',
      cause: error
    });
  }

  return new AppRequestError({
    message: fallbackMessage,
    kind: 'unknown',
    cause: error
  });
}

export function getErrorMessage(error: unknown, fallbackMessage = '请求失败'): string {
  return normalizeRequestError(error, fallbackMessage).message;
}

function readResponseMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object' || !('message' in payload)) {
    return undefined;
  }

  const message = payload.message;
  return typeof message === 'string' ? message : undefined;
}

function readResponseCode(payload: unknown): number | undefined {
  if (!payload || typeof payload !== 'object' || !('code' in payload)) {
    return undefined;
  }

  const code = payload.code;
  return typeof code === 'number' ? code : undefined;
}
