#!/usr/bin/env bash
#
# Translation automation
# Takes a file path to 'en.mdx', touch translation files and passes all of them to aider for translation
for FILE in "$@"; do
    # Ensure the file exists and is an en.mdx
    if [[ ! -f "$FILE" ]]; then
        echo "Error: $FILE does not exist or is not a regular file" >&2
        continue
    fi
    # Get the directory and base name
    DIR=$(dirname "$FILE")
    BASE=$(basename "$FILE")
    # Only process files named en.mdx
    if [[ "$BASE" != "en.mdx" ]]; then
        echo "Skipping $FILE: not named en.mdx" >&2
        continue
    fi
    # Touch translation files (create if they don't exist)
    UK_FILE="$DIR/uk.mdx"
    PL_FILE="$DIR/pl.mdx"
    # Truncate translation files to avoid confusing aider with stale content
    : > "$UK_FILE"
    : > "$PL_FILE"
    # Ensure they are registered in git (add if not already tracked)
    git add -N "$UK_FILE" "$PL_FILE" 2>/dev/null || true
    # Run aider with all three files
    aider --no-check-update --no-auto-commits --no-analytics --no-suggest-shell-commands --message "Translate en.mdx to Polish and Ukrainian. Don't touch project titles and don't translate metadata apart from project type, location and achievements. Preserve markdown formatting, if exists. Treat en.mdx as a source of truth: overwrite translation files." -- "$FILE" "$UK_FILE" "$PL_FILE"
done
