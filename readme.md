![Idiot Proofed](http://idiotproofed.com/images/github-share.jpg)


Stable release at http://idiotproofed.com.

Created by [Very Cool Studio](https://verycoolstudio.com) and [Jake Fleming](https://www.futurefonts.xyz/jake-fleming).

Idiot Proofed was made so we'd never have to open InDesign again. It works best locally, where gulp can watch for changes to fonts, but also works just great in browser. On font selection Idiot Proofed takes a wild guess at where you're at in your proofing process, what opentype features are available in your font, and delivers proofing material accordingly in three broad stages. 

## The Stages
1. Hamburgedfontsiv
2. Spacing
3. Kerning

## Notes

* Not extensively browser tested
* No server storage is used, fonts are stored in your browser, then embedded directly from there into a PDF that is unaccessable to us.

## Thanks

This entire thing is built on the work of other people!

* Most thanks to Pablo Impallari's [Font Testing Page](https://github.com/impallari/Font-Testing-Page/) which has been down for several months and forced us to come up with a replacement.
* [Axis Praxis](http://axis-praxis.org), which kindly uses very readable javascript in their source.
* Latin02 Diacritics tabs from [Context of Diacritics](http://urtd.net/projects/cod)

### License

Code is available under the MIT License, see [license.md](license.md) for full details

## How To Install Locally
* Clone this repository
* `npm install`
* `npm start`
