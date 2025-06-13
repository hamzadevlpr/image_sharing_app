import { FileEntites } from "@/entities/File";
import { initializeDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const downloadId = (await params).id;
  const dataSource = await initializeDatabase();
  const fileRepo = dataSource.getRepository(FileEntites);

  const file = await fileRepo.findOneBy({ id: downloadId });

  if (!file) {
    return NextResponse.json(
      { error: "File not found", success: false },
      { status: 404 }
    );
  }

  if (!file.isPublic) {
    const providedPassword = request.nextUrl.searchParams.get("password") ?? null;

    if (
      !providedPassword ||
      !(await bcrypt.compare(providedPassword, file.password ?? ""))
    ) {
      return NextResponse.json(
        { message: "Invalid or missing password.", success: false },
        { status: 401 }
      );
    }
  }

  return NextResponse.json(
    {
      originalName: file.originalName,
      size: file.size,
      downloadCount: file.downloadCount,
      storedName: file.storedName,
      createdAt: file.createdAt,
      expiresAt: file.expiresAt,
      isPublic: file.isPublic,
      url: file.url,
      success: true,
    },
    { status: 200 }
  );
}
