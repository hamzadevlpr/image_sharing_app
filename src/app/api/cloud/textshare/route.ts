import { SharedText } from '@/entities/SharedText';
import { initializeDatabase } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const dataSource = await initializeDatabase();
  const textRepo = dataSource.getRepository(SharedText);

  try {
   const { content, password, burnAfterReading } = await req.json();

    if (!content) {
        return new Response(JSON.stringify({ error: 'Content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        });
    }
    const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : null;
console.log("Hashed Password:", hashedPassword);
    const newText = textRepo.create({
        content,    
        passwordHash: hashedPassword || null,
        burnAfterReading: burnAfterReading || false,
    });

    await textRepo.save(newText);

     return NextResponse.json(
    {
            message: 'Text shared successfully',
            id: newText.id,
            slug: newText.slug,
            createdAt: newText.createdAt,
            isPasswordProtected: !!hashedPassword,
            success: true,
      },
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
