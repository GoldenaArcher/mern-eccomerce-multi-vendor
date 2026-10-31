#!/usr/bin/env bash
set -euo pipefail

# Export app-specific Infisical folders without printing secret values.
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
environment="${1:-dev}"

if [[ $# -gt 1 || "$environment" == "--help" || "$environment" == "-h" ]]; then
  echo "Usage: bash export-env.sh [environment] (default: dev)"
  exit 0
fi

if ! command -v infisical >/dev/null 2>&1; then
  echo "Infisical CLI is required. Install it and run infisical login first." >&2
  exit 1
fi

# Prefer a root project link; support the existing link in backend/ as well.
config_dir=""
for candidate in "$repo_root" "$repo_root/backend"; do
  if [[ -f "$candidate/.infisical.yaml" || -f "$candidate/.infisical.json" ]]; then
    config_dir="$candidate"
    break
  fi
done

if [[ -z "$config_dir" ]]; then
  echo "No Infisical project link found. Run infisical init in the repo root first." >&2
  exit 1
fi

umask 077
staging_dir="$(mktemp -d "$repo_root/.env-export.XXXXXX")"
trap 'rm -rf -- "$staging_dir"' EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

cd -- "$config_dir"
for app in backend dashboard frontend; do
  echo "Exporting /$app ($environment)…"
  infisical export --env="$environment" --path="/$app" --format=dotenv \
    --output-file="$staging_dir/$app.env" --silent
  if [[ ! -s "$staging_dir/$app.env" ]]; then
    echo "Export for /$app is empty; existing .env files were kept." >&2
    exit 1
  fi
  chmod 600 "$staging_dir/$app.env"
done

# Replace existing files only once all three exports have succeeded.
for app in backend dashboard frontend; do
  mv -f -- "$staging_dir/$app.env" "$repo_root/$app/.env"
  echo "Updated $app/.env"
done
