ISLAMIC GOOGLE - Static website package
Files: index.html, quran.html, hadith.html, lectures.html, books.html, history.html, contact.html, about.html
assets/: logo and background; styles.css; js/search.js; data/search_index.json

To deploy on GitHub Pages:
1. Create a GitHub repository (name doesn't matter) or use your existing repo.
2. Upload all files and folders (upload the contents to the repo root; ensure index.html is at root).
3. In repo -> Settings -> Pages (or "Pages" in new UI): set Source to 'main' branch and folder '/' then Save.
4. After a minute, your site will be live at: https://<username>.github.io/<repo>/

Notes:
- The search runs in the visitor's browser using the local data/search_index.json file.
- If you want more resources added, send the links/titles and I'll add them to the index.
- Visitor notifications use Getform endpoint already set to your form ID (no server required).
