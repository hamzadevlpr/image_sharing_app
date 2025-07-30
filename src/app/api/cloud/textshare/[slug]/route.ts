import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
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
    const share = await repo.findOne({ where: await slug });

    if (!share) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    if (share.isPasswordProtected) {
      if (!password) {
        return NextResponse.json({ error: 'Password required' }, { status: 401 });
      }
      const match = await bcrypt.compare(password, share.passwordHash!);
      if (!match) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
    }

    if (share.burnAfterReading) {
      await repo.remove(share);
    } else {
      share.shareCount += 1;
      await repo.save(share);
    }

    return NextResponse.json({
      content: share.content,
      isPasswordProtected: share.isPasswordProtected,
      burnAfterReading: share.burnAfterReading,
      createdAt: share.createdAt,
    });
  } catch (err) {
    console.error('Error fetching text:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = params;
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 });
    }

    const ds = await initializeDatabase();
    const repo = ds.getRepository(SharedText);

    const existing = await repo.findOne({ where: await slug });

    if (!existing) {
      return NextResponse.json({ error: 'Text not found' }, { status: 404 });
    }

    existing.content = content;
    await repo.save(existing);

    return NextResponse.json({ message: 'Text updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
