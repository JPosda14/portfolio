import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, test } from "node:test";
import { extractText, getDocumentProxy } from "unpdf";

import { PHONE_PATTERN } from "../../integrations/pending-guard.mjs";

const CVS = ["public/cv/juan-posada-cv-en.pdf", "public/cv/juan-posada-cv-es.pdf"];

async function pdfText(path) {
  const pdf = await getDocumentProxy(new Uint8Array(await readFile(path)));
  const { text } = await extractText(pdf, { mergePages: true });
  const { info } = await pdf.getMetadata();
  return { text, metadata: JSON.stringify(info ?? {}) };
}

describe("published CVs", () => {
  for (const path of CVS) {
    test(`${path} is Juan's CV and publishes no phone number`, async () => {
      const { text, metadata } = await pdfText(path);
      assert.match(text, /Juan Andrés Posada/);
      assert.doesNotMatch(text, PHONE_PATTERN, "the CV text contains a phone number");
      assert.doesNotMatch(metadata, PHONE_PATTERN, "the CV metadata contains a phone number");
    });
  }
});
