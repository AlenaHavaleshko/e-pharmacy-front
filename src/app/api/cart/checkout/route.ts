import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../_utils/api';
import { logErrorResponse } from '../../_utils/logErrorResponse';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = await api.post('/cart/checkout', body);
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
