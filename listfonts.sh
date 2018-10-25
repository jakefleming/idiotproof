#!/bin/bash
  #Find all the files in that directory...
$(rm -f txt/fonts.txt)
for file in $( find fonts -type f -name "*.*" )
    do
      echo "$file " >> txt/fonts.txt
    done
