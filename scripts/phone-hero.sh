#!/bin/bash
# Compose three phone screenshots into a 16:9 card image: rounded corners and a
# drop shadow on a warm off-white ground, centre phone tallest. Matches the
# treatment already used by RIDR, Burn Rebuild and Burn by Cara Loren.
#
#   scripts/phone-hero.sh /tmp/burn/hero.png left.png centre.png right.png
#
# Feed it uncropped captures: the status bar reads as part of the phone here,
# unlike the tiles, where it is cropped away. Before picking the three screens,
# look at the neighbouring project's hero. Two apps that share a design language
# will otherwise ship as near-identical cards in the work grid.
set -euo pipefail

OUT=${1:?usage: phone-hero.sh <out.png> <left.png> <centre.png> <right.png>}
LEFT=${2:?missing left.png}
CENTRE=${3:?missing centre.png}
RIGHT=${4:?missing right.png}

BG='#f3eff1'
CANVAS_W=2400
CANVAS_H=1350
SIDE_HEIGHT=1090
CENTRE_HEIGHT=1250

command -v magick >/dev/null || { echo "needs ImageMagick (brew install imagemagick)" >&2; exit 1; }

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# Rounded corners plus a drop shadow, scaled to a target height. Width follows
# the source's own aspect ratio, so any device's capture keeps its proportions.
phone() {
  local src=$1 height=$2 dest=$3
  local ratio width radius
  ratio=$(magick identify -format '%[fx:w/h]' "$src")
  width=$(python3 -c "print(round($height * $ratio))")
  radius=$(python3 -c "print(round($width * 0.125))")
  magick "$src" -resize "${width}x${height}!" -alpha set \
    \( -size "${width}x${height}" xc:none -fill white \
       -draw "roundrectangle 0,0,$((width - 1)),$((height - 1)),$radius,$radius" \) \
    -compose CopyOpacity -composite "$TMP/rounded.png"
  magick "$TMP/rounded.png" \( +clone -background '#00000055' -shadow 55x26+0+16 \) \
    +swap -background none -layers merge +repage "$dest"
}

# Place a shadowed phone so its visual centre lands on (cx, cy).
place() {
  local layer=$1 cx=$2 cy=$3
  local w h x y
  w=$(magick identify -format %w "$layer")
  h=$(magick identify -format %h "$layer")
  x=$(python3 -c "print(round($cx - $w / 2))")
  y=$(python3 -c "print(round($cy - $h / 2))")
  magick "$OUT" "$layer" -geometry "+${x}+${y}" -compose over -composite "$OUT"
}

phone "$LEFT" "$SIDE_HEIGHT" "$TMP/left.png"
phone "$CENTRE" "$CENTRE_HEIGHT" "$TMP/centre.png"
phone "$RIGHT" "$SIDE_HEIGHT" "$TMP/right.png"

magick -size "${CANVAS_W}x${CANVAS_H}" "xc:$BG" "$OUT"
place "$TMP/left.png" 641 675
place "$TMP/right.png" 1759 675
place "$TMP/centre.png" 1200 675

magick identify -format "$(basename "$OUT"): %wx%h ratio %[fx:w/h]\n" "$OUT"
