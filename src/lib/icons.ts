// Inline SVG icons: Lucide (ISC) line icons and Simple Icons (CC0) technology logos.
// Kept as data so components and build-time checks share one list.
import {
  siAstro,
  siClaude,
  siFlutter,
  siGit,
  siNextdotjs,
  siOpenjdk,
  siPython,
  siSpringboot,
  siSupabase,
  siTypescript,
} from "simple-icons";

/** Lucide line icons (24 × 24, stroke). */
export const lineIcons = {
  "arrow-down": ['<path d="M12 5v14"/>', '<path d="m19 12-7 7-7-7"/>'],
  "arrow-up-right": ['<path d="M7 7h10v10"/>', '<path d="M7 17 17 7"/>'],
  calendar: ['<path d="M8 2v4"/>', '<path d="M16 2v4"/>', '<rect width="18" height="18" x="3" y="4" rx="2"/>', '<path d="M3 10h18"/>'],
  "circle-check": ['<circle cx="12" cy="12" r="10"/>', '<path d="m9 12 2 2 4-4"/>'],
  download: ['<path d="M12 15V3"/>', '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>', '<path d="m7 10 5 5 5-5"/>'],
  "file-text": [
    '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>',
    '<path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    '<path d="M10 9H8"/>',
    '<path d="M16 13H8"/>',
    '<path d="M16 17H8"/>',
  ],
  "layout-template": [
    '<rect width="18" height="7" x="3" y="3" rx="1"/>',
    '<rect width="9" height="7" x="3" y="14" rx="1"/>',
    '<rect width="5" height="7" x="16" y="14" rx="1"/>',
  ],
  repeat: ['<path d="m17 2 4 4-4 4"/>', '<path d="M3 11v-1a4 4 0 0 1 4-4h14"/>', '<path d="m7 22-4-4 4-4"/>', '<path d="M21 13v1a4 4 0 0 1-4 4H3"/>'],
  search: ['<circle cx="11" cy="11" r="8"/>', '<path d="m21 21-4.3-4.3"/>'],
  workflow: ['<rect width="8" height="8" x="3" y="3" rx="2"/>', '<path d="M7 11v4a2 2 0 0 0 2 2h4"/>', '<rect width="8" height="8" x="13" y="13" rx="2"/>'],
} as const;

/** Simple Icons logos (24 × 24, fill), by slug. */
export const techIcons = {
  astro: siAstro,
  claude: siClaude,
  flutter: siFlutter,
  git: siGit,
  nextdotjs: siNextdotjs,
  openjdk: siOpenjdk,
  python: siPython,
  springboot: siSpringboot,
  supabase: siSupabase,
  typescript: siTypescript,
} as const;

export type LineIconName = keyof typeof lineIcons;
export type TechIconName = keyof typeof techIcons;

/** Resolves an icon id from content; unknown ids fail the build instead of rendering nothing. */
export function resolveIcon(id: string): { kind: "line"; name: LineIconName } | { kind: "tech"; name: TechIconName } {
  if (id in techIcons) return { kind: "tech", name: id as TechIconName };
  if (id in lineIcons) return { kind: "line", name: id as LineIconName };
  throw new Error(`Unknown icon "${id}". Add it to src/lib/icons.ts.`);
}
