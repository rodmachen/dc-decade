import { readFileSync, writeFileSync } from "fs";
import { parse } from "yaml";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = resolve(__dirname, "../design-tokens/tokens.yaml");
const outputPath = resolve(__dirname, "../design-tokens/tokens.ts");

const raw = readFileSync(tokensPath, "utf-8");
const tokens = parse(raw);

const output = `// Auto-generated from tokens.yaml — do not edit manually
export const tokens = ${JSON.stringify(tokens, null, 2)} as const;

export type Tokens = typeof tokens;
`;

writeFileSync(outputPath, output);
console.log("Generated design-tokens/tokens.ts");
