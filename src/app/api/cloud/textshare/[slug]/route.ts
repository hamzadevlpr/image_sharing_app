import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import 'reflect-metadata';
import { initializeDatabase } from '@/lib/db';
import { SharedText } from '@/entities/SharedText';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = params;
  const password = req.nextUrl.searchParams.get('password') ?? undefined;

  const ds = await initializeDatabase();
  const repo = ds.getRepository(SharedText);

  try {
  // 1) Find the share
  const share = await repo.findOneBy(await slug);
  if (!share) {
    return new NextResponse(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2) If protected, verify
  if (share.isPasswordProtected) {
    if (!password) {
      return new NextResponse(
        JSON.stringify({ error: 'Password required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const ok = await bcrypt.compare(password, share.passwordHash!);
    if (!ok) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 3) Handle burn‐after‐reading vs. increment
  if (share.burnAfterReading) {
    await repo.remove(share);
  } else {
    share.shareCount = (share.shareCount ?? 0) + 1;
    await repo.save(share);
  }

  // 4) Return the content
  return NextResponse.json(
    share,
      { status: 200 }
    );
    
} catch (err) {
    console.error("Error uploading text:", err);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

