// app/api/share/route.ts
import { SharedText } from '@/entities/SharedText';
import { initializeDatabase } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const ds = await initializeDatabase();
  const repo = ds.getRepository(SharedText);

  try {
    const { content, password, burnAfterReading, slug } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    let record = slug ? await repo.findOne({ where: { slug } }) : null;

    if (record) {
      // Update existing
      record.content = content;
      record.passwordHash = hashedPassword || null;
      record.isPasswordProtected = !!hashedPassword;
      record.burnAfterReading = !!burnAfterReading;
    } else {
      // Create new
      record = repo.create({
        content,
        passwordHash: hashedPassword || null,
        isPasswordProtected: !!hashedPassword,
        burnAfterReading: !!burnAfterReading,
      });
    }

    await repo.save(record);

    return NextResponse.json({
      success: true,
      message: record.slug === slug ? 'Text updated successfully' : 'Text shared successfully',
      slug: record.slug,
      createdAt: record.createdAt,
      isPasswordProtected: !!hashedPassword,
    });
  } catch (err) {
    console.error('Error sharing text:', err);
    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 });
  }
}
