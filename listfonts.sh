#!/bin/bash
$(rm -f txt/fonts.txt)
for file in $( find fonts -type f -name "*.otf" -o -name "*.ttf" )
    do
      echo "$file " >> txt/fonts.txt
    done
