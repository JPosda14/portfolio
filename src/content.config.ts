import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const projectKinds = ["personal", "family", "academic", "client", "company"] as const;

const text = z.string().trim().min(1);

// One Markdown file per project and language: src/content/projects/<locale>/<slug>.md
// Everything a card or case page shows lives in the frontmatter; the Markdown body is an optional long story.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) => {
    const picture = z.object({ src: image(), alt: text }).strict();
    return z
      .object({
        title: text,
        summary: text,
        year: z.number().int().min(2015).max(2100),
        kind: z.enum(projectKinds),
        role: text,
        team: text,
        stack: z.array(text).min(1),
        problem: text,
        action: text,
        result: text,
        decisions: z.array(z.object({ decision: text, alternative: text, reason: text }).strict()).min(1),
        cover: picture,
        gallery: z.array(picture).default([]),
        links: z
          .object({ live: z.url().optional(), repo: z.url().optional(), repoLabel: text.optional() })
          .strict()
          .default({}),
        code: z.enum(["public", "private"]),
        order: z.number().int().min(1),
        featured: z.boolean().default(true),
      })
      .strict();
  },
});

export const collections = { projects };
