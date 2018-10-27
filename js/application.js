//To Do
// * Diacritics proofing. Maybe phase 4?
// * Drag and drop?
// * Select multiple fonts server side
// * save pdf to google drive?

var font = null;
window.fontSize = 16;
window.lineHeight = 1.3;
window.letterSpacing = 0;

// Level 1
var text = {
    1: {
        overview: 'HAMBURGEDFONTSIVhamburgedfontsiv',
        spacing: 'HHAHOAOO HHBHOBOO HHDHODOO HHEHOEOO HHFHOFOO HHGHOGOO HHHHOHOO HHIHOIOO HHMHOMOO HHNHONOO HHOHOOOO HHRHOROO HHSHOSOO HHTHOTOO HHUHOUOO HHVHOVOO hhahoaoo hhbhoboo hhdhodoo hhehoeoo hhfhofoo hhghogoo hhhhohoo hhihoioo hhlholoo hhmhomoo hhnhonoo hhohoooo hhrhoroo hhshosoo hhthotoo hhuhouoo hhvhovoo',
        trio: 'Aho Bho Dho Eho Fho Hho Iho Lho Mho Nho Oho Rho Sho Tho Uho Vho Aon Bon Don Eon Fon Hon Ion Lon Mon Non Oon Ron Son Ton Uon Von',
        extra: '',
        furniture: '',
    },
    2: {
        overview: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnnopqrstuvwxyz.,:; -‘’“” ?!0123456789',
        spacing: 'HHAHOAOO HHBHOBOO HHCHOCOO HHDHODOO HHEHOEOO HHFHOFOO HHGHOGOO HHHHOHOO HHIHOIOO HHJHOJOO HHKHOKOO HHLHOLOO HHMHOMOO HHNHONOO HHOHOOOO HHPHOPOO HHQHOQOO HHRHOROO HHSHOSOO HHTHOTOO HHUHOUOO HHVHOVOO HHWHOWOO HHXHOXOO  HHYHOYOO HH&HO&OO HHZHOZOO HH@HO@OO HHẞHOẞOO HAHBHCHDHEHFHGHHHIHJHKHHLHMHNHOHHPHQH HRHSHTHUHVHWHXHYHZHẞH OAOBOCODOEOFOGOHOIOJOKOLOMONOOOPOQO OROSOTOUOVOWOXOYOZOẞO hhahoaoo hhbhoboo hhchocoo hhdhodoo hhehoeoo hhfhofoo hhghogoo hhhhohoo hhihoioo hhjhojoo hhkhokoo hhlholoo hhmhomoo hhnhonoo hhohoooo hhphopoo hhqhoqoo hhrhoroo hhshosoo hhßhoßoo hhthotoo hhuhouoo hhvhovoo hhwhowoo hhxhoxoo hhyhoyoo hhzhozoo hh@ho@oo hhðhoðoo nnoonnecnncennbnndnnbdnnpqnnpðnn oaobocodoeofogohoiojokoolomono oopoqorosoßotouovoowoxoyozoðo nanbncndnenfngnhninjnknnlnmnnn nonpnqnrnsnßntnunvnwnxnynznðn hahbhchdhehfhghhhihjhkhhlhmhnh hohphqhrhshßhthuhvhwhxhyhzhðh',
        trio: 'Aho Bho Cho Dho Eho Fho Gho Hho Iho Jho Kho Lho Mho Nho Oho Pho Qho Rho Sho Tho Uho Vho Who Xho Yho ZhoAon Bon Con Don Eon Fon Gon Hon Ion Jon Kon Lon Mon Non Oon Pon Qon Ron Son Ton Uon Von Won Xon Yon Zon',
        extra: 'Grumpy wizards make toxic brew for the evil Queen and Jack.',
        furniture: '',
    },
    3: {
        overview: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghhijklmmnnopqrstuvwxyz.,:; -‘’“” ?!0123456789&@/|[](){}',
        spacing: 'I “Ask Jeff” or ‘Ask Jeff’. Take the chef d’œuvre! Two of [of] (of) ‘of’ “of” of? of! of*. Two of [of] (of) ‘of’ “of” of? of! of*. Ydes, Yffignac and Ygrande are in France: so are Ypres, Les Woëvres, the Fôret de Wœvres, the Voire and Vauvise. Yves is in heaven; D’Amboise is in jail. Lyford’s in Texas & L’Anse-aux-Griffons in Québec; the Łyna in Poland. Yriarte, Yciar and Ycsaÿe are at Yale. Kyoto and Ryotsu are both in Japan, Kwikpak on the Yukon delta, Kvæven in Norway, Kyulu in Kenya, not in Rwanda.… Walton’s in West Virginia, but «Wren» is in Oregon. Tlálpan is near Xochimilco in México. The Zygos & Xylophagou are in Cyprus, Zwettl in Austria, Fænø in Denmark, the Vøringsfossen and Værøy in Norway. Tchula is in Mississippi, the Tittabawassee in Michigan. Twodot is here in Montana, Ywamun in Burma. Yggdrasil and Ymir, Yngvi and Vóden, Vídrið and Skeggjöld and Týr are all in the Eddas. Tørberget and Våg, of course, are in Norway, Ktipas and Tmolos in Greece, but Vázquez is in Argentina, Vreden in Germany, Von-Vincke-Straße in Münster, Vdovino in Russia, Ytterbium in the periodic table. Are Toussaint L’Ouverture, Wölfflin, Wolfe, Miłosz and Wū Wŭ all in the library? 1510–1620, 11:00 pm, and the 1980s are over. Ergänzt von Typefacts: Ist da „Jemand“? „Volker?“ – „Wolf“. „Anna?“ – „Yvonne“. „Torsten fragte: ‚Vladimir?‘, später riefer ‚Wolf‘ und ‚Theresa‘, dann ‚Andreas‘ und ‚Yvonne‘“. Eleganter: Ist da »Jemand«? »Volker?« – »Wolf«. »Anna?« – »Yvonne«. »Torsten fragte: ›Vladimir?‹, später rief er ›Wolf‹ und ›Theresa‹, dann ›Andreas‹ und ›Yvonne‹«',
        trio: 'Aar Abo Act Adj Aer Aft Aga Ahe Aie Aji Ake Alm Amo Ano Aoa App Aqu Art Ass Att Aug Ave Awa Axe Aye Azo Bal Bbn Bcc Bdj Ber Bfd Bga Bhu Bie Bji Bkl Bli Bmo Bni Boa Bpi Bqu Brt Bss Btl But Bve Bwa Bxl Bye Bzo Cal Cbn Ccn Cdj Cer Cfi Cga Che Cie Cjn Ckl Cle Cmo Cnl Coa Cpl Cqu Crl Css Ctl Cul Cvl Cwl Cxl Cyi Czo Dal Dbn Dci Ddj Der Dfl Dga Dhr Die Dji Dkl Dli Dmo Dnu Don Dpi Dqu Dri Dsl Dtl Dul Dvl Dwl Dxl Dya Dzn Ear Ebe Ech Edw Een Efo Ega Ehr Eit Ejo Ekn Eld Emp Ens Eob Epa Equ Ero Est Eth Euc Eva Ewa Exe Eyo Eze Fal Fbo Fci Fdj Fer Ffu Fgn Fhi Fil Fjo Fkl Fli Fmi Fnl Fol Fpi Fqu Fra Fst Fto Ful Fvl Fwl Fxi Fyi Fzi Gal Gbo Gch Gdj Ger Gfl Ggl Ghi Gil Gjl Gke Gli Gmo Gnl Gol Gpi Gqu Gra Gst Gto Gut Gve Gwl Gxi Gyn Gzn Har Hbo Hct Hdj Her Hfl Hga Hhe Hie Hji Hke Hlm Hmo Hno Hon Hpl Hqu Hrt Hss Htt Hue Hve Hwa Hxe Hyu Hzi Ian Ibo Ict Idj Ier Ift Iga Ihe Iie Ijo Ike Ilm Imo Ino Ion Ipl Iqu Irt Iss Ita Iut Ive Iwa Ixe Iyo Izo Jap Jbo Jct Jdj Jer Jfn Jgu Jhe Jie Jjl Jkl Jlm Jmo Jno Jon Jpl Jqu Jrt Jss Jtt Jut Jve Jwa Jxe Jyn Jzt Kan Kbo Kci Kdj Ker Kfn Kga Khe Kie Kjl Kkn Klm Kmo Kno Kon Kpl Kqu Krt Kss Kti Kui Kve Kwa Kxe Kye Kzo Lam Lbo Lct Ldj Len Lft Lga Lhe Lie Lju Lke Llm Lmo Lno Lon Lpl Lqu Lrt Lss Ltt Luc Lve Lwa Lxe Lye Lzt Mar Mbu Mct Mdj Mer Mfl Mga Mhe Mie Mji Mke Mlf Mmi Mnu Mon Mpl Mqu Mrt Mss Mtt Mut Mvl Mwa Mxe Myu Mzi Nam Nbu Nct Ndj Nel Nfl Nga Nhi Nie Njn Nke Nlo Nmi Nnu Non Npr Nqu Nrt Nst Ntu Nul Nvd Nwa Nxe Nyi Nzu Oan Obu Oct Odj Oer Ofa Oga Ohe Oie Oja Oke Olf Omi Onu Oon Opl Oqu Ort Oss Ott Out Ovl Owa Oxe Oye Ozo Par Pbl Pct Pdj Per Pfe Pgs Phi Pie Pji Pki Pla Pml Pnu Pon Ppl Pqu Prt Psa Pts Pul Pvc Pwi Pxl Pyn Pzl Qal Qbo Qct Qdj Qer Qfi Qga Qhe Qie Qji Qke Qlm Qmo Qno Qoa Qpp Qqu Qrt Qss Qtt Qui Qve Qwa Qxe Qyo Qzo Rad Rbi Rct Rdj Ren Rfe Rgs Rha Ria Rji Rkl Rli Rms Rni Roa Rpi Rqu Rrt Rsi Rtd Rut Rvi Rwl Rxi Ryn Rzi Sar Sbo Sct Sdl Ser Sfo Sgi She Sie Sja Ski Slo Smi Sno Sol Spe Squ Srt Sst Stt Sut Sve Swa Sxe Syl Szo Tar Tba Tcm Tdi Ter Tfl Tgi The Tie Tji Tke Tlm Tmo Tno Tol Tpi Tqu Trt Tsi Tti Tut Tvl Twl Txl Tyl Tzo Ual Ubi Uct Udj Uer Ufc Uga Uhi Uie Uji Uke Ulm Umo Uno Uol Upp Uqu Urt Uss Utl Uui Uvl Uwl Uxe Uye Uzo Val Vbo Vct Vdj Ver Vft Vga Vhe Vie Vjl Vki Vlm Vmo Vno Vol Vpi Vqu Vrl Vsi Vtt Vut Vvl Vwl Vxl Vyl Vzi Wal Wbo Wcl Wdj Wer Wfi Wga Whe Wie Wjl Wke Wlm Wmo Wno Wol Wpi Wqu Wrl Wsi Wtt Wut Wvl Wwl Wxl Wya Wzl Xal Xbo Xce Xdj Xer Xft Xga Xhe Xie Xjl Xki Xlm Xmo Xno Xol Xpi Xqu Xrl Xsi Xtt Xut Xvl Xwl Xxl Xye Xzi Yal Ybo Yci Ydj Yer Yfl Yga Yhe Yie Yjo Ykl Yli Ymo Yno Yol Ypi Yqu Yrl Ysi Ytt Yut Yvl Ywl Yxl Yyl Yzi Zan Zbr Zco Zdj Zer Zfl Zga Zhe Zie Zji Zke Zlm Zmo Zno Zol Zpi Zqu Zro Zsn Zti Zut Zvl Zwl Zxl Zyl Zzl',
        extra: 'Aardvark Ablution Acrimonious Adventures Aeolian Africa Agamemnon Ahoy Aileron Ajax Akimbo Altruism America Anecdote Aorta Aptitude Aquarium Arcade Aspartame Athens Aurelius Avuncular Awning Axminster Ayers Azure Banishment Benighted Bhagavad Biblical Bjorn Blancmange Bolton Brusque Burnish Bwana Byzantium Cabbala Cetacean Charlemagne Cicero Clamorous Cnidarian Conifer Crustacean Ctenoid Culled Cynosure Czarina Dalmatian Delphi Dhurrie Dinner Djinn Document Drill Dunleary Dvorak Dwindle Dynamo Eames Ebullient Echo Edify Eels Eftsoons Egress Ehrlich Eindhoven Eject Ekistics Elzevir Eminence Ennoble Eocene Ephemeral Equator Erstwhile Estienne Etiquette Eucalyptus Everyman Ewen Exeter Eyelet Ezekiel Fanfare Ferocious Ffestiniog Finicky Fjord Flanders Forestry Frills Furniture Fylfot Garrulous Generous Ghastly Gimlet Glorious Gnomon Golfer Grizzled Gumption Gwendolyn Gymkhana Harrow Heifer Hindemith Horace Hsi Hubris Hybrid Iambic Ibarra Ichthyology Identity Ievgeny Ifritignite Ihre Ikon Iliad Imminent Innovation Iolanthe Ipanema Irascible Island Italic Ivory Iwis Ixtapa Iyar Izzard Janacek Jenson Jitter Joinery Jr. Jungian Kaiser Kenilworth Khaki Kindred Klondike Knowledge Kohlrabi Kraken Kudzu Kvetch Kwacha Kyrie Labrador Lent Lhasa Liniment Llama Longboat Luddite Lyceum Mandarin Mbandaka Mcintyre Mdina Mendacious Mfg. Mg Millinery Mlle. Mme. Mnemonic Moribund Mr. Ms. Mtn. Munitions Myra Narragansett Nefarious Nguyen Nile Nkoso Nnenna Nonsense Nr. Nunnery Nyack Oarsman Oblate Ocular Odessa Oedipus Often Ogre Ohms Oilers Okra Olfactory Ominous Onerous Oogamous Opine Ornate Ossified Othello Oubliette Ovens Owlish Oxen Oyster Ozymandias Parisian Pb Pd. Penrose Pfennig Pg. Pharmacy Pirouette Pleistocene Pneumatic Porridge Pp. Principle Psaltery Ptarmigan Pundit Pyrrhic Qaid Qed Qibris Qom Quill Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Salacious Sbeitla Scherzo Serpentine Sforza Shackles Sinful Sjoerd Skull Slalom Smelting Snipe Sorbonne Spartan Squire Sri Stultified Summoner Svelte Swarthy Sykes Szentendre Tarragon Tblisi Tcherny Tennyson Thaumaturge Tincture Tlaloc Toreador Treacherous Tsunami Turkey Twine Tyrolean Tzara Ubiquitous Ucello Udder Ufology Ugric Uhlan Uitlander Ukulele Ulster Umber Unguent Uomo Uplift Ursine Usurious Utrecht Uvula Uxorious Uzbek Vanished Vd. Venomous Vindicate Voracious Vrillier Vs. Vt. Vulnerable Vying Washington Wendell Wharf Window Wm. Worth Wrung Wt. Wunderman Wyes Xanthan Xenon Xiao Xmas Xonen Xray Xuxa Xylem Yarrow Ybarra Ycair Yds. Yellowstone Yggdrasil Yin Ylang Yours Ypsilanti Yquem Yrs. Ys. Ytterbium Yunnan Yvonne Zanzibar Zero Zhora Zinfandel Zone Zuni Zwieback Zygote',
        furniture: '$12 $23 $34 $45 $56 $67 $78 $89 $90 $01 €12 €23 €34 €45 €56 €67 €78 €89 €90 €01 £12 £23 £34 £45 £56 £67 £78 £89 £90 £01 ¥12 ¥23 ¥34 ¥45 ¥56 ¥67 ¥78 ¥89 ¥90 ¥01 12¢ 23¢ 34¢ 45¢ 56¢ 67¢ 78¢ 89¢ 90¢ 01¢ ¿A? ¿B? ¿C? ¿D? ¿E? ¿F? ¿G? ¿H? ¿I? ¿J? ¿K? ¿L? ¿M? ¿N? ¿O? ¿P? ¿Q? ¿R? ¿S? ¿T? ¿U? ¿V? ¿W? ¿X? ¿Y? ¿Z? ¿a? ¿b? ¿c? ¿d? ¿e? ¿f? ¿g? ¿h? ¿i? ¿j? ¿k? ¿l? ¿m? ¿n? ¿o? ¿p? ¿q? ¿r? ¿s? ¿t? ¿u? ¿v? ¿w? ¿x? ¿y? ¿z? ¡a! ¡b! ¡c! ¡d! ¡e! ¡f! ¡g! ¡h! ¡i! ¡j! ¡k! ¡l! ¡m! ¡n! ¡o! ¡p! ¡q! ¡r! ¡s! ¡t! ¡u! ¡v! ¡w! ¡x! ¡y! ¡z! ¡A! ¡B! ¡C! ¡D! ¡E! ¡F! ¡G! ¡H! ¡I! ¡J! ¡K! ¡L! ¡M! ¡N! ¡O! ¡P! ¡Q! ¡R! ¡S! ¡T! ¡U! ¡V! ¡W! ¡X! ¡Y! ¡Z! “A” “B” “C” “D” “E” “F” “G” “H” “I” “J” “K” “L” “M” “N” “O” “P” “Q” “R” “S” “T” “U” “V” “W” “X” “Y” “Z” “a” “b” “c” “d” “e” “f” “g” “h” “i” “j” “k” “l” “m” “n” “o” “p” “q” “r” “s” “t” “u” “v” “w” “x” “y” “z” ‘A’ ‘B’ ‘C’ ‘D’ ‘E’ ‘F’ ‘G’ ‘H’ ‘I’ ‘J’ ‘K’ ‘L’ ‘M’ ‘N’ ‘O’ ‘P’ ‘Q’ ‘R’ ‘S’ ‘T’ ‘U’ ‘V’ ‘W’ ‘X’ ‘Y’ ‘Z’ ‘a’ ‘b’ ‘c’ ‘d’ ‘e’ ‘f’ ‘g’ ‘h’ ‘i’ ‘j’ ‘k’ ‘l’ ‘m’ ‘n’ ‘o’ ‘p’ ‘q’ ‘r’ ‘s’ ‘t’ ‘u’ ‘v’ ‘w’ ‘x’ ‘y’ ‘z’',
    }
};
// Pulled from wikipedia
var textPangram = {
    1: 'Grumpy wizards make toxic brew for the evil Queen and Jack.',
    2: 'Jived fox nymph grabs quick waltz.',
    3: 'Glib jocks quiz nymph to vex dwarf.',
    4: 'Sphinx of black quartz, judge my vow.',
    5: 'How vexingly quick daft zebras jump!',
    6: 'The five boxing wizards jump quickly.',
    7: 'Jackdaws love my big sphinx of quartz.',
    8: 'Pack my box with five dozen liquor jugs.',
};
// ヽ(。_°)ノ
var textSexLife = 'The sex life of the woodchuck is a provocative question for most vertebrate zoology majors We quickly seized the black axle and just saved it from going past him No kidding lorenzo called off his trip to visit mexico city just because they told him the conquistadores were extinct Heavy boxes perform quick waltzes and jigs Six big juicy steaks sizzled in a pan as five workmen left the quarry Will major douglas be expected to take this truefalse quiz very soon Ebenezer unexpectedly bagged two tranquil aardvarks with his jiffy vacuum cleaner An inspired calligrapher can create pages of beauty using stick ink quill brush pickaxe buzz saw or even strawberry jam We dislike to exchange job lots of sizes varying from a quarter up My help squeezed in and joined the weavers again before six oclock While suez sailors wax parquet decks afghan jews vomit jauntily abaft Amazingly few discotheques provide jukeboxes The july sun caused a fragment of black pine wax to ooze on the velvet quilt King alexander was just partly overcome after quizzing diogenes in his tub The jukebox music puzzled a gentle visitor from a quaint valley town The job requires extra pluck and zeal from every young wage earner Whenever the black fox jumped the squirrel gazed suspiciously How razorbackjumping frogs can level six piqued gymnasts Jackdaws love my big sphinx of quartz While making deep excavations we found some quaint bronze jewelry Just work for improved basic techniques to maximize your typing skill A mad boxer shot a quick gloved jab to the jaw of his dizzy opponent Forsaking monastic tradition twelve jovial friars gave up their vocation for a questionable existence on the flying trapeze Quick zephyrs blow vexing daft jim How quickly daft jumping zebras vex jinxed wizards Pluck ivy from the big quilt two hardy boxing kangaroos Jet from Sydney to Zanzibar on quicksilver pinions We promptly judged antique ivory buckles for the next prize The public was amazed to view the quickness and dexterity of the juggler Pack my box with five dozen liquor jugs Waltz nymph for quick jigs vex bud The five boxing wizards jump quickly Crazy fredericka bought many very exquisite opal jewels The quick brown fox jumps over a lazy dog Jellylike above the high wire six quaking pachyderms kept the climax of the extravaganza in a dazzling state of flux Jaded zombies acted quaintly but kept driving their oxen forward Back in my quaint garden jaunty zinnias vie with flaunting phlox Big fuji waves pitch enzymed kex liquor the explorer was frozen in his big kayak Just after making queer discoveries a quart jar of oil mixed with zinc oxide makes a very bright paintSix javelins thrown by the quick savages whizzed forty paces beyond the mark Sphinx of black quartz judge my vow Sixty zippers were quickly picked from the woven jute bag';
var textLetters = 'Aardvark Ablution Acrimonious Adventures Aeolian Africa Agamemnon Ahoy Aileron Ajax Akimbo Altruism America Anecdote Aorta Aptitude Aquarium Arcade Aspartame Athens Aurelius Avuncular Awning Axminster Ayers Azure Banishment Benighted Bhagavad Biblical Bjorn Blancmange Bolton Brusque Burnish Bwana Byzantium Cabbala Cetacean Charlemagne Cicero Clamorous Cnidarian Conifer Crustacean Ctenoid Culled Cynosure Czarina Dalmatian Delphi Dhurrie Dinner Djinn Document Drill Dunleary Dvorak Dwindle Dynamo Eames Ebullient Echo Edify Eels Eftsoons Egress Ehrlich Eindhoven Eject Ekistics Elzevir Eminence Ennoble Eocene Ephemeral Equator Erstwhile Estienne Etiquette Eucalyptus Everyman Ewen Exeter Eyelet Ezekiel Fanfare Ferocious Ffestiniog Finicky Fjord Flanders Forestry Frills Furniture Fylfot Garrulous Generous Ghastly Gimlet Glorious Gnomon Golfer Grizzled Gumption Gwendolyn Gymkhana Harrow Heifer Hindemith Horace Hsi Hubris Hybrid Iambic Ibarra Ichthyology Identity Ievgeny Ifritignite Ihre Ikon Iliad Imminent Innovation Iolanthe Ipanema Irascible Island Italic Ivory Iwis Ixtapa Iyar Izzard Janacek Jenson Jitter Joinery Jr. Jungian Kaiser Kenilworth Khaki Kindred Klondike Knowledge Kohlrabi Kraken Kudzu Kvetch Kwacha Kyrie Labrador Lent Lhasa Liniment Llama Longboat Luddite Lyceum Mandarin Mbandaka Mcintyre Mdina Mendacious Mfg. Mg Millinery Mlle. Mme. Mnemonic Moribund Mr. Ms. Mtn. Munitions Myra Narragansett Nefarious Nguyen Nile Nkoso Nnenna Nonsense Nr. Nunnery Nyack Oarsman Oblate Ocular Odessa Oedipus Often Ogre Ohms Oilers Okra Olfactory Ominous Onerous Oogamous Opine Ornate Ossified Othello Oubliette Ovens Owlish Oxen Oyster Ozymandias Parisian Pb Pd. Penrose Pfennig Pg. Pharmacy Pirouette Pleistocene Pneumatic Porridge Pp. Principle Psaltery Ptarmigan Pundit Pyrrhic Qaid Qed Qibris Qom Quill Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Salacious Sbeitla Scherzo Serpentine Sforza Shackles Sinful Sjoerd Skull Slalom Smelting Snipe Sorbonne Spartan Squire Sri Stultified Summoner Svelte Swarthy Sykes Szentendre Tarragon Tblisi Tcherny Tennyson Thaumaturge Tincture Tlaloc Toreador Treacherous Tsunami Turkey Twine Tyrolean Tzara Ubiquitous Ucello Udder Ufology Ugric Uhlan Uitlander Ukulele Ulster Umber Unguent Uomo Uplift Ursine Usurious Utrecht Uvula Uxorious Uzbek Vanished Vd. Venomous Vindicate Voracious Vrillier Vs. Vt. Vulnerable Vying Washington Wendell Wharf Window Wm. Worth Wrung Wt. Wunderman Wyes Xanthan Xenon Xiao Xmas Xonen Xray Xuxa Xylem Yarrow Ybarra Ycair Yds. Yellowstone Yggdrasil Yin Ylang Yours Ypsilanti Yquem Yrs. Ys. Ytterbium Yunnan Yvonne Zanzibar Zero Zhora Zinfandel Zone Zuni Zwieback Zygote';
var textFurniture = '$12 $23 $34 $45 $56 $67 $78 $89 $90 $01 €12 €23 €34 €45 €56 €67 €78 €89 €90 €01 £12 £23 £34 £45 £56 £67 £78 £89 £90 £01 ¥12 ¥23 ¥34 ¥45 ¥56 ¥67 ¥78 ¥89 ¥90 ¥01 12¢ 23¢ 34¢ 45¢ 56¢ 67¢ 78¢ 89¢ 90¢ 01¢ ¿A? ¿B? ¿C? ¿D? ¿E? ¿F? ¿G? ¿H? ¿I? ¿J? ¿K? ¿L? ¿M? ¿N? ¿O? ¿P? ¿Q? ¿R? ¿S? ¿T? ¿U? ¿V? ¿W? ¿X? ¿Y? ¿Z? ¿a? ¿b? ¿c? ¿d? ¿e? ¿f? ¿g? ¿h? ¿i? ¿j? ¿k? ¿l? ¿m? ¿n? ¿o? ¿p? ¿q? ¿r? ¿s? ¿t? ¿u? ¿v? ¿w? ¿x? ¿y? ¿z? ¡a! ¡b! ¡c! ¡d! ¡e! ¡f! ¡g! ¡h! ¡i! ¡j! ¡k! ¡l! ¡m! ¡n! ¡o! ¡p! ¡q! ¡r! ¡s! ¡t! ¡u! ¡v! ¡w! ¡x! ¡y! ¡z! ¡A! ¡B! ¡C! ¡D! ¡E! ¡F! ¡G! ¡H! ¡I! ¡J! ¡K! ¡L! ¡M! ¡N! ¡O! ¡P! ¡Q! ¡R! ¡S! ¡T! ¡U! ¡V! ¡W! ¡X! ¡Y! ¡Z! “A” “B” “C” “D” “E” “F” “G” “H” “I” “J” “K” “L” “M” “N” “O” “P” “Q” “R” “S” “T” “U” “V” “W” “X” “Y” “Z” “a” “b” “c” “d” “e” “f” “g” “h” “i” “j” “k” “l” “m” “n” “o” “p” “q” “r” “s” “t” “u” “v” “w” “x” “y” “z” ‘A’ ‘B’ ‘C’ ‘D’ ‘E’ ‘F’ ‘G’ ‘H’ ‘I’ ‘J’ ‘K’ ‘L’ ‘M’ ‘N’ ‘O’ ‘P’ ‘Q’ ‘R’ ‘S’ ‘T’ ‘U’ ‘V’ ‘W’ ‘X’ ‘Y’ ‘Z’ ‘a’ ‘b’ ‘c’ ‘d’ ‘e’ ‘f’ ‘g’ ‘h’ ‘i’ ‘j’ ‘k’ ‘l’ ‘m’ ‘n’ ‘o’ ‘p’ ‘q’ ‘r’ ‘s’ ‘t’ ‘u’ ‘v’ ‘w’ ‘x’ ‘y’ ‘z’';
// Features
var textFeature = {
    case: {
          sample: '(Aardvark) [Ablution] 1980-1920 Acrimonious@gmail.com Adventures/Misadventures',
          definition: 'Case-Sensitive Forms: substitutes glyphs with forms better suited in all uppercase text',
    },
    liga: {
          sample: 'Aardvark Ablution Acrimonious Adventures Aeolian Africa Agamemnon Ahoy Aileron Ajax Akimbo Altruism America Anecdote Aorta Aptitude Aquarium Arcade Aspartame Athens Aurelius Avuncular Awning Axminster Ayers Azure Banishment Benighted Bhagavad Biblical Bjorn Blancmange Bolton Brusque Burnish Bwana Byzantium Cabbala Cetacean Charlemagne Cicero Clamorous Cnidarian Conifer Crustacean Ctenoid Culled Cynosure Czarina Dalmatian Delphi Dhurrie Dinner Djinn Document Drill Dunleary Dvorak Dwindle Dynamo Eames Ebullient Echo Edify Eels Eftsoons Egress Ehrlich Eindhoven Eject Ekistics Elzevir Eminence Ennoble Eocene Ephemeral Equator Erstwhile Estienne Etiquette Eucalyptus Everyman Ewen Exeter Eyelet Ezekiel Fanfare Ferocious Ffestiniog Finicky Fjord Flanders Forestry Frills Furniture Fylfot Garrulous Generous Ghastly Gimlet Glorious Gnomon Golfer Grizzled Gumption Gwendolyn Gymkhana Harrow Heifer Hindemith Horace Hsi Hubris Hybrid Iambic Ibarra Ichthyology Identity Ievgeny Ifritignite Ihre Ikon Iliad Imminent Innovation Iolanthe Ipanema Irascible Island Italic Ivory Iwis Ixtapa Iyar Izzard Janacek Jenson Jitter Joinery Jr. Jungian Kaiser Kenilworth Khaki Kindred Klondike Knowledge Kohlrabi Kraken Kudzu Kvetch Kwacha Kyrie Labrador Lent Lhasa Liniment Llama Longboat Luddite Lyceum Mandarin Mbandaka Mcintyre Mdina Mendacious Mfg. Mg Millinery Mlle. Mme. Mnemonic Moribund Mr. Ms. Mtn. Munitions Myra Narragansett Nefarious Nguyen Nile Nkoso Nnenna Nonsense Nr. Nunnery Nyack Oarsman Oblate Ocular Odessa Oedipus Often Ogre Ohms Oilers Okra Olfactory Ominous Onerous Oogamous Opine Ornate Ossified Othello Oubliette Ovens Owlish Oxen Oyster Ozymandias Parisian Pb Pd. Penrose Pfennig Pg. Pharmacy Pirouette Pleistocene Pneumatic Porridge Pp. Principle Psaltery Ptarmigan Pundit Pyrrhic Qaid Qed Qibris Qom Quill Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Salacious Sbeitla Scherzo Serpentine Sforza Shackles Sinful Sjoerd Skull Slalom Smelting Snipe Sorbonne Spartan Squire Sri Stultified Summoner Svelte Swarthy Sykes Szentendre Tarragon Tblisi Tcherny Tennyson Thaumaturge Tincture Tlaloc Toreador Treacherous Tsunami Turkey Twine Tyrolean Tzara Ubiquitous Ucello Udder Ufology Ugric Uhlan Uitlander Ukulele Ulster Umber Unguent Uomo Uplift Ursine Usurious Utrecht Uvula Uxorious Uzbek Vanished Vd. Venomous Vindicate Voracious Vrillier Vs. Vt. Vulnerable Vying Washington Wendell Wharf Window Wm. Worth Wrung Wt. Wunderman Wyes Xanthan Xenon Xiao Xmas Xonen Xray Xuxa Xylem Yarrow Ybarra Ycair Yds. Yellowstone Yggdrasil Yin Ylang Yours Ypsilanti Yquem Yrs. Ys. Ytterbium Yunnan Yvonne Zanzibar Zero Zhora Zinfandel Zone Zuni Zwieback Zygote',
          definition: 'Ligatures',
    },
    dlig: {
          sample: 'Aardvark Ablution Acrimonious Adventures Aeolian Africa Agamemnon Ahoy Aileron Ajax Akimbo Altruism America Anecdote Aorta Aptitude Aquarium Arcade Aspartame Athens Aurelius Avuncular Awning Axminster Ayers Azure Banishment Benighted Bhagavad Biblical Bjorn Blancmange Bolton Brusque Burnish Bwana Byzantium Cabbala Cetacean Charlemagne Cicero Clamorous Cnidarian Conifer Crustacean Ctenoid Culled Cynosure Czarina Dalmatian Delphi Dhurrie Dinner Djinn Document Drill Dunleary Dvorak Dwindle Dynamo Eames Ebullient Echo Edify Eels Eftsoons Egress Ehrlich Eindhoven Eject Ekistics Elzevir Eminence Ennoble Eocene Ephemeral Equator Erstwhile Estienne Etiquette Eucalyptus Everyman Ewen Exeter Eyelet Ezekiel Fanfare Ferocious Ffestiniog Finicky Fjord Flanders Forestry Frills Furniture Fylfot Garrulous Generous Ghastly Gimlet Glorious Gnomon Golfer Grizzled Gumption Gwendolyn Gymkhana Harrow Heifer Hindemith Horace Hsi Hubris Hybrid Iambic Ibarra Ichthyology Identity Ievgeny Ifritignite Ihre Ikon Iliad Imminent Innovation Iolanthe Ipanema Irascible Island Italic Ivory Iwis Ixtapa Iyar Izzard Janacek Jenson Jitter Joinery Jr. Jungian Kaiser Kenilworth Khaki Kindred Klondike Knowledge Kohlrabi Kraken Kudzu Kvetch Kwacha Kyrie Labrador Lent Lhasa Liniment Llama Longboat Luddite Lyceum Mandarin Mbandaka Mcintyre Mdina Mendacious Mfg. Mg Millinery Mlle. Mme. Mnemonic Moribund Mr. Ms. Mtn. Munitions Myra Narragansett Nefarious Nguyen Nile Nkoso Nnenna Nonsense Nr. Nunnery Nyack Oarsman Oblate Ocular Odessa Oedipus Often Ogre Ohms Oilers Okra Olfactory Ominous Onerous Oogamous Opine Ornate Ossified Othello Oubliette Ovens Owlish Oxen Oyster Ozymandias Parisian Pb Pd. Penrose Pfennig Pg. Pharmacy Pirouette Pleistocene Pneumatic Porridge Pp. Principle Psaltery Ptarmigan Pundit Pyrrhic Qaid Qed Qibris Qom Quill Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Salacious Sbeitla Scherzo Serpentine Sforza Shackles Sinful Sjoerd Skull Slalom Smelting Snipe Sorbonne Spartan Squire Sri Stultified Summoner Svelte Swarthy Sykes Szentendre Tarragon Tblisi Tcherny Tennyson Thaumaturge Tincture Tlaloc Toreador Treacherous Tsunami Turkey Twine Tyrolean Tzara Ubiquitous Ucello Udder Ufology Ugric Uhlan Uitlander Ukulele Ulster Umber Unguent Uomo Uplift Ursine Usurious Utrecht Uvula Uxorious Uzbek Vanished Vd. Venomous Vindicate Voracious Vrillier Vs. Vt. Vulnerable Vying Washington Wendell Wharf Window Wm. Worth Wrung Wt. Wunderman Wyes Xanthan Xenon Xiao Xmas Xonen Xray Xuxa Xylem Yarrow Ybarra Ycair Yds. Yellowstone Yggdrasil Yin Ylang Yours Ypsilanti Yquem Yrs. Ys. Ytterbium Yunnan Yvonne Zanzibar Zero Zhora Zinfandel Zone Zuni Zwieback Zygote',
          definition: 'Discretionary Ligatures',
    },
    swsh: {
          sample: 'Aardvark Ablution Acrimonious Adventures Aeolian Africa Agamemnon Ahoy Aileron Ajax Akimbo Altruism America Anecdote Aorta Aptitude Aquarium Arcade Aspartame Athens Aurelius Avuncular Awning Axminster Ayers Azure Banishment Benighted Bhagavad Biblical Bjorn Blancmange Bolton Brusque Burnish Bwana Byzantium Cabbala Cetacean Charlemagne Cicero Clamorous Cnidarian Conifer Crustacean Ctenoid Culled Cynosure Czarina Dalmatian Delphi Dhurrie Dinner Djinn Document Drill Dunleary Dvorak Dwindle Dynamo Eames Ebullient Echo Edify Eels Eftsoons Egress Ehrlich Eindhoven Eject Ekistics Elzevir Eminence Ennoble Eocene Ephemeral Equator Erstwhile Estienne Etiquette Eucalyptus Everyman Ewen Exeter Eyelet Ezekiel Fanfare Ferocious Ffestiniog Finicky Fjord Flanders Forestry Frills Furniture Fylfot Garrulous Generous Ghastly Gimlet Glorious Gnomon Golfer Grizzled Gumption Gwendolyn Gymkhana Harrow Heifer Hindemith Horace Hsi Hubris Hybrid Iambic Ibarra Ichthyology Identity Ievgeny Ifritignite Ihre Ikon Iliad Imminent Innovation Iolanthe Ipanema Irascible Island Italic Ivory Iwis Ixtapa Iyar Izzard Janacek Jenson Jitter Joinery Jr. Jungian Kaiser Kenilworth Khaki Kindred Klondike Knowledge Kohlrabi Kraken Kudzu Kvetch Kwacha Kyrie Labrador Lent Lhasa Liniment Llama Longboat Luddite Lyceum Mandarin Mbandaka Mcintyre Mdina Mendacious Mfg. Mg Millinery Mlle. Mme. Mnemonic Moribund Mr. Ms. Mtn. Munitions Myra Narragansett Nefarious Nguyen Nile Nkoso Nnenna Nonsense Nr. Nunnery Nyack Oarsman Oblate Ocular Odessa Oedipus Often Ogre Ohms Oilers Okra Olfactory Ominous Onerous Oogamous Opine Ornate Ossified Othello Oubliette Ovens Owlish Oxen Oyster Ozymandias Parisian Pb Pd. Penrose Pfennig Pg. Pharmacy Pirouette Pleistocene Pneumatic Porridge Pp. Principle Psaltery Ptarmigan Pundit Pyrrhic Qaid Qed Qibris Qom Quill Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Salacious Sbeitla Scherzo Serpentine Sforza Shackles Sinful Sjoerd Skull Slalom Smelting Snipe Sorbonne Spartan Squire Sri Stultified Summoner Svelte Swarthy Sykes Szentendre Tarragon Tblisi Tcherny Tennyson Thaumaturge Tincture Tlaloc Toreador Treacherous Tsunami Turkey Twine Tyrolean Tzara Ubiquitous Ucello Udder Ufology Ugric Uhlan Uitlander Ukulele Ulster Umber Unguent Uomo Uplift Ursine Usurious Utrecht Uvula Uxorious Uzbek Vanished Vd. Venomous Vindicate Voracious Vrillier Vs. Vt. Vulnerable Vying Washington Wendell Wharf Window Wm. Worth Wrung Wt. Wunderman Wyes Xanthan Xenon Xiao Xmas Xonen Xray Xuxa Xylem Yarrow Ybarra Ycair Yds. Yellowstone Yggdrasil Yin Ylang Yours Ypsilanti Yquem Yrs. Ys. Ytterbium Yunnan Yvonne Zanzibar Zero Zhora Zinfandel Zone Zuni Zwieback Zygote',
          definition: 'Swash: substitutes to swash forms',
    },
    frac: {
          sample: '⅟½↉⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅐⅛⅜⅝⅞⅑⅒',
          definition: 'Fractions',
    },
    onum: {
          sample: 'J. C. Bradshaw, who embodied many of the tested and unchanged virtues of the 19th-century English organist and choirmaster. In 1936, while in the midst of studies, Lilburn won a composition prize offered by the visiting pianist and composer Percy Grainger, with Forest, a tone poem, praised by the judges in terms which were soon to be proved prophetic and performed by the Wellington Symphony Orchestra under Leon de Mauny in 1937. By now Lilburn had decided upon music as his profession, rather than literature, for which he was equally qualified, and went to the Royal College of Music in London to study under Vaughan Williams. In 1939 his Fantasy Quartet won the Cobbett Prize. The following year his Aotearoa Overture opened the historic Centennial Matinee at His Majesty’s Theatre in the Haymarket, conducted by Warwick Braithwaite with the Sadler’s Wells Orchestra. It had been written for the occasion in two weeks. When Lilburn returned to New Zealand in 1940, the year of the Centennial celebrations, he learned that he had won three out of the four prizes offered for musical compositions to mark the occasion. His significant Landfall in Unknown Seat. incidental music to Allen Curnow’s poem to commemorate the tercentenary of the discovery of New Zealand by Abel Tasman, followed in 1942.',
          definition: 'Oldstyle Figures: substitutes default figures with forms better suited for text',
    },
    ordn: {
          sample: 'J. C. Bradshaw, who embodied many of the tested and unchanged virtues of the 19th-century English organist and choirmaster. In 1936, while in the midst of studies, Lilburn won a composition prize offered by the visiting pianist and composer Percy Grainger, with Forest, a tone poem, praised by the judges in terms which were soon to be proved prophetic and performed by the Wellington Symphony Orchestra under Leon de Mauny in 1937. By now Lilburn had decided upon music as his profession, rather than literature, for which he was equally qualified, and went to the Royal College of Music in London to study under Vaughan Williams. In 1939 his Fantasy Quartet won the Cobbett Prize. The following year his Aotearoa Overture opened the historic Centennial Matinee at His Majesty’s Theatre in the Haymarket, conducted by Warwick Braithwaite with the Sadler’s Wells Orchestra. It had been written for the occasion in two weeks. When Lilburn returned to New Zealand in 1940, the year of the Centennial celebrations, he learned that he had won three out of the four prizes offered for musical compositions to mark the occasion. His significant Landfall in Unknown Seat. incidental music to Allen Curnow’s poem to commemorate the tercentenary of the discovery of New Zealand by Abel Tasman, followed in 1942.',
          definition: 'Ordinals: substitutes default alphabetic glyphs with the ordinal forms for use after figures',
    },
    numr: {
          sample: '0123456789',
          definition: 'Numerators',
    },
    dnom: {
          sample: '0123456789',
          definition: 'Denominators',
    },
    lnum: {
          sample: '0123456789',
          definition: 'Lining Figures: substitutes non-lining figures to lining figures',
    },
    zero: {
          sample: '0123456789',
          definition: 'Slashed Zero: substitute default 0 to a slashed form',
    },
    smcp: {
          sample: 'Aardvark Ablution Acrimonious Adventures Aeolian Africa Agamemnon Ahoy Aileron Ajax Akimbo Altruism America Anecdote Aorta Aptitude Aquarium Arcade Aspartame Athens Aurelius Avuncular Awning Axminster Ayers Azure Banishment Benighted Bhagavad Biblical Bjorn Blancmange Bolton Brusque Burnish Bwana Byzantium Cabbala Cetacean Charlemagne Cicero Clamorous Cnidarian Conifer Crustacean Ctenoid Culled Cynosure Czarina Dalmatian Delphi Dhurrie Dinner Djinn Document Drill Dunleary Dvorak Dwindle Dynamo Eames Ebullient Echo Edify Eels Eftsoons Egress Ehrlich Eindhoven Eject Ekistics Elzevir Eminence Ennoble Eocene Ephemeral Equator Erstwhile Estienne Etiquette Eucalyptus Everyman Ewen Exeter Eyelet Ezekiel Fanfare Ferocious Ffestiniog Finicky Fjord Flanders Forestry Frills Furniture Fylfot Garrulous Generous Ghastly Gimlet Glorious Gnomon Golfer Grizzled Gumption Gwendolyn Gymkhana Harrow Heifer Hindemith Horace Hsi Hubris Hybrid Iambic Ibarra Ichthyology Identity Ievgeny Ifritignite Ihre Ikon Iliad Imminent Innovation Iolanthe Ipanema Irascible Island Italic Ivory Iwis Ixtapa Iyar Izzard Janacek Jenson Jitter Joinery Jr. Jungian Kaiser Kenilworth Khaki Kindred Klondike Knowledge Kohlrabi Kraken Kudzu Kvetch Kwacha Kyrie Labrador Lent Lhasa Liniment Llama Longboat Luddite Lyceum Mandarin Mbandaka Mcintyre Mdina Mendacious Mfg. Mg Millinery Mlle. Mme. Mnemonic Moribund Mr. Ms. Mtn. Munitions Myra Narragansett Nefarious Nguyen Nile Nkoso Nnenna Nonsense Nr. Nunnery Nyack Oarsman Oblate Ocular Odessa Oedipus Often Ogre Ohms Oilers Okra Olfactory Ominous Onerous Oogamous Opine Ornate Ossified Othello Oubliette Ovens Owlish Oxen Oyster Ozymandias Parisian Pb Pd. Penrose Pfennig Pg. Pharmacy Pirouette Pleistocene Pneumatic Porridge Pp. Principle Psaltery Ptarmigan Pundit Pyrrhic Qaid Qed Qibris Qom Quill Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Salacious Sbeitla Scherzo Serpentine Sforza Shackles Sinful Sjoerd Skull Slalom Smelting Snipe Sorbonne Spartan Squire Sri Stultified Summoner Svelte Swarthy Sykes Szentendre Tarragon Tblisi Tcherny Tennyson Thaumaturge Tincture Tlaloc Toreador Treacherous Tsunami Turkey Twine Tyrolean Tzara Ubiquitous Ucello Udder Ufology Ugric Uhlan Uitlander Ukulele Ulster Umber Unguent Uomo Uplift Ursine Usurious Utrecht Uvula Uxorious Uzbek Vanished Vd. Venomous Vindicate Voracious Vrillier Vs. Vt. Vulnerable Vying Washington Wendell Wharf Window Wm. Worth Wrung Wt. Wunderman Wyes Xanthan Xenon Xiao Xmas Xonen Xray Xuxa Xylem Yarrow Ybarra Ycair Yds. Yellowstone Yggdrasil Yin Ylang Yours Ypsilanti Yquem Yrs. Ys. Ytterbium Yunnan Yvonne Zanzibar Zero Zhora Zinfandel Zone Zuni Zwieback Zygote',
          definition: 'Small Capitals: substitutes lowercase characters to small capitals',
    },
    c2sc: {
          sample: 'Aardvark Ablution Acrimonious Adventures Aeolian Africa Agamemnon Ahoy Aileron Ajax Akimbo Altruism America Anecdote Aorta Aptitude Aquarium Arcade Aspartame Athens Aurelius Avuncular Awning Axminster Ayers Azure Banishment Benighted Bhagavad Biblical Bjorn Blancmange Bolton Brusque Burnish Bwana Byzantium Cabbala Cetacean Charlemagne Cicero Clamorous Cnidarian Conifer Crustacean Ctenoid Culled Cynosure Czarina Dalmatian Delphi Dhurrie Dinner Djinn Document Drill Dunleary Dvorak Dwindle Dynamo Eames Ebullient Echo Edify Eels Eftsoons Egress Ehrlich Eindhoven Eject Ekistics Elzevir Eminence Ennoble Eocene Ephemeral Equator Erstwhile Estienne Etiquette Eucalyptus Everyman Ewen Exeter Eyelet Ezekiel Fanfare Ferocious Ffestiniog Finicky Fjord Flanders Forestry Frills Furniture Fylfot Garrulous Generous Ghastly Gimlet Glorious Gnomon Golfer Grizzled Gumption Gwendolyn Gymkhana Harrow Heifer Hindemith Horace Hsi Hubris Hybrid Iambic Ibarra Ichthyology Identity Ievgeny Ifritignite Ihre Ikon Iliad Imminent Innovation Iolanthe Ipanema Irascible Island Italic Ivory Iwis Ixtapa Iyar Izzard Janacek Jenson Jitter Joinery Jr. Jungian Kaiser Kenilworth Khaki Kindred Klondike Knowledge Kohlrabi Kraken Kudzu Kvetch Kwacha Kyrie Labrador Lent Lhasa Liniment Llama Longboat Luddite Lyceum Mandarin Mbandaka Mcintyre Mdina Mendacious Mfg. Mg Millinery Mlle. Mme. Mnemonic Moribund Mr. Ms. Mtn. Munitions Myra Narragansett Nefarious Nguyen Nile Nkoso Nnenna Nonsense Nr. Nunnery Nyack Oarsman Oblate Ocular Odessa Oedipus Often Ogre Ohms Oilers Okra Olfactory Ominous Onerous Oogamous Opine Ornate Ossified Othello Oubliette Ovens Owlish Oxen Oyster Ozymandias Parisian Pb Pd. Penrose Pfennig Pg. Pharmacy Pirouette Pleistocene Pneumatic Porridge Pp. Principle Psaltery Ptarmigan Pundit Pyrrhic Qaid Qed Qibris Qom Quill Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Ransom Rb. Rd. Renfield Rheumatic Ringlet Rm. Ronsard Rp. Rte. Runcible Rwanda Rye Salacious Sbeitla Scherzo Serpentine Sforza Shackles Sinful Sjoerd Skull Slalom Smelting Snipe Sorbonne Spartan Squire Sri Stultified Summoner Svelte Swarthy Sykes Szentendre Tarragon Tblisi Tcherny Tennyson Thaumaturge Tincture Tlaloc Toreador Treacherous Tsunami Turkey Twine Tyrolean Tzara Ubiquitous Ucello Udder Ufology Ugric Uhlan Uitlander Ukulele Ulster Umber Unguent Uomo Uplift Ursine Usurious Utrecht Uvula Uxorious Uzbek Vanished Vd. Venomous Vindicate Voracious Vrillier Vs. Vt. Vulnerable Vying Washington Wendell Wharf Window Wm. Worth Wrung Wt. Wunderman Wyes Xanthan Xenon Xiao Xmas Xonen Xray Xuxa Xylem Yarrow Ybarra Ycair Yds. Yellowstone Yggdrasil Yin Ylang Yours Ypsilanti Yquem Yrs. Ys. Ytterbium Yunnan Yvonne Zanzibar Zero Zhora Zinfandel Zone Zuni Zwieback Zygote',
          definition: 'Small Capitals From Capitals: substitutes lowercase characters to small capitals',
    },
};
var fontFormats = {
    truetype: 'ttf',
    opentype: 'otf',
}
// pulled from http://www.urtd.net/x/cod/source/words_language
var textDiacritics = {
    Afrikaansbén : 'gedefiniërde wél ongeëwenaard reliëfs wêreldstelsels té dáárom sinaïwoestyn lêer geïnteresseerd één geïllustreerde asiëoorlog rûe trôe wîe breëblaarwoude paleosoïkum bó sôre sjiïete vóór vêrste teëgestaan dáárom gesê appèl hê adéliepikkewyn pêrel dít óm geïgnoreer môre álle brûe sinaïwoestyn adéliepikkewyn ýs têre karotenoïede reënboognasie kwêvoël geëmigreer ónder hoëdrukgebiede kontinuïteit vóór mét',
    Albanianndriçoheshin : 'çrregullimeve malçan përgjithësisht çeku çshenjteronin këndvështrimi ndriçoheshin çnjerëzore qindvjeçarëve pasçlirimit kundërshtarëve qindvjeçarëve gjithçkaje nxënësit trashëgimisë shfrytëzohet zanatçinj çfarosje bashkëqendrorë përfaqësohet açuge gjashtëkëndore hopçe përafërsisht bashkëjetese qindvjeçarëve gjysmëboshtet bëmë trashëgimtarët termobërthamor përgjithësisht biçakçinjtë kuçedër ndërkombëtare shkencëtarët përgjithësisht përçueshmëri udhërrëfyesin gjithçkaje togë njëanshmërinë françeskanë katërmbëdhjetë qindvjeçarëve çmoheshin viçët shëndet thëologji nukleosintezës',
    Catalansiderúrgica : 'jurisprudència búfal circumstàncies taülejar forçaments perjudicaría retrocés creïble radionúclid específicament simbòlicament històricament nucleosíntesi paisatgística cuscús iodós oceàniques hàbitat bufó pràcticament metasèmia desplaçaments eriçar injúria filosòficament semidiàmetre herbívor astrofísica évol llaüt vinyòvol wàttmetre palpés enganxés matemàticament séquia aürt esporàdicament sanaüja poètic electrònica tacaé mormó abrevií nenúfar desfés defraudés periodístiques recórrer',
    Croatianizmeđu : 'priključenje brežuljkasti općeprihvaćena korčulanskom najsačuvaniji tisućgodišnjeg požrtvovnog obilježjima poistovjećuje olakšavanje stećci prvovjenčanog solženjicina tisućljećja bespomoćnost tkalčićeva snalažljivosti osvrćući leđnim tjelovježbom gradonačelnik najuočljivija uljepšavaju starogruojčice unutrašnjosti promidžbenom najznačajniji višestoljetnog podčinjena šižgorićevo dušobrižništvo raščlanjenosti nešto spužvarstvo ranokršćanske starožidovskog proglašavanje dušobrižništvo potčinjeni južnočakavskom najznačajniji špijuniranje između iznenađujućom prešućivanje najšumovitiji općeprihvaćena tuđmanom predškolskog',
    Czechčínská : 'připomínajících stáletekoucích zjednodušujících křivoklátsko maďarština mnohobuněčných hú útesových instalatérské neúnavně přijď přistěhovalců ječmeni australopitéků údajnému nashromážděním narůžovělou elektromagnetická průčelí grónským viskóznější neuvěřitelných okamžitému bečvou smýšlejícími zrovnoprávnilo újezdu geofyzikálního předhůří jednoděložných nejjednodušší nevyžadují lživý matyášem neušlechtilý ústavodárného počátečního přírodovědecké průkaz jámy třífázové nejdůležitějších znázorňovány nejpravděpodobnější nejvýznamnější ptolemaiův obojživelníků komňa býložravci',
    Danishallerøstligste : 'saltvandsområde småøer idéindhold socioøkonomisk håndvasken påvirkning newzealænderen tiårige miljøændringer forudsætninger forudsætninger hovedårsagen masseuddøen vinnuháskúlin næringsstoffer jomfruøer overvågninger orkneyøerne miljøændringer slædepatruljen tronfølgeloven klippeørkener asteroidebælte tronfølgeloven solformørkelse råolie europæisk saltvandsområde træarter asteroidebælte søfiskeriet forhøjningerne shetlandsøerne atacamaørkenen transportbånd sammenhængende nettoændringen tyngdekræfter sammentrækning livsvilkårene kredsløbsbane fårene opdagelsesåret ildspåsættelse søhandelsvej månelandingen forårsjævndøgn yderligtgående kredsløbsbane',
    Dutcheénvandaag : 'dáár tetraëdrische scènes oöiden fryslân mineraloïden dáár geïnteresseerd tröckener führer netcoördinator matthäus cocaïnegebruik stracké tetraëdrische thérèse poëzie geëerbiedigd régime máxima jè reliëftypes sébastien schröderhuis sébastien dààr föhn geïrrigeerd yanomamömannen geëxploiteerd zó bètadeeltjes geïmporteerde synapomorfieën netcoördinator geïoniseerde roodcrème saarbrücken triëste indiëvaarders méér fryslân chambéryzomer eénvandaag luïciüs daarvóór hawaïaanse géén schröderhuis',
    Estonianešelon : 'sõbralikumad vähestabiilsed küpsetuspulber lepingusätteid polüetüleenil krediitühisuse föderatsiooni päikeseööpäeva päikeseööpäeva fetišism kuulmishäireid hõimurahvaste tööarmeed ülevenemaaline žürii basaltbretšaks bolševistlikul ristisõdijatel linaäärne piirikõveriku mõjusfäärideks žurnalist hääleõiguslike pärisinimeseks gümnaasiumit näidissovhoosi hüperaktiivsed büroo antifašistlik höövel maastikuüksust rahvusköökide põllumajanduse akaatsiaõunaks šikk šarlatan väävliühendid komandör kõrgõzstan ketšupit kogukonnavärav žongleerivad teraseühenduse õhutemperatuur vandetõotuse šlakiline tsüanobakterid ligipääsematus väljajätmisel',
    Finnishbassoäänien : 'syväuomaisia västeråsin bolševikeilta koneöljy mårtenson käyttökohteita yhteislähdöstä lämpöenergiana ingušia näyttelijöistä radiohäiriöitä mantšurian böömissä elinkeinoelämä yksilöllisesti käyttökohteita ståhlberg yhteislähdöstä ulkonäöltään hedelmöittävät gråböle löfvingin snežnogorskin pääaineksenaan käyttökohteita nižni rehevöitymistä radiohäiriöitä merkittävimmät mårtenson käytännöllinen rahamääräisenä valtionpäämies bäckström myöhäisbarokin järjestelmässä šintolaisia värähtelykulma yöbussi hägglundin pääkaupungissa lainsäädäntöä jyrängönvirta pašša merkittävimmät tummasolusyöpä järjestelmässä polttoöljyä långnäsiin',
    Frenchdéfinitivement : 'soulèvement infâme coûteusement mœurs intercèdent münster interprètent mûrissement prolégomènes mâle agroécologie parallèlement haïfa maïakovski reçoivent tchaïkovski vêpres prézygotiques constituées préhistoriques sûrement hallucinogènes océanographie sîn prolifération intermédiaires hallucinogènes nivôse recueillît coûteusement vœux diplômés sûrement épîtres nævus renâclent considèrent héphaïstos phénoménologie âgée grünen gâchette haïr infâme hakkôda sensô crânes décroître interviewés',
    Germanschweißdrüse : 'dänemark energieströme wüstengebiete ausgeübt großbritannien flussmündung veröffentlichung schöngeistig dritthäufigste prüfungsfragen großwild cöllnisch möglichkeit frischkäse programmäquivalenz düker dreißigjährige gräser religiös füße magnesiumstäbe unregelmäßig färöisch fließrichtung einschließlich dreizehenmöwe cünzer makroökonomie prävention ursprünglich nadelwälder gartenschläuche südlich großtechnisch ruderfußkrebs färöer baumstämme fließfähigkeit jüdisch unpässlichkeit trägheit aufspüren ursprünglich lageänderung neueröffnung oberösterreich nördlich wärmestrahlung schönheit',
    Hungarianlávaömlésekkel : 'tengerszinttől elmozdításakor koncentrációja zsiradékmentes ötvözőelemként síkfelületeken kompozíciókkal átlagmagasságú síita szűcsné hozzájuthatott makroszkóposan kidolgozásával hagyományokkal szivattyútelep hüllőmedencéjű napraforgóolaj ígéretekkel refúgiumokban visszaútjukon indexásványok szilikátköpeny tájékoztatásra ellenállásának déligyümölcsök kedvezőtlenül járműparkját hasadékvölgyek szükségtelenné hitelesítették törpebolygónál laboratóriumok szurdokpüspöki homokdűnékkel ellenállásának zsúfoltságának württembergből kiűzésének ívhegesztésben elnökjelöltjét hajóutakon összefüggésben vonatkozásában esőcseppekben irányítótorony soknemzetiségű bolygószerűnek összefüggésben végeredményben',
    Icelandicnúningskraftar : 'kafbátur pýþagóras pílukast viðskiptafræði indíáni landamæri nýgrísku boðorð pétur kjördæmaskipan apolloníos hernaðarátökum pýþagóras vesturevrópskt íþróttir góður hléi mínóísk bergþór nauðungarsölur sköpun íslandsbyggðar gúllas nýlendutímanum menningarsvæði skipaútgerð óásættanlegt matthíasdóttir gýgur flúoríða stjörnuvísindi arabíuskagi guðmundur abkhazía tækniþróun fátækrarmörkum pýrenea eðlisfræði joðíð landamæralaust óútkljáð hálfdrættingur andspænis kvöldþáttarins stjórnmálamenn sýndarþvermál féegg þörungar miðflóttaáhrif',
    Italiancontribuì : 'décolleté trasferì conservò embé ragù considerò sottolineò Dasà regalìa rappresentò continuò marajà foà glacière katmandù pavé màrtiri ohibò princìpi pètsà cefalù spécialisé promodès addàusə ahimè concepì fuggì sèvres sofà bohémien caratterizzò altresì puó partecipò acconsentì pubblicò déja privée averroè autodefinì belzebù mondovì réunion schiavitù ciò pelè manzù habitué trasformò',
    Latviangorbačovs : 'dienvidķīnas lūsis jūraszvaigznēm kaķveidīgajos žečpospoļitas patēriņš augšžoklis sņežana ņūfaundlendas dūņainu pārstāvniecība gīza maģāru ziemeļīrijas ceļvedis novadšļūdoņi saīsinājumu ogļūdeņražiem atpakaļceļā piemaisījums ūdenstūristiem varžzobji pūciņa jēriņš impīčmentu apakškomisiju ziemeļamerikas meteoroloģisko fīrers visdažādākie sirdsapziņas reģeneratīviem ziemeļkurzemes paradīze koraļļiem jūraszvaigznēm poētiskos profesionāļiem privātuzņēmums nīderlandietis zvaigžņveidīga republikāņiem aizsargvaļņus ņūorleānu hercšprunga ģeofiziskajiem latīņameriku evanģēliski vientuļnieces',
    Lithuaniankalnagūbriai : 'administraciją žvėrininkystės ramūnėlės kūjagalvis nebegrįžtamas viršutiniame rimševičienė dievogarbą konservatyvūs daugialąsčiai geležinkelį jūreivystė džiazą posėdžiavusios pasižyminčioje kunigaikštystė stulginskį išsidėsčiusios įnagininkas suvažiavusiųjų savarankiškumą landsbergį įeinančią pranašaujama žmogžudysčių užsiėmimas tūkstantmetyje pasipriešinimo pasitaikydavę nebegrįžtamas džiūgaujančios administracinį nenutrūkstamos landšaftinio įcentrinimo įspūdingiausių miloševičiaus susiję bučkis smailiaviršūnė ginčų laivų išhermetinamas gelžbetoniniai įprastinėmis nepaklūstantys cenzūruojamas jėzuitais atšiauresnis',
    Maltesekompożizzjoni : 'diverġenti wħud meħtieġa kalċju diffiċli imraddà iżvolġiment dħalt jissejjaħ ġeografikament ġliem gżejjer ażerbajġan magħrufin jaħkmu jikkawżaw jċempel ħerżegovina imġiegħel diġà kartaġni dġhif merħija jispeċjalizza isħubija ġwież ħsibijietu proviżta ġesù rappreżentanza bżonnijiet kċina reġistrati jixħet jitħallsu paramaetiċi oriġinarjament illużjonijiet ħbieb lħaqna prinċipalment megħjuna żfin paramaetiċi verżjonijiet eċċentriċità każakistan jsejħulha ażerbajġan',
    Norwegianvåtmarksområde : 'snøalgene svenskspråklig karbonkretsløp krigserklæring sjåføren milepæler vanskeliggjør vægelsindede båhuslen obskøniteter biologiøkonomi muséhagen høyoppløselige fredsvilkårene jaktfølgesvenn kjærligheten vidaregåande konsertpaléet pygméer forhåndsstøtte sentralområdet soberanía utenforstående markedsøkonomi glælognskvida nyåndelige højer leidangsflåte væraktiviteter træet sekundærradar tromsøgodset stjernefødsler kvartærgeologi italienskfødte sjøforsvaret bodøområdet éngangs sjøheimevernet klæbu landnåmabok makroøkonomisk påskjønnelse kvartærgeologi spøkelsesaktig stratosfæren snøballer markedsøkonomi rentebærende',
    Polishprzywilejów : 'ćwierćfinale rozluźnienie właściwościami skarłowaciałe przeobrażający młodzieńczych przyjeżdżają choćby dwójłomnym rybołówstwo współpracę więźniowie społeczeństwem głąbińskiego prośbą nieodłącznym właściwościami przeciwieństwo zróżnicowanych męczenników sędziówponad niedostępności mścisław wyodrębnionych zaprzysiężenia podchorążówka najsłynniejsze długotrwałego gąsienicowe bakteriobójcze rozciągających śródgórskimi wypowiedzieć równoleżnikowa zapoczątkowały przekształcana przyciągnięcia łomżyński contratación historiografów zgęszczające częstokroć przepłynął udokumentowaną przeciążonego odśrodkowych objętościowej górnośląskiej przeobrażeniom',
    Portuguesealçaprema : 'almóadas sânscrito constituíam enciclopédia atlântica óleo açúcar hiperbólica antipática minúscula protuberância período filosófica adaúfe basáltico diário revolucionária limítrofe às insolúvel genético sobrevivência pôr predominância aúde bênção barômetro transformações teína esquematização alcoólico afeganistão permeável mê castelões arquitetônico reóforo oceânico órfãos astronómicos vôo imprevisível metalúrgica alfandegária gôndola padrão gráfica xícara cinturões',
    Romanianîncurajând : 'dobândește șliboviță susținătorii isarlâk nușfalău batanovți schimbărilor interpretările preoților văcăreștilor măsurătorilor străinătate râfov desfășor nutriționiști tablî gospodăriilor gâdilătură kârgeali învățământului dușmanilor gravitațională râzând hârtiilor covârșitoare neregularități împrejurările întâmpinați învățământului nemaiîntâlnite landșafturi manifestările postăvar gravitațională complexă lupșa îl caracteristică prăjituri maramureșului creând sazîkin însușirilor descîntoteca românia stăpânitorii mediteraneeană bolșevicilor bașburun',
    Slovakzalesňované : 'vinič zrážkomer nehorľavý pasterňák súľovských päťpodlažný vzdialenejších atmosférických samourčovacie vergílius pristáť pridržiavaná spolupôsobí lúpežníckych spoluúčasti súradniciach zväčšujúcou najrýchlejšie nezamŕzajúce príbuznosti záujmovým najrôznejších najďalej rómštiny šmirgľového svätoplukova odpočítavanie červenohnedý kontinentálnej zaujímavých sústreďovať šálkou deväťdesiatych črepinami novozaloženého najobľúbenejší zoochória odtiaľto severovýchodne sánkovačka spracovateľský vrakuňa najjednoduchší okamžitej poďakoval desaťtisíckrát zákonodarstva najťažších ostrorohého',
    Slovenianječmen : 'požigalništvo grosupeljčan najpopolnejših večfunkcijska priključevati predkrščanskih priključitev višješolsko bratislavčane marža stožčast vžigaličen občudovanje najpomembnejša večdnevna obračunavanje večstrankarske praslovanščina domžale olepševa preprečujejo upodabljajočo prezadolženost koncentrično nepremočljive uravnoteženo špediter ponemčevanje neandertalčeva lombardščina najuspešnejših odžvepljevalne privlačnost portugalščina predstavniško razširjenost večplastnost mehčanje večceličnost načrtovanje poslabševati učbenik križpotja južnoslovanski podčastnik družba korošci prekupčevalci obžalovanje',
    Spanishvértices : 'paisajísticos minúsculas enciclopédico característico metamórficas lambeosáuridos sahagún húngaros precientíficos hispanoárabe marroquíes péptidos nítidamente atribuírsele cuadrúpedos meteorológicos aéreos estereofónicas almuñécar eléctricamente semiesférico ibáñez diezmilésima fisicoquímicas pitagóricos hiperbólica pekín interpretación íñigo lingüísticas pirenáico caracterizó monoteístas níjar júpiter lingüistas fisicoquímicas metalúrgicos océanos múltiples constituyó eclesiástico reúnen débilmente termoacidófila púgil electrolíticas interpretación yukón',
    Swedishplånböcker : 'lösning bronsålderns über kanarieöarna logårdstrappan vidhäftningar kupé prästerskap träpaviljongen snöbollsjorden militärområden armégrupp genève kritikersuccé orkneyöarna fördragsbunden upprätthållas solförmörkelse återanknytning havssänka fångtransport östersjökusten württemberg näringskedjor båtgravsfynden depåer sammansättning jävig linnéanum förbundsländer bayerskspråkig påverkad würst oöverträffat låglandsregion iögonfallande sexårsåldern sápmi hjälmarebygden herjárdalr tillväxtpakten klippmålningar småbåtshamnar östersjökusten åderbråck taiganäbbmus lagkonståkning teaterregissör asteroidbältet',
    Turkishağzından : 'araöznellik başpiskoposluk dipçiklenerek tüberkülozdan çokkültürlülük parçacıklardan acıöz mücadelelerine düşünülüyordu alışverişinin öldürüldüğünde nizâmnâmesi imparatorluğa çürütmüşlerdir çözülmesinde dönüşümleridir merkezîleşme iktisadî meşrulaştırdı jönlerinden bolşeviklerle şekillendirdi eşyıldızından dönüştürmektir göğsüne kâşif gösterdiğinden büyükşehirler fotoğrafçılık miğfer hükümetlerine haricîlerin uğraşıyorlardı milliyetçilik sıçramalarının çiğnenmiştir tarihöncesi birleşiklikten spiritüalizm düşüncelerinin direktörlüğünü dişhekimliği bağımsızlığını entelektüeller büyükelçisinin direktörlüğünü hikâyelerden böbreklere dönüştürmüştür',
};

