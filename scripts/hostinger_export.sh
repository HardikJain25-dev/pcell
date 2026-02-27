#!/usr/bin/env bash
set -euo pipefail
echo "[hostinger_export] Building & exporting Next.js app for static hosting..."
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed on this system." >&2
  exit 1
fi
echo "Running npm ci..."
npm ci
echo "Running build..."
npm run build
if npm run | grep -qE 'export' ; then
  echo "Running export via npm run export..."
  npm run export
else
  echo "No export script found; trying 'npx next export'..."
  npx next export
fi
OUT_DIR=${PWD}/out
if [ -d "$OUT_DIR" ]; then
  echo "Export completed. Output directory: $OUT_DIR"
  echo "You can upload the contents of $OUT_DIR to Hostinger's public_html (or domain root) via File Manager or FTP."
else
  echo "Export did not produce an out/ directory. Check Next.js export compatibility (pages router required)." >&2
  exit 1
fi
echo "Done."
