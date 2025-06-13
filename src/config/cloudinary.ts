import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  buffer: Buffer,
  folder = "uploads",
  filename = "file",
  mimetype = "application/octet-stream"
): Promise<{ url: string; public_id: string }> {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "auto",
            public_id: filename.split(".")[0],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return {
      url: (result as any).secure_url,
      public_id: (result as any).public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`Successfully deleted image with public ID: ${publicId}`);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
  }
};

export const extractCloudinaryPublicId = (url: string): string | null => {
  try {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const publicId = filename.split(".")[0];
    const folderPath = parts.slice(parts.indexOf("upload") + 1, -1).join("/");
    return folderPath ? `${folderPath}/${publicId}` : publicId;
  } catch (error) {
    console.error("Failed to extract publicId from URL:", error);
    return null;
  }
};
