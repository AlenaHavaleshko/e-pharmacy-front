import { NextRequest, NextResponse } from 'next/server';
import { api } from '../_utils/api';
import { logErrorResponse } from '../_utils/logErrorResponse';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const { data } = await api.get('/products', { params });
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
