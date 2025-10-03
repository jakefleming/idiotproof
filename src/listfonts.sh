#!/bin/bash
DATE=$(hexdump -n 16 -v -e '/1 "%02X"' /dev/urandom)
$(rm -f src/txt/fonts.txt)
for file in $( find fonts -type f -name "*.otf" -o -name "*.ttf" -o -name "*.woff2" )
    do
      echo "$file " >> src/txt/$DATE.txt
    done
$(cp src/txt/$DATE.txt src/txt/fonts.txt)
$(rm -f src/txt/$DATE.txt)
