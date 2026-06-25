import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'authToken';
const TENANT_ID_KEY = 'tenantId';
const DEFAULT_EXPIRES_DAYS = 7;

export interface AuthSession {
  token: string;
  tenantId: string;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getAuthToken(): string | null {
  if (!isBrowser()) return null;
  return Cookies.get(AUTH_TOKEN_KEY) ?? localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getTenantId(): string | null {
  if (!isBrowser()) return null;
  return Cookies.get(TENANT_ID_KEY) ?? localStorage.getItem(TENANT_ID_KEY);
}

export function setAuthSession(
  token: string,
  tenantId: string,
  expiresDays = DEFAULT_EXPIRES_DAYS
): void {
  if (!isBrowser()) return;

  const cookieOptions = {
    expires: expiresDays,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
  };

  Cookies.set(AUTH_TOKEN_KEY, token, cookieOptions);
  Cookies.set(TENANT_ID_KEY, tenantId, cookieOptions);
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(TENANT_ID_KEY, tenantId);
}

export function clearAuthSession(): void {
  if (!isBrowser()) return;

  Cookies.remove(AUTH_TOKEN_KEY);
  Cookies.remove(TENANT_ID_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(TENANT_ID_KEY);
}

export function hasAuthSession(): boolean {
  return Boolean(getAuthToken());
}
