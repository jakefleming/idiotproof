#!/bin/bash
DATE=$(hexdump -n 16 -v -e '/1 "%02X"' /dev/urandom)
$(rm -f txt/fonts.txt)
for file in $( find fonts -type f -name "*.otf" -o -name "*.ttf" )
    do
      echo "$file " >> txt/$DATE.txt
    done
$(cp txt/$DATE.txt txt/fonts.txt)
$(rm -f txt/$DATE.txt)