var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
var utcNoSlash = new Date().toJSON().slice(0,10).replace(/-/g,'');

function setStage(stage) {
      var layoutGroups = ["overview", "spacing", "trio"];
      for (i in layoutGroups) {
            var item = layoutGroups[i];
            var innerText = text[ stage ][ item ];
            document.getElementById('section__proofing-'+item).innerHTML = innerText;
            var textClass = whichFontSize(innerText);
            document.getElementById('section__proofing-'+item).classList.add(textClass);
      }
}
function whichFontSize(thisString) {
      var charCount = thisString.length;
      if (charCount < 25 ) {
            return "t__size-xxl";
      } else if (charCount < 50 ) {
            return "t__size-xl";
      } else if (charCount < 95) {
            return "t__size-l";
      } else if (charCount < 200 ){
            return "t__size-m";
      } else if (charCount < 1000 ){
            return "t__size-s";
      } else {
            return "t__size-xs";
      }
}
function isVariableFont() {
    if (font.tables["fvar"]) {
        return true;
    } else {
        return false;
    }
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function removeElementsByID(IDName){
    document.getElementById(IDName).outerHTML = "";
}
function addTypeSettingTools(isVariableFont) {
    var testarea = document.getElementsByClassName("testarea");
    removeElementsByClass("sliders");
    removeElementsByClass("add-item-above");

    for(var i = 0; i < testarea.length; i++) {
        var testAreaID = testarea[i].id;
        var sliderID = testAreaID.trim()+'-slider';
        var testAreaParent = document.getElementById(testAreaID).parentNode.id;
        var html = '<span class="add-item-above"><button onclick="insertField(\''+testAreaParent+'\')">+</button></span>';
        html += '<span class="sliders">';
        //font size
        var testAreaElement = document.getElementById(testAreaID);
        var testAreaStyle = window.getComputedStyle(testAreaElement);
        var testAreaFontSize = testAreaStyle.getPropertyValue('font-size').replace('px', '');;
        html += '<label for="'+sliderID+'-fontsize">Font Size</label><input type="text" id="'+sliderID+'-fontSize-val" value="'+testAreaFontSize+'"><input id="'+sliderID+'-fontsize" type="range" min="2" max="160" step="4" value="'+testAreaFontSize+'" oninput="passStyleValue(\''+testAreaID+'\', \'fontSize\', this.value)">';
        //line height
        html += '<label for="'+sliderID+'-lineheight">Line Height</label><input type="text" id="'+sliderID+'-lineHeight-val" value="'+lineHeight+'"><input id="'+sliderID+'-lineheight" type="range" min="0.6" max="5.0" step="0.05" value="'+lineHeight+'" oninput="passStyleValue(\''+testAreaID+'\', \'lineHeight\', this.value)">';
        //letterspacing
        html += '<label for="'+sliderID+'-letterspacing">Letter Spacing</label><input type="text" id="'+sliderID+'-letterSpacing-val" value="'+letterSpacing+'"><input id="'+sliderID+'-letterspacing" type="range" min="-0.4" max="0.4" step="0.01" value="'+letterSpacing+'" oninput="passStyleValue(\''+testAreaID+'\', \'letterSpacing\', this.value)">';
        testarea[i].classList.add("hastools-basic");
        if (isVariableFont) {
            var fvarSupport = [];
            for (var a in font.tables.fvar.axes) {
                  var tag = font.tables.fvar.axes[a].tag;
                  fvarSupport.push(tag);
            }
            for (var b in font.tables.fvar.axes) {
                var min = font.tables.fvar.axes[b].minValue;
                var max = font.tables.fvar.axes[b].maxValue;
                var tag = font.tables.fvar.axes[b].tag;
                var name = font.tables.fvar.axes[b].name.en;
                var defaultValue = font.tables.fvar.axes[b].defaultValue;
                html += '<label for="'+sliderID+'-'+tag+'">'+name+'</label><input type="text" id="'+sliderID+'-'+tag+'-val" value="'+defaultValue+'"><input id="'+sliderID+'-'+tag+'" type="range" min="'+min+'" max="'+max+'" value="'+defaultValue+'" oninput="passfvarValue(\''+testAreaID+'\', \''+tag+'\', this.value, \''+fvarSupport+'\')">';
                testarea[i].classList.remove("hastools-basic");
                testarea[i].classList.add("hastools-fvar");
            }

        }
        html += '<button onclick="removeElementsByID(\''+testAreaParent+'\')">-</button>';
        html += '</span>';
        testarea[i].insertAdjacentHTML('beforebegin', html);
        if (isVariableFont) {
            for (var b in font.tables.fvar.axes) {
                  var tag = font.tables.fvar.axes[b].tag;
                  var defaultValue = font.tables.fvar.axes[b].defaultValue;
                  passfvarValue(testAreaID, tag, defaultValue, fvarSupport);
            }
        }
    }
}

var fieldcount = 0;
function insertField(aboveHere) {
    fieldcount += 1;
    document.getElementById(aboveHere).insertAdjacentHTML('beforebegin',
    '<div id="item--'+fieldcount+'" class="item"><div id="section__proofing-'+fieldcount+'" class="page-break-before t__importedfontfamily testarea" contenteditable="true">'+textPangram[fieldcount]+'</div></div>');
    addTypeSettingTools(isVariableFont());
}

function passStyleValue(id,property,value) {
      document.getElementById(id+"-slider-"+property+"-val").value=value;
      if (property === "fontSize") {
          value = value+"px";
      } else if (property === "letterSpacing") {
          value = value+"em";
      }
      document.getElementById(id).style[property] = value;
}
function passfvarValue(id,property,value,fvarSupport) {
      document.getElementById(id+"-slider-"+property+"-val").value=value;
      if (!(Array.isArray(fvarSupport))){
            fvarSupport = fvarSupport.split(',');
      }
       var fvarcss = "";
       if (fvarSupport.length == 1) {
             fvarcss += "'"+property+"' "+value+" ";
      } else {
            for (f = 0; f < fvarSupport.length; f++) {
                   if (property == fvarSupport[f]) {
                        fvarcss += "'"+property+"' "+value;
                  } else {
                        var fvalue = document.getElementById(id+"-slider-"+fvarSupport[f]).value;
                        fvarcss += "'"+String(fvarSupport[f])+"' "+fvalue;
                  }
                  if (f != fvarSupport.length - 1) {
                        fvarcss += ", ";
                  }
             }
      }
      $('#' + id).css('font-variation-settings', fvarcss);
}
function displayFontData(fontFamily) {

    var tablename, table, property, value, tag;
    var styles = '';

    for (tablename in font.tables) {
        table = font.tables[tablename];
        // Inserting header data: font name, foundry name, etc.
        if (tablename === 'cmap') {
            for (property in table) {
                var cmapVals = table[property];
                if (property === "length") {
                    if (cmapVals <= 100 ) {
                        window.proofingPhase = 1;
                    } else if (cmapVals >= 400 ) {
                        window.proofingPhase = 3;
                    } else {
                        window.proofingPhase = 2;
                    }
                }
            }
            setStage(window.proofingPhase);
        }
        var fontFormat = font.outlinesFormat;
        fontFormat = fontFormats[fontFormat];
        if (tablename === 'name') {
                nameHtml = '';
                if (font.names.designer) {
                    var designerName = font.names.designer.en;
                } else {
                    var designerName = "Designer Name";
                }
                if (font.names.postScriptName) {
                    var postScriptName = font.names.postScriptName.en;
                } else {
                    var postScriptName = "Font Name";
                }

                nameHtml += '<h6 class="h6 section__header-name u__flex-grow-1 t__left" contenteditable="true">'+designerName+'</h6>';
                nameHtml += '<h6 class="h6 section__header-name u__flex-grow-1 t__center" contenteditable="true">'+postScriptName+'</h6>';
                styles += '.t__importedfontfamily { font-family: "'+fontFamily+'" }';
                nameHtml += '<h6 class="h6 section__header-name  u__flex-grow-1 t__right">'+utc+'</h6>';
                document.getElementById('section__header-names').innerHTML = nameHtml;
                continue;
        }
        // Generating font feature proofing section
        var featuresHtml = '';
        if (tablename === 'gsub') {
            var featuresList = document.getElementById("section__proofing-feature");
            for (property in table) {
                if (property  === 'features') {
                    value = table[property];
                    if (Array.isArray(value) && typeof value[0] === 'object') {
                        featuresHtml += '<h2 class="h2">Font Features</h2>';
                        var taglist = [];
                        for (var i in value) {
                            var tag = value[i].tag;
                            taglist.push(value[i].tag);
                        }
                        taglist = preserveUnique(taglist)
                        for (var i in taglist) {
                            var tag = taglist[i];
                            styles += '.proofing__feature-'+tag+' { font-feature-settings: "'+tag+'" 1;}';
                            if (tag === "aalt" || tag === "ccmp") {
                               continue;
                            } else if (textFeature[tag]) {
                              var textClass = whichFontSize(textFeature[tag].sample);
                               featuresHtml += '<div id="item--'+tag+'" class="item "><h3 class="h3">'+tag+' <span class="tooltip tooltip__features">'+textFeature[tag].definition+'</span></h3><div id="proofing__feature-'+tag+'" contenteditable="true" class="t__importedfontfamily '+textClass+' testarea proofing__feature-'+tag+'">'+textFeature[tag].sample+'</div></div>';
                            } else if (tag.includes("ss")) {
                               var textClass = whichFontSize(textLetters);
                               featuresHtml += '<div id="item--'+tag+'" class="item "><h3 class="h3">'+tag+' <span class="tooltip tooltip__features">Stylistic Set</span></h3><div id="proofing__feature-'+tag+'" contenteditable="true" class="t__importedfontfamily '+textClass+' testarea proofing__feature-'+tag+'">'+textLetters+'</div></div>';
                            } else {
                               var textClass = whichFontSize(textLetters);
                               featuresHtml += '<div id="item--'+tag+'" class="item "><h3 class="h3">'+tag+'</h3><div id="proofing__feature-'+tag+'" contenteditable="true" class="t__importedfontfamily '+textClass+' testarea proofing__feature-'+tag+'">'+textLetters+'</div></div>';
                            }
                        }
                    }
                }
            }
            featuresList.innerHTML = featuresHtml;
        }
    }
    $("#style__opentype-features").html(styles);
    addTypeSettingTools(isVariableFont());
}

function preserveUnique(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}

function onFontLoaded(font, fontFamilySource, fontFamily) {
    window.font = font;
    var binaryData = [];
    binaryData.push(font);
    window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
    window.fontFamily = fontFamily;

    // Do the actual proofing build
    displayFontData(fontFamily);
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "") {
          //Remember selection for local livereload
          //Was searching for uploaded server version fonts otherwise
          localStorage.setItem("fontFamily", fontFamily);
          localStorage.setItem("fontFamilySource", fontFamilySource);
    }


}

