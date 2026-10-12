// src/app/api/analytics-report/route.ts
// Disabled: Email reporting is permanently disabled to eliminate duplicate emails and avoid Vercel Serverless load.
// Real traffic is monitored via Google Analytics (G-TD85QNQ7KW).

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Daily analytics email report is disabled. Website traffic is tracked via Google Analytics without server overhead.',
  });
}
