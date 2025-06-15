import { MetadataRoute } from 'next';
import { AppDataSource } from '@/lib/data-source';
import { FileEntites } from '@/entities/File';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await AppDataSource.initialize();

    const files = await AppDataSource.getRepository(FileEntites).find();

    const domain = 'https://image-sharing-app-theta.vercel.app';

    const routes: MetadataRoute.Sitemap = [
        {
            url: `${domain}/`,
            lastModified: new Date(),
        },
        {
            url: `${domain}/download`,
            lastModified: new Date(),
        },
        ...files.map((file) => ({
            url: `${domain}/download/${file.id}`,
            lastModified: file.createdAt ?? new Date(),
        })),
    ];

    return routes;
}
