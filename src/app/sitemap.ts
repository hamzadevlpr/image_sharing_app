import { MetadataRoute } from 'next';
import { AppDataSource } from '@/lib/data-source';
import { FileEntites } from '@/entities/File';
import { SharedText } from '@/entities/SharedText';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Initialize the data source once
  await AppDataSource.initialize();

  // Repositories
  const fileRepo = AppDataSource.getRepository(FileEntites);
  const textRepo = AppDataSource.getRepository(SharedText);

  // Fetch only public files
  const files = await fileRepo.find({
    where: { isPublic: true },
    select: ['id', 'createdAt'],
  });

  // Fetch only non-password-protected shared texts
  const texts = await textRepo.find({
    where: { isPasswordProtected: false },
    select: ['slug', 'createdAt'],
  });

  const domain = process.env.NEXT_PUBLIC_HOST_URL;
  if (!domain) throw new Error('Missing NEXT_PUBLIC_HOST_URL');

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    { url: `${domain}/`, lastModified: new Date() },
    { url: `${domain}/share/text`, lastModified: new Date() },
    { url: `${domain}/about`, lastModified: new Date() },
    { url: `${domain}/cookies-policy`, lastModified: new Date() },
    { url: `${domain}/gdpr-compliance`, lastModified: new Date() },
    { url: `${domain}/privacy-policy`, lastModified: new Date() },
    { url: `${domain}/terms-of-service`, lastModified: new Date() },
    { url: `${domain}/download`, lastModified: new Date() },
  ];

  // Dynamic shared-text view routes (excluding password-protected)
  const textRoutes = texts.map((t) => ({
    url: `${domain}/share/text/view/${t.slug}`,
    lastModified: t.createdAt,
  }));

  // Dynamic file download routes (only public)
  const fileRoutes = files.map((file) => ({
    url: `${domain}/download/${file.id}`,
    lastModified: file.createdAt ?? new Date(),
  }));

  return [...routes, ...textRoutes, ...fileRoutes];
}
