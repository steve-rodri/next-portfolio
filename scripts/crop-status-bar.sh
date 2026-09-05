#!/bin/bash
# Crop the status bar and Dynamic Island off phone captures, keeping full width
# so each shot holds its native aspect ratio.
#
#   scripts/crop-status-bar.sh 150 /tmp/burn/native /tmp/burn/full/*.png
#
# 150 suits a 1320x2868 capture (iPhone 16/17 Pro Max), leaving 1320x2718.
# Check the result: a screen whose content starts high can lose a heading.
#
# Never pad a capture out to 9:16. components/work/screenshots.tsx sizes each
# tile from the image's own aspect ratio, so a 19.5:9 phone shot renders whole;
# padding it is what put grey bars down the sides of the first Burn tiles.
set -euo pipefail

TOP=${1:?usage: crop-status-bar.sh <top-px> <out-dir> <image...>}
OUT=${2:?usage: crop-status-bar.sh <top-px> <out-dir> <image...>}
shift 2
[ "$#" -gt 0 ] || { echo "no images given" >&2; exit 1; }

command -v magick >/dev/null || { echo "needs ImageMagick (brew install imagemagick)" >&2; exit 1; }

mkdir -p "$OUT"

for src in "$@"; do
  name=$(basename "${src%.*}")
  width=$(magick identify -format %w "$src")
  height=$(magick identify -format %h "$src")
  magick "$src" -crop "${width}x$((height - TOP))+0+${TOP}" +repage "$OUT/$name.png"
  printf '%-22s ' "$name"
  magick identify -format '%wx%h  ratio %[fx:w/h]\n' "$OUT/$name.png"
done
