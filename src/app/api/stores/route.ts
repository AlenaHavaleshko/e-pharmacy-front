import { NextResponse } from 'next/server';
import { api } from '../_utils/api';
import { logErrorResponse } from '../_utils/logErrorResponse';

export async function GET() {
  try {
    const { data } = await api.get('/stores', {
      params: { limit: 6, page: 1 },
    });
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 });
  }
}
