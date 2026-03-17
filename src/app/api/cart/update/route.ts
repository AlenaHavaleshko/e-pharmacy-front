import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../_utils/api';
import { logErrorResponse } from '../../_utils/logErrorResponse';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = await api.patch('/cart', body);
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}
