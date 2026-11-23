/* Islamic Google — curated data.
   Every directory URL is HTTP-checked before release (see README). */

const CATEGORIES = [
  { id:'quran',     label:'Qur’an & Tafsir' },
  { id:'hadith',    label:'Hadith' },
  { id:'learn',     label:'Learning' },
  { id:'channels',  label:'Channels' },
  { id:'apps',      label:'Apps' },
  { id:'library',   label:'Libraries' },
  { id:'charity',   label:'Charity & Zakat' },
  { id:'family',    label:'Family & Kids' }
];

const DIRECTORY = [
  /* ---------- Qur'an & Tafsir ---------- */
  {n:'Quran.com', u:'https://quran.com', c:'quran', t:'site', d:'Read, listen and study with 100+ translations and tafsir.'},
  {n:'Quran.com Tafsir', u:'https://quran.com/tafsirs', c:'quran', t:'site', d:'Classical and modern tafsir side by side with the ayah.'},
  {n:'AlQuran Cloud API', u:'https://alquran.cloud', c:'quran', t:'api', d:'Free Qur’an text, translations and audio. Powers this site.'},
  {n:'Tanzil Project', u:'https://tanzil.net', c:'quran', t:'site', d:'Carefully verified Qur’an text in many recitations and scripts.'},
  {n:'Quran Enc', u:'https://quranenc.com', c:'quran', t:'site', d:'Reviewed translations in many languages by scholars.'},
  {n:'Quran WBW', u:'https://quranwbw.com', c:'quran', t:'site', d:'Word-by-word Qur’an with grammar and transliteration.'},
  {n:'Tafsir.app', u:'https://tafsir.app', c:'quran', t:'site', d:'Ibn Kathir, Tabari, Qurtubi and more, searchable.'},
  {n:'Al-Tafsir', u:'https://www.altafsir.com', c:'quran', t:'site', d:'Large archive of classical tafsir and Qur’anic sciences.'},
  {n:'MP3 Quran', u:'https://mp3quran.net', c:'quran', t:'audio', d:'Recitations by hundreds of reciters, downloadable.'},
  {n:'Every Ayah', u:'https://everyayah.com', c:'quran', t:'audio', d:'Ayah-by-ayah audio files used by many Qur’an apps.'},
  {n:'Quran Central', u:'https://qurancentral.com', c:'quran', t:'audio', d:'High quality recitations with a clean player.'},
  {n:'Qur’an Reflect', u:'https://quranreflect.com', c:'quran', t:'community', d:'Shared reflections on ayat, moderated.'},

  /* ---------- Hadith ---------- */
  {n:'Sunnah.com', u:'https://sunnah.com', c:'hadith', t:'site', d:'Bukhari, Muslim, the Sunan and more with reference numbers.'},
  {n:'Sunnah.com Search', u:'https://sunnah.com/search', c:'hadith', t:'tool', d:'Search the wording of a narration across collections.'},
  {n:'Hadith of the Day', u:'https://hadithoftheday.com', c:'hadith', t:'site', d:'One narration a day with commentary.'},
  {n:'IslamHouse', u:'https://islamhouse.com', c:'hadith', t:'library', d:'Books, translations and articles in over 100 languages.'},
  {n:'Dorar.net', u:'https://dorar.net', c:'hadith', t:'site', d:'Arabic hadith grading and takhrij reference (Arabic).'},

  /* ---------- Learning ---------- */
  {n:'SeekersGuidance', u:'https://seekersguidance.org', c:'learn', t:'institute', d:'Free courses and answers with qualified teachers.'},
  {n:'Yaqeen Institute', u:'https://yaqeeninstitute.org', c:'learn', t:'institute', d:'Research papers and series on faith and contemporary life.'},
  {n:'Bayyinah TV', u:'https://bayyinah.tv', c:'learn', t:'institute', d:'Arabic and Qur’an study with Nouman Ali Khan.'},
  {n:'Al-Maghrib Institute', u:'https://www.almaghrib.org', c:'learn', t:'institute', d:'Structured seminars on aqeedah, fiqh and seerah.'},
  {n:'Qalam Institute', u:'https://qalam.institute', c:'learn', t:'institute', d:'Seerah, hadith sciences and teacher training.'},
  {n:'Safina Society', u:'https://safinasociety.org', c:'learn', t:'institute', d:'Traditional learning and community classes.'},
  {n:'Zaytuna College', u:'https://www.zaytuna.edu', c:'learn', t:'institute', d:'Accredited Muslim liberal arts college in California.'},
  {n:'Islamic Online University', u:'https://www.islamiconlineuniversity.com', c:'learn', t:'institute', d:'Free and low cost degree and diploma programmes.'},
  {n:'Albalagh', u:'https://www.albalagh.net', c:'learn', t:'institute', d:'Articles and courses on Islamic thought.'},
  {n:'The Firsts (Yaqeen series)', u:'https://yaqeeninstitute.org/watch/series/the-firsts', c:'learn', t:'series', d:'A detailed, sourced life of the Prophet ﷺ.'},
  {n:'Tajweed rules', u:'https://tajweed.me', c:'learn', t:'course', d:'Recitation rules explained with audio examples.'},

  /* ---------- Channels ---------- */
  {n:'Bayyinah', u:'https://www.youtube.com/@Bayyinah', c:'channels', t:'youtube', d:'Qur’an and Arabic explainers.'},
  {n:'Yaqeen Institute', u:'https://www.youtube.com/@YaqeenInstitute', c:'channels', t:'youtube', d:'Documentary style series on belief and history.'},
  {n:'SeekersGuidance', u:'https://www.youtube.com/@SeekersGuidance1', c:'channels', t:'youtube', d:'Weekly classes and Q&A.'},
  {n:'Mufti Menk', u:'https://www.youtube.com/@muftimenk', c:'channels', t:'youtube', d:'Reminders and tafsir, widely followed.'},
  {n:'Qalam Institute', u:'https://www.youtube.com/@QalamInstitute', c:'channels', t:'youtube', d:'Seerah and hadith classes.'},
  {n:'Safina Society', u:'https://www.youtube.com/@SafinaSociety', c:'channels', t:'youtube', d:'Traditional scholarship, plain language.'},
  {n:'Al-Maghrib', u:'https://www.youtube.com/@AlMaghrib', c:'channels', t:'youtube', d:'Seminar excerpts and short courses.'},
  {n:'The Firsts', u:'https://www.youtube.com/@TheFirsts', c:'channels', t:'youtube', d:'Stories of the earliest believers.'},
  {n:'Merciful Servant', u:'https://www.youtube.com/@MercifulServant', c:'channels', t:'youtube', d:'Reminders and Qur’an recitation.'},

  /* ---------- Apps ---------- */
  {n:'Quran by Quran.com', u:'https://quran.com/apps', c:'apps', t:'app', d:'Clean reader with audio, offline and tafsir.'},
  {n:'Muslim Pro', u:'https://www.muslimpro.com', c:'apps', t:'app', d:'Prayer times, qibla and Qur’an.'},
  {n:'IslamicFinder', u:'https://www.islamicfinder.org', c:'apps', t:'app', d:'Athan, qibla and mosque finder.'},
  {n:'Tarteel', u:'https://tarteel.ai', c:'apps', t:'app', d:'AI assisted Qur’an memorisation and recitation check.'},
  {n:'Quranly', u:'https://quranly.app', c:'apps', t:'app', d:'Daily Qur’an habit with streaks.'},
  {n:'Pillars', u:'https://pillarsapp.com', c:'apps', t:'app', d:'Prayer tracking and reminders.'},
  {n:'QuranFlash', u:'https://www.quranflash.com', c:'quran', t:'tool', d:'Page-flip Qur’an reader for memorisation.'},
  {n:'Muslim Kids TV', u:'https://muslimkids.tv', c:'apps', t:'app', d:'Cartoons and songs for young children.'},

  /* ---------- Libraries ---------- */
  {n:'Kalamullah', u:'https://www.kalamullah.com', c:'library', t:'library', d:'Free English books and lectures archive.'},
  {n:'Shamela', u:'https://shamela.ws', c:'library', t:'library', d:'Vast classical Arabic library, searchable (Arabic).'},
  {n:'Waqfeya', u:'https://waqfeya.net', c:'library', t:'library', d:'Scanned classical texts, free (Arabic).'},
  {n:'Internet Archive — Islamic texts', u:'https://archive.org/search?query=quran', c:'library', t:'library', d:'Scanned books and manuscripts.'},
  {n:'IslamHouse', u:'https://islamhouse.com/en', c:'library', t:'library', d:'Multi-language books reviewed for content.'},
  {n:'Hadith Collection', u:'https://hadithcollection.com', c:'library', t:'library', d:'Plain-text hadith sets for study and reference.'},

  /* ---------- Charity ---------- */
  {n:'Islamic Relief', u:'https://islamic-relief.org', c:'charity', t:'charity', d:'Emergency relief and zakat-eligible projects.'},
  {n:'Human Appeal', u:'https://humanappeal.org.uk', c:'charity', t:'charity', d:'Water, orphan and food programmes.'},
  {n:'Muslim Aid', u:'https://www.muslimaid.org', c:'charity', t:'charity', d:'International relief and development.'},
  {n:'Penny Appeal', u:'https://pennyappeal.org', c:'charity', t:'charity', d:'Small donation projects, zakat and sadaqah.'},
  {n:'LaunchGood', u:'https://www.launchgood.com', c:'charity', t:'platform', d:'Crowdfunding for Muslim-led projects.'},
  {n:'Zakat Foundation', u:'https://www.zakatfoundation.com', c:'charity', t:'charity', d:'Zakat policy and distribution.'},

  /* ---------- Family & community ---------- */
  {n:'IslamicFinder Athan', u:'https://www.islamicfinder.org/athan/', c:'apps', t:'app', d:'Athan, prayer alerts and mosque finder.'},
  {n:'Halal Trip', u:'https://www.halaltrip.com', c:'family', t:'travel', d:'Halal hotels, restaurants and prayer spaces.'},
  {n:'Zabihah', u:'https://www.zabihah.com', c:'family', t:'food', d:'Halal restaurant and butcher directory.'},
  {n:'Mosque & prayer finder', u:'https://www.islamicfinder.org/prayer-times/', c:'family', t:'tool', d:'Prayer times and masjid locations worldwide.'},
  {n:'Muslim Directory (GH)', u:'https://www.google.com/search?q=mosque+Accra+Ghana', c:'family', t:'tool', d:'Local masjid search for Ghana.'}
];

