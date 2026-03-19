import { NextRequest, NextResponse } from 'next/server';
import { api } from '../_utils/api';
import { logErrorResponse } from '../_utils/logErrorResponse';

export async function GET(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') ?? request.headers.get('Authorization');
    const { data } = await api.get('/cart', {
      headers: auth ? { Authorization: auth } : {},
    });
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const auth = request.headers.get('authorization') ?? request.headers.get('Authorization');
    const { data } = await api.post('/cart', body, {
      headers: auth ? { Authorization: auth } : {},
    });
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
