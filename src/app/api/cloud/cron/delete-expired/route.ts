import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/db";
import { LessThan } from "typeorm";
import { deleteFromCloudinary } from "@/config/cloudinary";
import "reflect-metadata";
import { FileEntites } from "@/entities/File";

export async function DELETE(req: NextRequest) {
  try {
    const dataSource = await initializeDatabase();
    const fileRepo = dataSource.getRepository(FileEntites);
    const now = new Date();

    const expiredFiles = await fileRepo.find({
      where: { expiresAt: LessThan(now) },
    });

    let deletedCount = 0;

    for (const file of expiredFiles) {
      try {
        await deleteFromCloudinary(file.storedName);
        // await fileRepo.remove(file);
        deletedCount++;
      } catch (err) {
        console.error(`Failed to delete ${file.storedName} from Cloudinary`, err);
      }
    }

    return NextResponse.json({
      message: `${deletedCount} expired file(s) deleted from Cloudinary and DB.`,
      success: true,
    });
  } catch (err) {
    console.error("Cron Delete Error:", err);
    return NextResponse.json(
      { message: "Error deleting expired files", success: false },
      { status: 500 }
    );
  }
}
