import { readFileSync, writeFileSync } from "fs";
import { parse } from "yaml";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const yamlPath = resolve(__dirname, "../content/homepage.yaml");
const jsonPath = resolve(__dirname, "../content/homepage.json");

const raw = readFileSync(yamlPath, "utf-8");
const data = parse(raw);

writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log("Generated content/homepage.json");