/* ---------- daily ayat ---------- */
const DAILY_AYAT = [
  {s:2, a:286, ar:'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا', en:'Allah does not burden a soul beyond what it can bear.', ref:'Al-Baqarah 2:286'},
  {s:94, a:6, ar:'إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا', en:'Indeed, with hardship comes ease.', ref:'Ash-Sharh 94:6'},
  {s:2, a:152, ar:'فَٱذْكُرُونِى أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ', en:'So remember Me and I will remember you, and be grateful to Me and do not deny Me.', ref:'Al-Baqarah 2:152'},
  {s:13, a:28, ar:'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ', en:'Surely in the remembrance of Allah do hearts find rest.', ref:'Ar-Ra’d 13:28'},
  {s:65, a:3, ar:'وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُ', en:'And whoever relies upon Allah, then He is sufficient for him.', ref:'At-Talaq 65:3'},
  {s:39, a:53, ar:'لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ', en:'Do not despair of the mercy of Allah.', ref:'Az-Zumar 39:53'},
  {s:3, a:139, ar:'وَلَا تَهِنُوا۟ وَلَا تَحْزَنُوا۟ وَأَنتُمُ ٱلْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ', en:'Do not lose heart nor grieve, for you will be superior if you are true believers.', ref:'Ali ’Imran 3:139'},
  {s:21, a:107, ar:'وَمَآ أَرْسَلْنَٰكَ إِلَّا رَحْمَةً لِّلْعَٰلَمِينَ', en:'And We have not sent you except as a mercy to the worlds.', ref:'Al-Anbiya 21:107'}
];

