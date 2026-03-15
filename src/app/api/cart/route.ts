import { NextRequest, NextResponse } from 'next/server';
import { api } from '../_utils/api';
import { logErrorResponse } from '../_utils/logErrorResponse';

export async function GET() {
  try {
    const { data } = await api.get('/cart');
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = await api.post('/cart', body);
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
