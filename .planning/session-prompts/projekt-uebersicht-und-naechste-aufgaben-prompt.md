# Projekt-Übersicht & nächste Aufgaben — Session-Prompt für Claude Code
## Kopiere den Prompt unten und füge ihn als erste Nachricht in eine neue Claude-Code-Session ein
---

```
Du arbeitest am Projekt "Die Alltagshelfer" (c:\Users\admin\Desktop\Firma die Altagshelfer).
Es ist eine statische Premium-Website (HTML/CSS/JS, KEIN Build-Tool, kein Framework),
die per GitHub Pages deployed wird. Lies ZUERST die README.md im Projektordner.
Die projekteigene CLAUDE.md ist leer — die Architektur steht in diesem Prompt.

## Projekt-Fakten (Zero-Context-Start)
- Zweck: Schaufenster-Website für die Marke "Die Alltagshelfer" — zeigt "was ist" (Apps)
  und "was kommt" (Tools). Dunkles, modernes Premium-Theme (Linear/Vercel-Anmutung).
- Repo: github.com/Marcel-Fe/die-alltagshelfer  (Account Marcel-Fe, gh CLI ist eingeloggt)
- Live: https://marcel-fe.github.io/die-alltagshelfer/  (GitHub Pages, Branch main, Root)
- Stack: index.html + css/style.css (~1830 Z.) + js/main.js (~127 Z.). Schriften via Google
  Fonts (Bricolage Grotesque + Instrument Sans). Keine Abhängigkeiten, kein npm-Build.
- Verifikation lokal: Playwright liegt unter %TEMP%\pw-verify\node_modules — Screenshots via
  `$env:NODE_PATH="$env:TEMP\pw-verify\node_modules"; node <script>.js`. Chromium kann KEIN
  mp4/H.264 dekodieren (Videoframes nicht headless-screenshotbar — im echten Browser ok).
- Sprache: durchgängig Deutsch (Texte, Commits). Commit-Format siehe ~/.claude/CLAUDE.md;
  Commits IMMER mit Trailer "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>".
  PowerShell kann KEIN Heredoc — Commit-Messages via Datei: `git commit -F /tmp/cmsg.txt`
  (in der Bash-Shell schreiben). git user: Marcel-Fe / marcelfehse22@gmx.de.

## Was ALREADY EXISTS (nicht neu bauen!) — index.html (631 Z.)
1. `index.html` — eine Landingpage, Sektionen in dieser Reihenfolge:
   - Navigation (Z. ~32): Apps · Tool · Branchen · Warum wir · Kontakt + "Apps entdecken".
     KEIN Login (wurde bewusst entfernt — Login/Dashboard gibt es nicht mehr).
   - Hero (Z. ~55): "Weniger Aufwand. Mehr Zeit für das Wesentliche." (App-Fokus)
   - 5-Sekunden-Wert (Z. ~125): 3 Vorteile.
   - APPS (Z. ~154, id="apps"): App-Store-Style-Listings, NICHT direkt verlinkt als Karte.
     FamilienApp + DogMatch AI: je App-Icon, "Bewerten"-Sterne (Link zu #feedback, KEINE
     erfundene Wertung), 5 Screenshots (horizontal scrollbar .store-shots), "Das Ziel der
     App", Tags, "Öffnen"-Button → Live-PWA. Plus ".store-soon"-Hinweis "Weitere Apps".
   - TOOL Buchhaltung Auto (Z. ~238, id="tool"): Werbevideo (assets/video/, preload=none,
     poster=assets/img/tool-poster.png), 3 Nutzen, Ablauf-Flow, Impact-Block mit Werten
     ~86 % / ≈100 % INKL. Disclaimer (.tool-note), 3 Tool-Screenshots, CTAs.
   - WEITERE TOOLS (Z. ~307): Teaser-Chips Verwaltungsassistent/Pflegeassistent/
     Handwerker-Tool — "In Entwicklung".
   - BRANCHEN (Z. ~327): Pflege/Handwerk/Kleine Unternehmen/Dienstleister mit Fotos +
     Pill "Branchen-Tools folgen bald".
   - WARUM (Z. ~389), FEEDBACK (Z. ~445), CTA-Band (Z. ~500), KONTAKT (Z. ~511,
     Formular #demoForm), FOOTER (Z. ~586).
2. `css/style.css` — Design-System (dunkle Tokens in :root), alle Sektions-Styles inkl.
   .appstore-list/.store-app/.store-shots, .tool*/.impact*, .feedback*/.star, responsive
   @media 1024/760.
3. `js/main.js` — Nav/Scroll-Reveal/Counter; Demo-Formular #demoForm (Z. 61, zeigt nur
   Erfolgsmeldung, sendet NICHTS); Sternebewertung #starRating (Z. ~75) + Feedback-Formular
   #feedbackForm (Z. 97, zeigt nur Danke, sendet/speichert NICHTS).
4. `assets/` — logo.svg, app-icon.svg, img/apps/{familien,dogmatch}-{1..5}.png + *-icon.png,
   img/tool-{poster,1,2,3}.png, img/branche-*.jpg, video/buchhaltung-werbevideo.mp4 (~8 MB).

## Was MISSING ist (deine Aufgaben — 2–5 Lücken schließen, je nach Auftrag des Users)

Gap 1: Feedback- & Kontaktformular wirklich versenden
- Aktuell: js/main.js Z. 61 (#demoForm) und Z. 99 (#feedbackForm) zeigen nur die
  Erfolgs-/Danke-Meldung lokal — es wird nichts gesendet oder gespeichert.
- Einstieg: js/main.js submit-Handler; index.html Formulare #demoForm (Z. ~561) und
  #feedbackForm (Z. ~451) + Sternwert selectedRating (js Z. 77).
- Ansatz: An einen No-Backend-Dienst anbinden (z. B. Formspree/Web3Forms): form action +
  fetch POST, Honeypot gegen Spam, Erfolg/Fehler sauber behandeln. Endpoint als Platzhalter
  lassen, falls der User keinen Account hat — dann klar dokumentieren.

Gap 2: Echte App-Bewertungen anzeigen
- Aktuell: ".store-rate" (index.html Z. 173/205) zeigt nur graue Sterne + "Bewerten"-Link,
  KEINE Durchschnittswertung (bewusst, da keine echten Daten).
- Einstieg: index.html .store-head/.store-meta je App; Feedback-Daten aus Gap 1.
- Ansatz: Erst wenn echte Bewertungen vorliegen — Durchschnitt (★ 4,8 · N Bewertungen)
  je App anzeigen. Quelle muss real sein (aus dem Formular-Backend), NICHT erfunden.

Gap 3: Buchhaltung-Tool – Vertrieb ausbauen
- Aktuell: Tool-Sektion erklärt + Video, CTA "Demo anfragen" → #kontakt. Es gibt KEINEN
  echten Demo-Download und KEINE belegbare Zahl.
- Einstieg: index.html Tool-Sektion (Z. ~238), .tool-ctas; Quelle des Tools liegt unter
  C:\Users\admin\Desktop\Buchhaltung-Auto-Komplettpaket\ (Demo-ZIP 7 Tage, Handbuch,
  Leistungsübersicht-PDF, Nutzen-PDF).
- Ansatz: Optional Demo-ZIP/Handbuch zum Download bereitstellen (Repo-Größe beachten, ZIP
  ist ~44 MB — ggf. extern hosten/verlinken statt einchecken). Belegbare Pilot-Zahl statt
  Test-Prozente eintragen, SOBALD vom User geliefert.

Gap 4: Rechtliches & Go-Live
- Aktuell: Footer (index.html Z. 616–618) Impressum/Datenschutzerklärung/AGB sind tote
  Links (href="#"). Keine eigene Domain. Meta/JSON-LD vorhanden, aber Domain = github.io.
- Einstieg: index.html Footer; <head> Meta/JSON-LD (Z. ~7–34).
- Ansatz: Rechtsseiten anlegen (impressum.html/datenschutz.html) ODER Inhalte vom User
  einsetzen; eigene Domain via Pages-CNAME vorbereiten; Lighthouse/SEO-Feinschliff.

Gap 5 (optional): Neue Apps/Tools ergänzen
- Aktuell: App-Listings sind ein wiederholbarer Block (article.store-app). Tool-Sektion
  ist ein eigenständiger Block. Nicht-deployte Apps existieren als Desktop-Ordner.
- Einstieg: index.html .appstore-list; Screenshots live von der jeweiligen PWA aufnehmen
  (Playwright, mobile viewport 390x844) und nach assets/img/apps/ legen.
- Ansatz: Pro neuer App einen .store-app-Block kopieren, Icon + 3–5 Screenshots + Texte.

## Constraints (Leitplanken)
- EHRLICHKEIT (kritisch): KEINE erfundenen Zahlen. Speziell beim Buchhaltung-Tool laut
  C:\...\Buchhaltung-Auto-Komplettpaket\00_LIESMICH.txt: keine synthetischen Test-Prozente
  als Versprechen — nur MIT Disclaimer (so wie aktuell in .tool-note). KEINE Fake-
  Sternewertungen/Reviewzahlen bei den Apps.
- Apps werden im App-Store-Stil präsentiert (Beschreibung + 3–5 Screenshots + Ziel), nicht
  als blanker Link. Die "Öffnen"-Buttons dürfen bleiben.
- Bestehende dunkle Design-Tokens (:root in css/style.css) und das Layout NICHT umfärben —
  neue Elemente fügen sich in das bestehende System ein.
- Statische Site: KEIN Framework/Build-Tool einführen. Vanilla HTML/CSS/JS bleiben.
- Jede Änderung: ein Commit (deutsch, mit Co-Authored-By-Trailer), dann push origin main,
  dann GitHub-Pages-Rebuild abwarten und LIVE per curl verifizieren.
- Repo schlank halten: große Binärdateien (ZIPs/Videos > ~10 MB) nicht unbedacht einchecken.

## Workflow
1. Lies README.md und ALLE oben gelisteten Kerndateien KOMPLETT, bevor du planst.
2. Plane die Lücken als isolierte, unabhängige Änderungen.
3. Setze eine Lücke nach der anderen um, je mit:
   - Code-Änderung
   - Verifikation (HTML/JS syntaktisch ok; Sektion rendert via Playwright-Screenshot)
4. Nach allen Lücken: Gesamtseite rendern (Hero, Apps, Tool, Feedback, Mobil) als Regression.
5. Ein Commit pro Lücke mit klarer Beschreibung; danach push + Live-Check.

## Verification (ausführbare Checks)
- node -e "require('fs').readFileSync('index.html','utf8')"   # Datei lesbar
- powershell -Command "$env:NODE_PATH=\"$env:TEMP\pw-verify\node_modules\"; node _check.js"  # Screenshot-Render ohne pageerror
- grep -nE 'href=\"#\"' index.html        # keine toten Platzhalter-Links übrig (Footer)
- git log --oneline -5                      # Commits sauber, mit Trailer
- curl -s -o /dev/null -w "%{http_code}\n" https://marcel-fe.github.io/die-alltagshelfer/   # 200
- curl -s "https://marcel-fe.github.io/die-alltagshelfer/index.html?cb=$(date +%s)" | grep -c "<DEIN_NEUER_MARKER>"

## Was du NICHT tun darfst
- KEINE erfundenen Prozent-/Zeitersparnis-Zahlen oder Fake-Bewertungen einbauen (nur belegte
  Werte, sonst qualitativ + Disclaimer).
- KEINE direkte Roh-Verlinkung der Apps als einzige Darstellung — App-Store-Stil beibehalten.
- KEIN Framework/Bundler/npm-Build hinzufügen; die Site bleibt statisch und ohne Abhängigkeiten.
- Das helle Theme NICHT wieder einführen; die dunklen Design-Tokens nicht großflächig ändern.
- Den entfernten Login/das alte Tool-Dashboard NICHT wiederherstellen.
- Nichts ungetestet pushen: erst lokal rendern, dann committen, dann Live-Status prüfen.
- Keine großen Binärdateien (z. B. die 44-MB-Demo-ZIP) ohne Rücksprache ins Repo legen.
```
