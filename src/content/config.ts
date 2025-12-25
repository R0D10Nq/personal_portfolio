import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        tier: z.number().min(1).max(3),
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        featured: z.boolean().default(false),
        metrics: z.array(z.object({
            label: z.string(),
            value: z.string()
        })),
        highlights: z.array(z.string()),
        image: z.string().optional(),
        publishedAt: z.date().optional()
    })
});

export const collections = {
    'projects': projectsCollection
};