function showErrorMessage(message) {
    var el = document.getElementById('message');
    if (!message || message.trim().length === 0) {
        el.style.display = 'none';
    } else {
        el.style.display = 'block';
    }
    el.innerHTML = message;
}

// taken from axis-praxis.org
function uint8ToBase64(buffer) {
     var binary = '';
     var len = buffer.byteLength;
     for (var i = 0; i < len; i++) {
         binary += String.fromCharCode(buffer[i]);
     }
     return window.btoa( binary );
}

function onReadFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            var font = opentype.parse(e.target.result);
            var fontFamily = font.names.postScriptName.en;
            var fontFamilySource = "fonts/"+font.names.postScriptName.en;
            onFontLoaded(font, fontFamilySource, fontFamily);

            // store info about the file
            font.file = {
                name: e.name,
                lastModified: e.lastModified,
                size: e.size,
                type: e.type,
            };
            font.type = "user:local";

            var tempUint8array = new Uint8Array(e.target.result);
            $("#style__fontface").html("@font-face {font-family:'" +window.fontFamily+ "'; " + "src: url('data:;base64," + uint8ToBase64(tempUint8array) + "') format('truetype');} ");
            showErrorMessage('');
        } catch (err) {
            showErrorMessage(err.toString());
            if (err.stack) console.log(err.stack);
        throw(err);
        }
    };
    reader.onerror = function(err) {
        showErrorMessage(err.toString());
    };
    reader.readAsArrayBuffer(file);
}
function isFontVariable(font) {
    if (font.axes) {
        return true;
    } else {
        return false;
    }
}
function setFont(fontFamilySource, fontFamily) {
    opentype.load(fontFamilySource, function(err, font) {
                onFontLoaded(font, fontFamilySource, fontFamily);
            });
}


