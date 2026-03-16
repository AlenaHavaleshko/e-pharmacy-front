import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../_utils/api';
import { logErrorResponse } from '../../_utils/logErrorResponse';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data } = await api.get(`/products/${id}`);
    return NextResponse.json(data);
  } catch (error) {
    logErrorResponse(error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
