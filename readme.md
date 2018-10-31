![Idiot Proofed](http://idiotproofed.com/images/github-share.jpg)


Stable release at http://idiotproofed.com.

Created by [Very Cool Studio](https://verycoolstudio.com) and [Jake Fleming](https://www.futurefonts.xyz/jake-fleming).

Idiot Proofed was made so we'd never have to open InDesign again. It works best locally, where gulp can watch for changes to fonts, but also works just great in browser. On font selection Idiot Proofed takes a wild guess at where you're at in your proofing process, what opentype features are available in your font, and delivers proofing material accordingly in three broad stages. 

## The Stages
1. Hamburgers — minumum rhythm sense character set
2. Spacing — basic character set, `NOno` spacing control sets, and trio spacing controls
3. Pangram - basic character set in panagrams
4. Kerning - wider character set, common kerning problems, kerning trios, furniture
5. Features - auto generated demonstration of features

## How To Install Locally
Clone this repository. If you have node installed and gulp installed go ahead and get the party started:
* `cd` to repository
* `npm install`
* `npm start`

[If you don't have node or gulp installed](https://www.google.com/search?q=install+node+and+gulp&oq=install+node+and+gulp&aqs=chrome..69i57j0l5.5274j1j7&sourceid=chrome&ie=UTF-8).

## Notes

* Not extensively browser tested
* No server storage is used, fonts are stored in your browser, then embedded directly from there into a PDF that is unaccessable to us. Preferences are saved via browser `localStorage`.

## Thanks

This entire thing is possible thanks to the work of many many other people.

* Most thanks to Pablo Impallari's [Font Testing Page](https://github.com/impallari/Font-Testing-Page/) which has been down for several months and forced us to come up with a replacement.
* [Axis Praxis](http://axis-praxis.org), which kindly uses very readable javascript in their source.
* Latin02 Diacritics tabs from [Context of Diacritics](http://urtd.net/projects/cod)

### License

Code is available under the MIT License, see [license.md](license.md) for full details

