import { NextResponse } from 'next/server';
import { api } from '@/src/app/api/_utils/api';
import { logErrorResponse } from '@/src/app/api/_utils/logErrorResponse';
import { AxiosError } from 'axios';

export async function POST() {
  try {
    await api.post('/auth/logout');
    return NextResponse.json({ message: 'Logged out' }, { status: 200 });
  } catch (err) {
    logErrorResponse(err);
    const axiosErr = err as AxiosError<{ message?: string }>;
    const message = axiosErr.response?.data?.message ?? 'Logout failed';
    const status = axiosErr.response?.status ?? 500;
    return NextResponse.json({ message }, { status });
  }
}
