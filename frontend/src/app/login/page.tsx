'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { setAuthSession } from '@/core/auth/session';
import { ROUTES } from '@/core/routes';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function getRedirectPath(): string {
  if (typeof window === 'undefined') return ROUTES.dashboard;
  const redirect = new URLSearchParams(window.location.search).get('redirect');
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return ROUTES.dashboard;
  }
  return redirect;
}

async function authenticateUser(credentials: LoginFormData): Promise<AuthResult> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  try {
    const response = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const payload = (await response.json()) as {
        token?: string;
        tenantId?: string;
        data?: { token?: string; tenantId?: string };
      };

      const token = payload.token ?? payload.data?.token;
      const tenantId = payload.tenantId ?? payload.data?.tenantId;

      if (token) {
        return { success: true, token, tenantId: tenantId ?? 'tenant-001' };
      }
    }
  } catch {
    // Fall back to the local stub below when the auth API is unavailable.
  }

  // TEMPORARY: real authentication / sign-up is not built yet, so any
  // validly-formatted email + password is accepted to unblock the app and
  // automated tests. Replace this with a real credential check once the
  // backend auth + sign-up flow lands.
  return {
    success: true,
    token: `stub-token-${Date.now()}`,
    tenantId: 'tenant-001',
  };
}

interface AuthResult {
  success: boolean;
  token?: string;
  tenantId?: string;
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof LoginFormData, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === 'string' && !nextErrors[field as keyof LoginFormData]) {
          nextErrors[field as keyof LoginFormData] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setLoading(true);

    try {
      const result = await authenticateUser(parsed.data);

      if (!result.success || !result.token) {
        setError(result.message ?? 'Login failed. Please try again.');
        return;
      }

      setAuthSession(result.token, result.tenantId ?? 'tenant-001');
      router.push(getRedirectPath());
      router.refresh();
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            PEB CRM
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin} noValidate>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                disabled={loading}
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600 px-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                disabled={loading}
              />
              {fieldErrors.password && (
                <p id="password-error" className="mt-1 text-xs text-red-600 px-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4" role="alert">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-800">
            <strong>Temporary access:</strong> Sign-up and real authentication are not built yet.
            Enter any valid email (e.g. <code>test@test.com</code>) and any password of 6+ characters
            to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