/* ---------- hadith ---------- */
const HADITH = [
  {t:'Actions are judged by intentions', ar:'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ', en:'Actions are only by intention, and every person will have only what he intended.', src:'Sahih al-Bukhari 1 · Sahih Muslim 1907', u:'https://sunnah.com/bukhari:1'},
  {t:'The best of you in character', ar:'إِنَّ مِنْ أَحْسَنِكُمْ أَخْلَاقًا', en:'The best among you are those who have the best manners and character.', src:'Sahih al-Bukhari 3559 · Sahih Muslim 2321', u:'https://sunnah.com/bukhari:3559'},
  {t:'Love for your brother', ar:'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', en:'None of you truly believes until he loves for his brother what he loves for himself.', src:'Sahih al-Bukhari 13 · Sahih Muslim 45', u:'https://sunnah.com/bukhari:13'},
  {t:'Speak good or stay silent', ar:'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', en:'Whoever believes in Allah and the Last Day, let him speak good or remain silent.', src:'Sahih al-Bukhari 6018 · Sahih Muslim 47', u:'https://sunnah.com/bukhari:6018'},
  {t:'Allah looks at hearts and deeds', ar:'إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ', en:'Allah does not look at your appearance or your wealth, but He looks at your hearts and your deeds.', src:'Sahih Muslim 2564', u:'https://sunnah.com/muslim:2564'},
  {t:'The strong one controls anger', ar:'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ', en:'The strong is not the one who overcomes people by his strength, but the one who controls himself while in anger.', src:'Sahih al-Bukhari 6114 · Sahih Muslim 2609', u:'https://sunnah.com/bukhari:6114'},
  {t:'Make things easy', ar:'يَسِّرُوا وَلَا تُعَسِّرُوا', en:'Make things easy and do not make them difficult, and give glad tidings and do not repel people.', src:'Sahih al-Bukhari 69', u:'https://sunnah.com/bukhari:69'},
  {t:'Consistency, even if small', ar:'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا', en:'The most beloved deeds to Allah are those done consistently, even if they are small.', src:'Sahih al-Bukhari 6464 · Sahih Muslim 783', u:'https://sunnah.com/bukhari:6464'},
  {t:'A Muslim is safe in speech and hand', ar:'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ', en:'A Muslim is the one from whose tongue and hand the Muslims are safe.', src:'Sahih al-Bukhari 10', u:'https://sunnah.com/bukhari:10'},
  {t:'Purity is half of faith', ar:'الطُّهُورُ شَطْرُ الْإِيمَانِ', en:'Purity is half of faith.', src:'Sahih Muslim 223', u:'https://sunnah.com/muslim:223'}
];

