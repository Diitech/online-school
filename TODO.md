# TODO — Professional Schools expansion (tutoring.dmultichoice.com)

## Phase 1 — Foundation (data + routing skeleton)

- [ ] Create `app/src/data/professional-schools.ts` (academies + courses config)
- [ ] Create `app/src/pages/professional-schools/ProfessionalSchoolsLanding.tsx`
- [ ] Create `app/src/pages/professional-schools/academy/AcademyPage.tsx`
- [ ] Create `app/src/pages/professional-schools/course/CoursePage.tsx`
- [ ] Update `app/src/App.tsx` with routes:
  - [ ] `/professional-schools`
  - [ ] `/professional-schools/:academySlug`
  - [ ] `/professional-schools/:academySlug/:courseSlug`

## Phase 2 — Navigation (mega menu + mobile accordion)

- [ ] Add `app/src/components/professional/MegaMenu.tsx`
- [ ] Update `app/src/sections/Navigation.tsx` to include “Professional Schools”
- [ ] Add `app/src/components/professional/MobileAcademyAccordion.tsx` for mobile dropdown

## Phase 3 — SEO + JSON-LD templates

- [ ] Update course + academy pages to use `app/src/components/SEO.tsx`
- [ ] Add structured data (Organization/Academy + Course + FAQ where applicable)
- [ ] Update `app/public/sitemap.xml` for new URLs (either static entries or generated approach)

## Phase 4 — Registration (reusable form + Google Sheets)

- [ ] Create `app/src/components/registration/RegistrationForm.tsx`
- [ ] Create backend route `app/backend/routes/registrations.js`
- [ ] Backend integration to Google Apps Script Web App (env var)
- [ ] Frontend submission states + validation + duplicate prevention

## Phase 5 — Payments (Paystack)

- [ ] Add backend Paystack endpoints under `app/backend/routes/payments.js` or new route file
- [ ] Create frontend `app/src/components/payments/PaystackCheckout.tsx`
- [ ] Wire “Pay Now” and verify via webhook flow
- [ ] Ensure existing payment success/failure pages remain functional

## Phase 6 — PDF brochure generation

- [ ] Add backend service `app/backend/services/brochureGenerator.js`
- [ ] Add route to download brochure: `GET /api/brochures/:registrationId`
- [ ] Trigger brochure generation after payment verification (or registration per config)

## Phase 7 — Admin/export endpoints (minimal but production-ready)

- [ ] Add backend endpoints for payment tracking export (CSV/JSON)
- [ ] Hook into Google Sheets sync where needed

## Smoke tests

- [ ] Load all new URLs in browser
- [ ] Validate mega menu + mobile accordion behavior
- [ ] Test registration submission (success + error)
- [ ] Test Paystack initialize + webhook verification
- [ ] Test brochure download
- [ ] Verify SEO meta tags + JSON-LD present