window.onload = function() {
    var fileButtonParent = document.getElementById('section__header-file-buttons');

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "") {
        // local
        document.getElementById('section__header-file-buttons').innerHTML = 'Export fonts into <code>/fonts</code> to begin proofing ';
        var html = '';
        var style = '';
        var allFontFilesInFolder = '';
        $.get( "../txt/fonts.txt", {}, function( data ) {
            allFontFilesInFolder = data.split("fonts/");
            var fonts = [];
            for(var a=0; a<allFontFilesInFolder.length; a++) {
                if (allFontFilesInFolder[a] != "") {
                    thisFont = allFontFilesInFolder[a].trim();
                    fonts.push(thisFont);
                }
            }
            preserveUnique(fonts)
            for(var a=0; a<fonts.length; a++) {
                  thisFontSource = fonts[a];
                  thisFontFamily = thisFontSource.replace('.', '-');
                  html += '<button class="btn btn__setfont" id="btn__setfont-'+thisFontFamily+'" onclick="setFont(\'fonts/'+thisFontSource+'\', \''+thisFontFamily+'\')">'+thisFontSource+'</button>';
                  style += '@font-face { font-family: "'+thisFontFamily+'"; src: url("fonts/'+thisFontSource+'");}';
            }
            fileButtonParent.innerHTML = html;
            if (localStorage.getItem('fontFamilySource')) {
                  var fontFamilySource = localStorage.getItem('fontFamilySource');
                  var fontFamily = localStorage.getItem('fontFamily');
                  setFont(fontFamilySource, fontFamily);
            } else {
                      setFont("fonts/"+fonts.slice(-1)[0], thisFontFamily);
            }
            $('#style__fontface').append(style);
        }, "text");

    } else {
            // server
            // set first load as gooper
            setFont('fonts/gooper-VF.ttf', 'gooper-VF-ttf');
            $('#style__fontface').html('@font-face { font-family: "gooper-VF-ttf"; src: url("fonts/gooper-VF.ttf");}');
            // watch for user upload
            fileButtonParent.innerHTML = '<input id="fontInput" type="file"><div id="message"></div>';
            var fileButton = document.getElementById('fontInput');
            fileButton.addEventListener('change', onReadFile, false);
    }
    //Active button toggles
    $('#section__header-file-buttons').on('click', '.btn__setfont', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('#section__header-stage-buttons').on('click', '.btn__setfont', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('#btn__view-tools-toggle').on('click', function(e) {
        $('.body__idiotproofed').toggleClass("tools-visible");
    });
}
