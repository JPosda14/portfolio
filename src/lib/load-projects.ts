import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/index.ts";
import { checkProjectSet, parseProjectId } from "./projects.ts";

export interface Project {
  slug: string;
  entry: CollectionEntry<"projects">;
  data: CollectionEntry<"projects">["data"];
}

/** Featured projects of one language, in their defined order. Validates the whole set first. */
export async function getProjects(locale: Locale): Promise<Project[]> {
  const entries = await getCollection("projects");
  checkProjectSet(entries);
  return entries
    .map((entry) => ({ entry, ...parseProjectId(entry.id) }))
    .filter((project) => project.locale === locale && project.entry.data.featured)
    .sort((a, b) => a.entry.data.order - b.entry.data.order)
    .map(({ slug, entry }) => ({ slug, entry, data: entry.data }));
}
