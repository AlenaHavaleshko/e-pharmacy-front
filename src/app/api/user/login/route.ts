import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/src/app/api/_utils/api';
import { logErrorResponse } from '@/src/app/api/_utils/logErrorResponse';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = await api.post('/auth/login', body);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    logErrorResponse(err);
    const axiosErr = err as AxiosError<{ message?: string }>;
    const message = axiosErr.response?.data?.message ?? 'Login failed';
    const status = axiosErr.response?.status ?? 500;
    return NextResponse.json({ message }, { status });
  }
}
