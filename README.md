# Islamic Google

A single-page Islamic knowledge hub: Qur'an reader, authentic hadith, duas, 99 Names, prayer times, qibla, zakat, tasbih, and a directory of verified channels, apps, libraries and learning hubs.

**Live:** https://islamic-google.vercel.app

## Files

```
index.html                 app shell, all views
assets/styles.css          design system (dark + light, geometric pattern, responsive)
assets/data.js             curated content: directory, hadith, duas, paths, daily ayat
assets/app.js              router, search, Qur'an reader, prayer times, tools
manifest.webmanifest       PWA metadata
sw.js                      offline shell cache
assets/icon-192.png        app icon
assets/icon-512.png        app icon
```

## Deploy to GitHub Pages

1. Copy `index.html`, `manifest.webmanifest`, `sw.js`, `assets/` and this README into the repo root (`ISLAMIC-GOOGEL`).
2. Delete the old `styles.css` and `js/search.js` (search.js was 404 on the live site, which is why search never worked).
3. Commit to `main`.
4. Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Wait for the green check, then hard refresh.

## Data sources

| What | Source | Notes |
|---|---|---|
| Qur'an Arabic | AlQuran Cloud (`quran-uthmani`) | Tanzil Uthmani text |
| Translation | AlQuran Cloud (`en.sahih`) | Sahih International |
| Ayah audio | everyayah.com | Alafasy 128kbps |
| Prayer times, qibla, Hijri date | AlAdhan API | method 3 (Muslim World League) |
| 99 Names | AlAdhan `asmaAlHusna` | Arabic + transliteration + meaning |
| Hadith | sunnah.com links | every narration cites collection + number |

No API keys required. No build step. No tracking.

## Link verification

Every URL in `assets/data.js` was checked with an HTTP request before release: 80 of 81 returned a live response, and the last dead link was replaced. Re-check after any edit:

```bash
python3 - <<'PY'
import re,subprocess,pathlib,concurrent.futures as cf
urls=sorted(set(re.findall(r"'(https://[^']+)'", pathlib.Path('assets/data.js').read_text())))
def c(u):
    r=subprocess.run(['curl','-sSL','-o','/dev/null','-w','%{http_code}','--max-time','20','-A','Mozilla/5.0',u],capture_output=True,text=True)
    return u,r.stdout.strip()
with cf.ThreadPoolExecutor(10) as ex:
    for u,code in ex.map(c,urls):
        if code in ('404','410','000'): print('DEAD',code,u)
PY
```

## Editing content

* **Add a resource:** append to `DIRECTORY` in `assets/data.js` with `{n,u,c,t,d}`. Categories live in `CATEGORIES`.
* **Add a hadith:** append to `HADITH` with the collection and number, and link to sunnah.com so readers can verify.
* **Add a dua:** append to `DUAS` with a category from `DUA_TABS`.
* **Change the default city:** `state` in `assets/app.js` (`lat`, `lng`, `city`).

## Notes on authenticity

Hadith are quoted with collection and number; readers are always linked to the full collection. Duas cite Qur'anic verse or a hadith collection. Nothing on the site issues fatwas, and the About page says so plainly.
