import { FileEntites } from "@/entities/File";
import { initializeDatabase } from "@/lib/db";
import axios from "axios";
import { NextRequest } from "next/server";
import "reflect-metadata";

const dataSourcePromise = initializeDatabase();

// Helper to get file repository
async function getFileRepository() {
  const dataSource = await dataSourcePromise;
  return dataSource.getRepository(FileEntites);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const fileRepo = await getFileRepository();
    const file = await fileRepo.findOneBy({ id });

    if (!file) {
      return new Response(JSON.stringify({ error: "File not found", success: false }), { status: 404 });
    }
    // Increment download count
    file.downloadCount++;
    await fileRepo.save(file);

    // Stream file from Cloudinary
    const response = await axios.get(file.url, { responseType: "stream" });
    const headers: HeadersInit = {
      "Content-Disposition": `attachment; filename="${file.originalName}"`,
      "Content-Type": response.headers["content-type"] || "application/octet-stream",
    };

    return new Response(response.data, { status: 200, headers });
  } catch (error: any) {
    console.error("Download route error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        success: false,
        message: error?.message || "Something went wrong",
      }),
      { status: 500 }
    );
  }
}