import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/src/app/api/_utils/api';
import { logErrorResponse } from '@/src/app/api/_utils/logErrorResponse';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // trim inputs to prevent whitespace-caused auth failures
    const cleaned = {
      email: (body.email ?? '').trim().toLowerCase(),
      password: (body.password ?? '').trim(),
    };
    const { data: raw } = await api.post('/user/login', cleaned);
    // backend wraps: { status, data: { accessToken, user } }
    const inner = raw?.data ?? raw;
    const payload = { token: inner.accessToken ?? inner.token, user: inner.user };
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    logErrorResponse(err);
    const axiosErr = err as AxiosError<{ message?: string }>;
    const message = axiosErr.response?.data?.message ?? 'Login failed';
    const status = axiosErr.response?.status ?? 500;
    return NextResponse.json({ message }, { status });
  }
}
