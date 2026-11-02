# YETI Skin and Hair Clinic website

A static, multi-page website for YETI Skin and Hair Clinic in Butwal, Nepal. It is built with Next.js (App Router), TypeScript, Tailwind CSS and Lucide icons, and has no backend, database or paid service.

## Getting started

You need Node.js 20.9 or newer.

```bash
npm install
```

```bash
npm run dev
```

The site then runs at http://localhost:3000.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the static site into `out/` |
| `npm run start` | Serve `out/` locally (run a build first) |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm test` | Test appointment validation and message formatting |
| `npm run images` | Regenerate optimized photos from `assets/photos` |

## Launch checklist

Clinic facts are held back until confirmed. Anything marked `verified: false` is left out of the pages, the structured data and the appointment flow, and patients see a clearly labelled placeholder instead. **All of the following need confirming by the clinic before launch.**

In `src/content/clinic.ts`:

- [ ] **Secondary phone number.** +977 980-260-8001 is published. Confirm whether +977 9748845430 should be too, then set `verified: true`.
- [ ] **Email destination (optional).** Requests currently go to WhatsApp on +977 980-260-8001. Add a confirmed email address to offer email as well.
- [ ] **Clinician.** Add Dr. Chandra Mohan Sah's registration, areas of interest and biography. The supplied photo is only 528px wide after cropping, so ask for a higher-resolution original.
- [ ] **Opening hours** (`openingHours`).
- [ ] **Official social accounts** (`socialLinks`).
- [ ] **Google rating** (`googleRating`), checked against the live listing.
- [ ] **Testimonials** (`testimonials`), verified or authorized only.
- [ ] **Before and after results** (`beforeAfterResults`). Use genuine photos of the clinic's own patients with documented consent, and set `consentOnFile: true`. Never use stock photos. The clinic should also check that publishing them meets Nepal's rules on medical advertising.
- [ ] **Service list.** Review `src/content/en/services.ts`, set each offered treatment to `confirmed: true`, add confirmed laser procedures, remove any `availabilityNote` that no longer applies, then set `serviceListConfirmed = true`.
- [ ] **Privacy policy.** Have `src/content/en/privacy.ts` reviewed and complete the items marked for approval, then set `privacyPolicyApproved = true`.

Elsewhere:

- [ ] **Clinic copy.** Ask the clinic to approve the wording in `src/content/en/site.ts`, especially the description of the clinic and its mission.
- [ ] **Photos.** Replace stock photos with genuine ones (see below).
- [ ] **Logo.** The wordmark in `src/components/Logo.tsx` and `public/og.jpg` are temporary.
- [ ] **Public URL.** Set `NEXT_PUBLIC_SITE_URL` when building (see below).

## Appointment requests

A static site can't receive or store submissions, so the form never books anything.

1. The patient completes the form, which validates it in the browser.
2. A review screen shows the request. Nothing has been sent at this point.
3. **Send via WhatsApp** or **Send via Email** opens the patient's own app with a prefilled message. The patient must press send there.
4. A follow-up screen shows the request summary, next steps and clinic contact details, and states that the appointment is not confirmed until the clinic responds. The site cannot detect whether the message was actually sent, so this screen asks the patient to check.

To turn this on, set a verified destination in `src/content/clinic.ts`:

```ts
export const contactChannels = {
  whatsapp: { number: "9779XXXXXXXXX", verified: true }, // digits only, with country code
  email: { address: "clinic@example.com", verified: true },
};
```

With neither configured, the page says online requests are not active and directs patients to call or visit. It never shows a success state.

Patient details exist only in React state. They are not written to `localStorage`, `sessionStorage`, analytics or logs, and the site has no analytics. The prefilled message does pass through a `wa.me` or `mailto:` link, which the privacy policy discloses.

To use a clinic-approved form service instead, add its verified endpoint as another option in `WhatsAppOrEmailRequestHelper.tsx`, and update the privacy policy to name that service.

## Replacing photos

1. Put the original in `assets/photos`, for example `reception.jpg`.
2. Run `npm run images`, which creates 640, 1080 and 1920px WebP files in `public/images`.
3. Point an entry in `src/content/images.ts` to it with `illustrative: false`, and write accurate alt text.

Stock photos always carry a visible "Illustrative photo" label. Sources are listed in `CREDITS.md`. Never publish identifiable patient photos without permission.

## Deployment

`npm run build` writes a complete static site to `out/`, which any static host can serve (Cloudflare Pages, Netlify, Vercel, GitHub Pages at a root domain, or shared hosting).

```bash
NEXT_PUBLIC_SITE_URL=https://your-clinic-domain.example npm run build
```

Without `NEXT_PUBLIC_SITE_URL`, the build is treated as a preview: pages are marked `noindex`, and `robots.txt` blocks crawlers. Set it only for the real launch. The build needs internet access once to fetch fonts, which are then self-hosted.

Configure your host to use `out/404.html` as the not-found page, if it doesn't do so automatically.

## Project structure

```
src/
  app/             Routes, metadata, sitemap and robots
  components/      Reusable components
  content/
    clinic.ts      Clinic facts and verification flags
    images.ts      Photo registry
    en/            English copy and service data
  lib/             Appointment logic, image loader, metadata helper
assets/photos/     Original photos
scripts/           Image optimization
```

### Adding Nepali later

Copy lives in `src/content/en`, separate from layout and from the language-neutral facts in `clinic.ts`. To add Nepali:

1. Create a translated `src/content/ne` that mirrors `en`.
2. Move the routes under `src/app/[locale]/`, and generate `en` and `ne` params.
3. Pick the content by locale, and set `lang` and `hreflang` to match.
4. Check the fonts, as the current ones don't cover Devanagari. Add a Devanagari font such as Noto Serif Devanagari.
