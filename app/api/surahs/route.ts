import { NextResponse } from 'next/server';
import { getAllSurahs } from '@/controllers/quranController';

export async function GET() {
  try {
    const surahs = await getAllSurahs();
    return NextResponse.json(surahs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch surah list' }, { status: 500 });
  }
}
