import { uploadToCloudinary } from "@/config/cloudinary";
import { FileEntites } from "@/entities/File";
import { initializeDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import "reflect-metadata";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export async function POST(req: NextRequest) {
  const dataSource = await initializeDatabase();
  const fileRepo = dataSource.getRepository(FileEntites);
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded", success: false },
        { status: 400 }
      );
    }

    const isPublic = formData.get("isPublic")?.toString() ?? "true";
    const expiresIn = formData.get("expiresIn")?.toString() ?? "86400";
    const password = formData.get("password")?.toString() ?? null;

    const expiresAt = new Date(
      Date.now() + (parseInt(expiresIn) || 86400) * 1000
    );
    console.log("File upload request received:", file);
    // Upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload using updated cloudinary uploader
    const { url, public_id } = await uploadToCloudinary(
      buffer,
      "file_share",
      file.name,
      file.type
    );

    if (isPublic === "false" && !password) {
      return NextResponse.json(
        { message: "Password required for private files.", success: false },
        { status: 400 }
      );
    }

    const newFile = fileRepo.create({
      originalName: file.name ?? "unknown",
      storedName: public_id,
      size: file.size,
      url: url,
      isPublic: isPublic === "true",
      expiresAt,
      password: password ? await bcrypt.hash(password, 10) : null,
    });

    await fileRepo.save(newFile);

    return NextResponse.json(
      {
        id: newFile.id,
        downloadLink: `/download/${newFile.id}`,
        url,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error uploading file:", err);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
