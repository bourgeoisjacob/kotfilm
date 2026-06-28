# Google Play listing — Kotfilm

Everything you need to fill in the Play Console. Copy-paste the text blocks; the
graphics are in `public/play/`.

---

## 1. App details

| Field | Value |
|---|---|
| **App name** (max 30) | `Kotfilm: Soviet Cinema Guide` (28 chars) — or just `Kotfilm` |
| **Default language** | English (United States) |
| **App or game** | App |
| **Free or paid** | Free |
| **Category** | Entertainment (alt: Books & Reference / Education) |
| **Contact email** | bourgeoisjacob@gmail.com |
| **Website** | https://kotfilm-iota.vercel.app |
| **Privacy policy URL** | https://kotfilm-iota.vercel.app/privacy |

---

## 2. Short description (max 80 chars)

```
Discover Soviet cinema: curated films, history, and free, legal ways to watch.
```
(78 characters.)

---

## 3. Full description (max 4000 chars)

```
Kotfilm is a curated guide to Soviet cinema — a calm, beautifully designed place to discover great films from the USSR and find out where to watch them for free and legally.

This is not a streaming app, and it never hosts movies. Kotfilm is a film-lover's reference: short, original write-ups for each film, the history and context around it, the people who made it, and trustworthy links to where it can be watched — official studio channels and public-domain archives.

WHAT YOU CAN DO
• Browse and search a hand-picked catalogue of Soviet films
• Filter by director, actor, genre, decade, and studio
• Read concise, original summaries, historical context, and interpretation
• Explore cast and crew, themes, and related films
• Follow clearly-labelled "where to watch" links, badged by trust level — official, archive, or public domain
• Save films to a personal watchlist
• Get watch links suited to your region, so you're pointed to a copy you can actually play

OUR PRINCIPLES
• We never host films. Watch links point only to official or clearly-licensed sources.
• We write our own concise descriptions — we don't copy long texts from elsewhere.
• Every film, image, and link records its source and attribution.
• Images are used only under a known free license.
• Kotfilm is independent and non-commercial: no ads, no tracking. It is not affiliated with Mosfilm, Lenfilm, or any studio, platform, or archive.

Whether you are a lifelong admirer of Tarkovsky and Eisenstein or simply curious about the classics, Kotfilm helps you find the right film — and a legitimate place to watch it.
```

---

## 4. Graphics (in `public/play/`)

| Asset | Requirement | File |
|---|---|---|
| **App icon** | 512×512 PNG, 32-bit | `public/play/icon-512.png` ✅ |
| **Feature graphic** | 1024×500 PNG/JPG | `public/play/feature-graphic.png` ✅ |
| **Phone screenshots** | 2–8, PNG/JPG, 16:9 or 9:16, min 320px | _you capture — see below_ |

### Capturing phone screenshots (need at least 2)
Easiest, looks authentic:
1. Desktop Chrome → open https://kotfilm-iota.vercel.app
2. F12 → click the **device toolbar** icon (phone/tablet) → set a phone like **Pixel 7** (or a custom 1080×1920).
3. Use the **⋮ → Capture screenshot** in the device toolbar for clean full-frame shots.
4. Capture 4–5 good views:
   - Home with the browse rails
   - The catalogue with filters open
   - A film detail page (summary + watch links)
   - A director or genre page
   - The watchlist
5. Upload the PNGs to the Play listing.

---

## 5. Content rating questionnaire

Answer **honestly**; for Kotfilm the app's own content is informational text and
freely-licensed images, so expect **Everyone / Teen**.
- Category: **Reference / News / Educational** (or Entertainment).
- Violence / sexual content / profanity / drugs **in the app itself**: **No** (the
  app shows text and images; films play via third-party embeds).
- Does the app share user location / personal info: **No** (see Data Safety below).
- User-generated content / social features: **No** (no comments or user posts).
- Note: it links to historical films that may contain mature themes; if asked
  whether the app provides access to such content, answer truthfully — this may
  yield a 10+/Teen rating, which is fine.

---

## 6. Data Safety form

Open: **does your app collect or share user data?** → **Yes (collects), no sharing.**

### Data types collected
| Category → Type | Collected | Shared | Optional? | Purpose |
|---|---|---|---|---|
| Personal info → **Email address** | Yes | No | Optional (only if you make an account) | Account management |
| Personal info → **Name** (optional display name) | Yes | No | Optional | Account management, App functionality |
| App activity → **App interactions** (watchlist, favourites, ratings, watched marks) | Yes | No | Optional | App functionality, Personalization |

### Not collected (so leave unticked)
- Location, financial info, health, photos/videos, contacts, messages, files, calendar.
- **Advertising/Device IDs:** none.
- **IP address:** processed only transiently for security (rate-limiting) and to
  estimate region for correct watch links; not stored or linked to a profile.
  Google allows excluding data processed ephemerally — so it is not declared.
  (If you prefer to be extra-cautious you may declare "Approximate location →
  App functionality", but it isn't required.)

### Security practices
- **Encrypted in transit:** **Yes** (HTTPS for the site; TLS to the database).
- **Users can request data deletion:** **Yes** — provide the contact
  bourgeoisjacob@gmail.com (and the privacy URL). Users can also use the app
  without an account, and a signed-out watchlist lives only in their browser.
- **Data collection is optional:** Yes — browsing requires no account.

> Keep this consistent with the privacy policy at /privacy. If you change one,
> change the other.

---

## 7. Release checklist
1. Build the `.aab` with PWABuilder (Package ID **`app.kotfilm.twa`**). ✅ done
2. Create the app in Play Console; upload the `.aab` (start on **Internal testing**).
3. Copy the **Play App Signing SHA-256 fingerprint** (Setup → App integrity →
   App signing) and send it to your dev to put in `/.well-known/assetlinks.json`.
4. Fill App details, Short/Full description, Graphics, Screenshots (this doc).
5. Complete Content rating + Data Safety (this doc).
6. Set Target audience (13+), confirm no ads.
7. Roll out to Internal testing → verify the installed app opens **full-screen**
   (asset-links verified) → then promote to Production and submit for review.
