import { NextResponse } from 'next/server';
import { api } from '../_utils/api';
import { logErrorResponse } from '../_utils/logErrorResponse';

export async function GET() {
  try {
    const res = await api.get('/customer-reviews');
    return NextResponse.json(res.data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