const HADITH_SOURCES = [
  {n:'Sahih al-Bukhari', d:'The most authentic collection after the Qur’an.', u:'https://sunnah.com/bukhari'},
  {n:'Sahih Muslim', d:'Second of the two Sahihs, arranged by subject.', u:'https://sunnah.com/muslim'},
  {n:'The Sunan', d:'Abu Dawud, Tirmidhi, Nasa’i and Ibn Majah.', u:'https://sunnah.com/abudawud'},
  {n:'Riyad as-Salihin', d:'Imam an-Nawawi’s widely taught selection.', u:'https://sunnah.com/riyadussalihin'},
  {n:'Al-Adab Al-Mufrad', d:'Bukhari’s book on manners.', u:'https://sunnah.com/adab'},
  {n:'Forty Hadith', d:'An-Nawawi’s Forty, the classic starting point.', u:'https://sunnah.com/nawawi40'}
];

/* ---------- duas ---------- */
const DUA_TABS = [
  {id:'all', label:'All'},
  {id:'daily', label:'Daily'},
  {id:'hardship', label:'Hardship'},
  {id:'forgiveness', label:'Forgiveness'},
  {id:'protection', label:'Protection'},
  {id:'knowledge', label:'Knowledge'}
];

const DUAS = [
  {c:'daily', t:'For the good of both worlds', ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', en:'Our Lord, give us in this world good and in the Hereafter good, and protect us from the punishment of the Fire.', ref:'Al-Baqarah 2:201'},
  {c:'daily', t:'Before eating', ar:'بِسْمِ اللَّهِ', en:'In the name of Allah. And after eating: Alhamdulillahilladhi at’amana wa saqana wa ja’alana minal-muslimin.', ref:'Abu Dawud, Tirmidhi'},
  {c:'daily', t:'Setting out on a journey', ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ', en:'Glory to Him who has subjected this to us, and to our Lord we will surely return.', ref:'Surah Az-Zukhruf 43:13–14 · Sahih Muslim'},
  {c:'daily', t:'Morning and evening', ar:'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ', en:'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die.', ref:'Tirmidhi 3391'},
  {c:'hardship', t:'When worry and sadness press', ar:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ', en:'O Allah, I seek refuge in You from anxiety and sorrow, from weakness and laziness.', ref:'Sahih al-Bukhari 6369'},
  {c:'hardship', t:'Sufficient is Allah', ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', en:'Allah is sufficient for us, and He is the best disposer of affairs.', ref:'Ali ’Imran 3:173'},
  {c:'hardship', t:'A firm heart', ar:'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا', en:'Our Lord, let not our hearts deviate after You have guided us.', ref:'Ali ’Imran 3:8'},
  {c:'hardship', t:'No burden beyond capacity', ar:'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا', en:'Our Lord, do not hold us accountable if we forget or make a mistake.', ref:'Al-Baqarah 2:286'},
  {c:'forgiveness', t:'Seeking forgiveness', ar:'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', en:'I seek the forgiveness of Allah and I turn to Him in repentance.', ref:'Sahih al-Bukhari 6307'},
  {c:'forgiveness', t:'The master supplication for forgiveness', ar:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ', en:'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant… (Sayyid al-Istighfar).', ref:'Sahih al-Bukhari 6306'},
  {c:'forgiveness', t:'Peace within the home', ar:'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ', en:'Our Lord, grant us from among our spouses and offspring comfort to our eyes.', ref:'Al-Furqan 25:74'},
  {c:'protection', t:'Ayat al-Kursi', ar:'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', en:'Allah, there is no deity except Him, the Ever-Living, the Sustainer of existence… Recite after every prayer and before sleep.', ref:'Al-Baqarah 2:255'},
  {c:'protection', t:'Refuge from harm', ar:'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ', en:'In the name of Allah, with whose name nothing on earth or in the heaven can cause harm.', ref:'Abu Dawud, Tirmidhi'},
  {c:'protection', t:'Trusting Allah completely', ar:'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ', en:'Sufficient for me is Allah, there is no deity except Him; in Him I trust.', ref:'At-Tawbah 9:129'},
  {c:'knowledge', t:'Increase in knowledge', ar:'رَبِّ زِدْنِي عِلْمًا', en:'My Lord, increase me in knowledge.', ref:'Ta-Ha 20:114'},
  {c:'knowledge', t:'Understanding before speaking', ar:'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي', en:'My Lord, expand for me my chest and ease for me my task.', ref:'Ta-Ha 20:25–26'},
  {c:'knowledge', t:'For beneficial knowledge', ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا', en:'O Allah, I ask You for beneficial knowledge, good provision and accepted deeds.', ref:'Ibn Majah 925'}
];

/* ---------- learning paths ---------- */
const PATHS = [
  {t:'New to Islam', meta:'Start here · 4 steps', steps:[
    ['Read the Qur’an with a translation','https://quran.com'],
    ['The Firsts: the earliest believers','https://yaqeeninstitute.org/watch/series/the-firsts'],
    ['The five pillars explained','https://seekersguidance.org'],
    ['Find a local masjid and a teacher','https://www.islamicfinder.org/prayer-times/']
  ]},
  {t:'Learn to read the Qur’an', meta:'Recitation · 5 steps', steps:[
    ['Structured Qur’an learning plans','https://quran.com/learning-plans'],
    ['Tajweed basics','https://tajweed.me'],
    ['Word by word study','https://quranwbw.com'],
    ['Recite with a reciter','https://everyayah.com'],
    ['Memorise a short surah weekly','https://tarteel.ai']
  ]},
  {t:'Understand the Seerah', meta:'History · 4 steps', steps:[
    ['The Firsts: earliest believers','https://www.youtube.com/@TheFirsts'],
    ['Qalam Institute seerah classes','https://www.youtube.com/@QalamInstitute'],
    ['Safina Society: traditional learning','https://safinasociety.org'],
    ['Read Riyad as-Salihin for character','https://sunnah.com/riyadussalihin']
  ]},
  {t:'Hadith sciences', meta:'Intermediate · 4 steps', steps:[
    ['Forty Hadith of an-Nawawi','https://sunnah.com/nawawi40'],
    ['Search wording across collections','https://sunnah.com/search'],
    ['Grading and takhrij (Arabic)','https://dorar.net'],
    ['Study terminology with a teacher','https://seekersguidance.org']
  ]},
  {t:'Fiqh of daily life', meta:'Practice · 4 steps', steps:[
    ['Prayer times and conditions','https://www.islamicfinder.org/prayer-times/'],
    ['Purification and salah basics','https://seekersguidance.org'],
    ['Zakat: who pays and how much','https://www.zakatfoundation.com'],
    ['Ask a qualified local scholar for your case','https://seekersguidance.org/answers']
  ]}
];

const EXPLORE = [
  {ico:'📖', t:'Read the Qur’an', s:'114 surahs, ayah by ayah', h:'#quran'},
  {ico:'🕌', t:'Prayer times', s:'Live for your city', h:'#tools'},
  {ico:'🧭', t:'Qibla', s:'Bearing to the Ka’bah', h:'#tools'},
  {ico:'📜', t:'Authentic hadith', s:'With sources you can check', h:'#hadith'},
  {ico:'🤲', t:'Duas & adhkar', s:'Morning to night', h:'#tools'},
  {ico:'📚', t:'Learning paths', s:'Where to start, in order', h:'#learn'},
  {ico:'🌍', t:'Verified directory', s:'Channels, apps, libraries', h:'#directory'},
  {ico:'🧮', t:'Zakat & tasbih', s:'Daily tools', h:'#tools'}
];

const START_HERE = [
  {ico:'📖', n:'Quran.com', d:'The cleanest way to read and listen.', u:'https://quran.com'},
  {ico:'📜', n:'Sunnah.com', d:'Every narration with its reference.', u:'https://sunnah.com'},
  {ico:'🎓', n:'SeekersGuidance', d:'Free courses with qualified teachers.', u:'https://seekersguidance.org'},
  {ico:'🎬', n:'Yaqeen Institute', d:'Sourced answers to hard questions.', u:'https://yaqeeninstitute.org'},
  {ico:'🕌', n:'IslamicFinder', d:'Athan, qibla and masjid finder.', u:'https://www.islamicfinder.org'},
  {ico:'📚', n:'Kalamullah', d:'Free English books archive.', u:'https://www.kalamullah.com'}
];

const MONTHS_HIJRI = ['Muharram','Safar','Rabi’ al-Awwal','Rabi’ al-Thani','Jumada al-Ula','Jumada al-Akhirah','Rajab','Sha’ban','Ramadan','Shawwal','Dhul Qa’dah','Dhul Hijjah'];

/* Scholars — each channel is the scholar's own official account. */
const SCHOLARS = [
  { n:'Mufti Menk', d:'Accessible reminders and lectures, widely translated.', u:'https://www.youtube.com/@muftimenk' },
  { n:'Omar Suleiman', d:'Founder of Yaqeen Institute. Seerah and spirituality.', u:'https://www.youtube.com/@yaqeeninstitute' },
  { n:'Nouman Ali Khan', d:'Qur’anic Arabic and tafsir, founder of Bayyinah.', u:'https://www.youtube.com/@Bayyinah' },
  { n:'Yasir Qadhi', d:'Islamic history, theology and seerah series.', u:'https://www.youtube.com/@YasirQadhi' },
  { n:'Dawud Adib', d:'Daily reminders and short talks.', u:'https://www.youtube.com/@DawudAdib' },
  { n:'Yaqeen Institute', d:'Research papers, series and short films.', u:'https://yaqeeninstitute.org' }
];

/* Real contact details published by the site owner. */
const CONTACT = {
  owner:'Suliman Alhassan',
  email:'sulleyalhassan.178.as@gmail.com',
  whatsapp:'+233502956774',
  whatsappLink:'https://wa.me/233502956774',
  trusteeWhatsapp:'+233550562570',
  formEndpoint:'https://getform.io/f/akkpdyla'
};
