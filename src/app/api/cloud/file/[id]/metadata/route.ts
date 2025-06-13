import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/db";
import "reflect-metadata";
import { FileEntites } from "@/entities/File";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const downloadId = (await params).id;
  try {
    const dataSource = await initializeDatabase();
    const fileRepo = dataSource.getRepository(FileEntites);

    const file = await fileRepo.findOneBy({ id: downloadId });

    if (!file) {
      return NextResponse.json(
        { error: "File not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        originalName: file.originalName,
        size: file.size,
        downloadCount: file.downloadCount,
        createdAt: file.createdAt,
        expiresAt: file.expiresAt,
        permission: file.isPublic ? "public" : "private",
      },
    });
  } catch (err) {
    console.error("Error fetching file metadata:", err);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
