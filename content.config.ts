import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const colorSchema = z.object({
  fg: z.object({
    primary: z.string(),
    secondary: z.string(),
    tertiary: z.string(),
  }),
  bg: z.object({
    primary: z.string(),
    secondary: z.string(),
    tertiary: z.string(),
  }),
});

const highlightSchema = z.object({
  title: z.string(),
  items: z.array(z.string()),
});

const projectItemSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('image'),
    src: z.string(),
    alt: z.string().min(1),
    rounded: z.boolean().optional(),
  }),
  z.object({
    type: z.literal('video'),
    src: z.string(),
    poster: z.string(),
  }),
  z.object({
    type: z.literal('copy'),
    copy: z.string(),
  }),
]);

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        image: z.string().optional(),
        nav: z.array(z.object({ name: z.string(), url: z.string() })).optional(),
        data: z
          .array(z.object({ title: z.string(), items: z.array(z.string()) }))
          .optional(),
        experience: z
          .array(
            z.object({
              title: z.string(),
              period: z.string(),
              roles: z.array(z.string()),
            })
          )
          .optional(),
        links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
        color: colorSchema.optional(),
      }),
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        period: z.string(),
        descriptionShort: z.string(),
        highlights: z.array(highlightSchema),
        image: z.string(),
        visit: z.string(),
        color: colorSchema,
        items: z.array(projectItemSchema),
      }),
    }),
  },
});
