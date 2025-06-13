import { FileEntites } from "@/entities/File";
import { initializeDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import https from "https";
import { NextRequest } from "next/server";
import "reflect-metadata";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const downloadId = params.id;
  const dataSource = await initializeDatabase();
  const fileRepo = dataSource.getRepository(FileEntites);
  const file = await fileRepo.findOneBy({ id: downloadId });

  if (!file) {
    return new Response(
      JSON.stringify({ error: "File not found", success: false }),
      { status: 404 }
    );
  }

  if (!file.isPublic) {
    const providedPassword = request.nextUrl.searchParams.get("password");

    if (
      !providedPassword ||
      !(await bcrypt.compare(providedPassword, file.password ?? ""))
    ) {
      return new Response(
        JSON.stringify({
          message: "Invalid or missing password.",
          success: false,
        }),
        { status: 401 }
      );
    }
  }

  const now = new Date();
  if (file.expiresAt && file.expiresAt < now) {
    return new Response(
      JSON.stringify({ error: "File has expired", success: false }),
      { status: 410 }
    );
  }

  // Increment download count
  file.downloadCount++;
  await fileRepo.save(file);

  // Stream from Cloudinary
  return await new Promise((resolve, reject) => {
    https
      .get(file.url, (fileRes) => {
        const headers: HeadersInit = {
          "Content-Disposition": `attachment; filename="${file.originalName}"`,
          "Content-Type":
            fileRes.headers["content-type"] || "application/octet-stream",
        };

        resolve(
          new Response(fileRes as any, {
            status: 200,
            headers,
          })
        );
      })
      .on("error", (err) => {
        reject(
          new Response(
            JSON.stringify({ error: "Failed to fetch file", success: false }),
            { status: 500 }
          )
        );
      });
  });
}
