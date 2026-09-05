#!/bin/bash
# Number a folder of captures and render labeled contact sheets, so shots can be
# picked by number instead of by opening 40 files.
#
#   scripts/contact-sheet.sh ~/Desktop/"Burn photos" /tmp/burn
#
# Writes <out>/manifest.txt (the numbering every later step refers to),
# <out>/tiles/ and <out>/sheet-A.png, sheet-B.png, ... at 14 shots per sheet.
#
# Deliberately uses find, not ls: an interactive `ls` alias can pad its output,
# and the whitespace then breaks every path built from the manifest.
set -euo pipefail

SRC=${1:?usage: contact-sheet.sh <source-dir> <out-dir>}
OUT=${2:?usage: contact-sheet.sh <source-dir> <out-dir>}
PER_SHEET=14
TILE_WIDTH=200

command -v magick >/dev/null || { echo "needs ImageMagick (brew install imagemagick)" >&2; exit 1; }

mkdir -p "$OUT/tiles"
rm -f "$OUT/tiles"/t*.png

find "$SRC" -maxdepth 1 -type f \
  \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.heic' \) \
  -exec basename {} \; | sort > "$OUT/manifest.txt"

total=$(wc -l < "$OUT/manifest.txt" | tr -d ' ')
[ "$total" -gt 0 ] || { echo "no images in $SRC" >&2; exit 1; }
echo "$total images -> $OUT/manifest.txt"

i=0
while IFS= read -r file; do
  i=$((i + 1))
  n=$(printf '%02d' "$i")
  magick "$SRC/$file" -resize "${TILE_WIDTH}x" -bordercolor '#1a1a1a' -border 3 \
    -background '#1a1a1a' -fill white -pointsize 30 label:"$n" \
    -gravity center -append "$OUT/tiles/t$n.png"
done < "$OUT/manifest.txt"

LETTER=(A B C D E F G H I J K L M N O P Q R S T U V W X Y Z)

sheet=0
while [ $((sheet * PER_SHEET)) -lt "$total" ]; do
  letter=${LETTER[sheet]:-$((sheet + 1))}
  first=$((sheet * PER_SHEET + 1))
  last=$((first + PER_SHEET - 1))
  [ "$last" -gt "$total" ] && last=$total

  batch=()
  for n in $(seq "$first" "$last"); do batch+=("$OUT/tiles/t$(printf '%02d' "$n").png"); done

  magick montage "${batch[@]}" -tile 7x2 -geometry +6+6 -background '#1a1a1a' "$OUT/sheet-$letter.png"
  echo "sheet-$letter.png  shots $first-$last"
  sheet=$((sheet + 1))
done
