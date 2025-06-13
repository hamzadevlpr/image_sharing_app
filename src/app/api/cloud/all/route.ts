import { FileEntites } from "@/entities/File";
import { initializeDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const dataSource = await initializeDatabase();
    const fileRepo = dataSource.getRepository(FileEntites);

    const files = await fileRepo.find({
      order: { createdAt: "DESC" },
    });

    return NextResponse.json(
      {
        files: files.map((file) => ({
          id: file.id,
          originalName: file.originalName,
          size: file.size,
          url: file.url,
          isPublic: file.isPublic,
          expiresAt: file.expiresAt,
          downloadCount: file.downloadCount,
          createdAt: file.createdAt,
        })),
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching file list:", err);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
