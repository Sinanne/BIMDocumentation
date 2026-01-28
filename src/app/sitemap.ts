import { docsData } from "@/data/docs";
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'http://localhost:3000'; // Replace with actual domain in production

    const docUrls = docsData.flatMap(section =>
        section.items.map(item => ({
            url: `${baseUrl}/docs/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    );

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...docUrls,
    ];
}
