![Idiot Proofed](http://idiotproofed.com/src/images/github-share.png)


Stable release at http://idiotproofed.com.

Created by [Very Cool Studio](https://verycoolstudio.com) and [Jake Fleming](https://www.futurefonts.xyz/jake-fleming).

Idiot Proofed was made so we'd never have to open InDesign again. It works best locally, where gulp can watch for changes to fonts. On font selection Idiot Proofed takes a wild guess at where you're at in your proofing process, what opentype features are available in your font, and delivers proofing material accordingly. 

## The tabs
Idiot Proofed starts with an out-of-the-box proof. The font size, styling, and content are editable and saved in `localStorage`. If you want a custom version, clone the repository and run it locally by editing the `src/js/proof.json` file.
1. Hamburgers — minumum rhythm sense character set
2. Spacing — basic character set, `NOno` spacing control sets, trio spacing, and some figure spacing.
3. Pangram — basic character set in panagrams
4. Kerning — wider character set, common kerning problems, kerning trios, furniture
5. Italics — inline italics can be accessed by uploading two fonts, then holding `shift` to select both chips. The second selection will be the italic font. Select text in proofs and hit `⌘+i` to italicize inline text.
6. Diacritics — examples of diacritics accross a selection of latin languages
7. Features — auto generated demonstration of features
8. Greek — basic character set, selection of text focusing on each letter
9. Cyrillic — basic character set, uppercase and lowercase spacing control sets

## How to install locally
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
* Greek uses Gerry Leonidas' [test text](https://leonidas.net/greek-type-design/texture-and-fitting/).

### License

Code is available under the MIT License, see [license.md](license.md) for full details

