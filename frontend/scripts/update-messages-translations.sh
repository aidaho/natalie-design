#!/usr/bin/env bash
#
# Translation automation
# Takes a file path to 'en.json', touch translation files and passes all of them to aider for translation
for FILE in "$@"; do
    # Ensure the file exists and is an en.json
    if [[ ! -f "$FILE" ]]; then
        echo "Error: $FILE does not exist or is not a regular file" >&2
        continue
    fi
    # Get the directory and base name
    DIR=$(dirname "$FILE")
    BASE=$(basename "$FILE")
    # Only process files named en.json
    if [[ "$BASE" != "en.json" ]]; then
        echo "Skipping $FILE: not named en.json" >&2
        continue
    fi
    # Touch translation files (create if they don't exist)
    UK_FILE="$DIR/uk.json"
    PL_FILE="$DIR/pl.json"
    # Truncate translation files to avoid confusing aider with stale content
    : > "$UK_FILE"
    : > "$PL_FILE"
    # Ensure they are registered in git (add if not already tracked)
    git add -N "$UK_FILE" "$PL_FILE" 2>/dev/null || true

    # Create a temporary file with instructions
    TEMP_INSTRUCTION=$(mktemp)
    cat > "$TEMP_INSTRUCTION" << 'EOF'
Translate en.json to Polish and Ukrainian. Don't touch project titles. Preserve formatting, if exists. Treat en.json as a source of truth:
overwrite translation files.
EOF

    # Run aider with all three files
    aider \
      --no-check-update \
      --no-auto-commits \
      --no-analytics \
      --no-suggest-shell-commands \
      --message-file "$TEMP_INSTRUCTION" \
      "$FILE" "$UK_FILE" "$PL_FILE"

    # Clean up
    rm -f "$TEMP_INSTRUCTION"
done
