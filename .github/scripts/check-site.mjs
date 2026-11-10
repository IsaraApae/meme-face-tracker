// Sanity checks for the static site (run by .github/workflows/check.yml).
// Usage: node .github/scripts/check-site.mjs
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SITE = "meme-face-tracker";
const PAGES_URL = "https://isaraapae.github.io/meme-face-tracker/";
const html = readFileSync(join(SITE, "index.html"), "utf8");
const errors = [];
const fail = msg => errors.push(msg);

// 1. the inline module script parses
const scripts = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (scripts.length === 0) fail("no <script type=\"module\"> found in index.html");
const dir = mkdtempSync(join(tmpdir(), "check-site-"));
scripts.forEach((code, i) => {
  const file = join(dir, `inline-${i}.mjs`);
  writeFileSync(file, code);
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch (err) {
    fail(`inline module script ${i} has a syntax error:\n${err.stderr}`);
  }
});

// 2. every meme has a bundled image
const exprBlock = html.slice(html.indexOf("const EXPRESSIONS"), html.indexOf("const DEFAULT_IMAGES"));
const ids = [...exprBlock.matchAll(/^\s*id: "([^"]+)"/gm)].map(m => m[1]);
if (ids.length === 0) fail("no meme ids found in EXPRESSIONS");
for (const id of ids) {
  if (!existsSync(join(SITE, "memes", `${id}.webp`))) fail(`meme "${id}" has no memes/${id}.webp`);
}

// 3. local files the page points at exist (attributes, vendor paths in the
//    script, and absolute links back to the Pages site such as og:image)
const refs = new Set();
for (const [, url] of html.matchAll(/\b(?:href|src|content)="([^"]+)"/g)) {
  if (url.startsWith(PAGES_URL)) refs.add(url.slice(PAGES_URL.length));
  else if (!/^(?:[a-z]+:|#|\/\/)/i.test(url) && /\.[a-z0-9]+$/i.test(url)) refs.add(url);
}
for (const [, path] of html.matchAll(/["'`](?:\.\/)?(vendor\/[^"'`$]+)["'`]/g)) refs.add(path);
for (const ref of refs) {
  if (ref && !existsSync(join(SITE, ref))) fail(`index.html refers to ${ref}, which doesn't exist`);
}

// 4. the web app manifest is valid JSON and its icons exist
try {
  const manifest = JSON.parse(readFileSync(join(SITE, "manifest.webmanifest"), "utf8"));
  for (const icon of manifest.icons ?? []) {
    if (!existsSync(join(SITE, icon.src))) fail(`manifest.webmanifest refers to ${icon.src}, which doesn't exist`);
  }
} catch (err) {
  fail(`manifest.webmanifest can't be read: ${err.message}`);
}

// 5. the Mac launcher can be double-clicked (exec bits are meaningless on Windows)
if (process.platform !== "win32" && !(statSync(join(SITE, "start.command")).mode & 0o111)) {
  fail("start.command is not executable (git update-index --chmod=+x)");
}

if (errors.length) {
  console.error(errors.map(e => "✗ " + e).join("\n"));
  process.exit(1);
}
console.log(`✓ script parses, ${ids.length} memes have images, ${refs.size} local references exist`);
