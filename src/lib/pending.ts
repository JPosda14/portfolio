// Marks content that is still missing. The production build fails if it reaches the HTML.
export const PENDING_MARKER = "[PENDIENTE]";

export interface TextPart {
  text: string;
  pending: boolean;
}

export function splitPending(text: string): TextPart[] {
  return text
    .split(PENDING_MARKER)
    .flatMap((chunk, index): TextPart[] =>
      index === 0 ? [{ text: chunk, pending: false }] : [{ text: PENDING_MARKER, pending: true }, { text: chunk, pending: false }],
    )
    .filter((part) => part.text !== "");
}
