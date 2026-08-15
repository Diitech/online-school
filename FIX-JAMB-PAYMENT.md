FIX THE JAMB REGISTRATION, PAYMENT, API, AND HERO IMAGE PROBLEMS.

Project:
DMultichoice Tutoring / online-school

Live frontend:
https://tutoring.dmultichoice.com

IMPORTANT:
Inspect the existing project before changing anything. Do not guess the backend URL or payment configuration.

==================================================
1. FIX JAMB REGISTRATION 404
==================================================

The backend already mounts:

POST /api/jamb-registrations

in:

backend/server.js

The JAMB router is:

backend/routes/jambRegistrations.js

The frontend currently calls:

${API_BASE_URL}/jamb-registrations

The live browser is currently requesting:

https://tutoring.dmultichoice.com/jamb-registrations

and receiving HTTP 404.

DO NOT make the frontend call the frontend root.

Find the actual deployed backend/API URL from the existing project configuration, environment variables, Vercel/Render configuration, package configuration, or existing payment API configuration.

Use a proper environment variable such as:

VITE_API_BASE_URL

or the existing API environment variable already used by the project.

The final production request must become:

<BACKEND_URL>/api/jamb-registrations

NOT:

https://tutoring.dmultichoice.com/jamb-registrations

Do not hardcode an unknown backend URL.

If the backend is intended to be served through the same tutoring.dmultichoice.com domain, configure the appropriate rewrite/proxy so:

/api/jamb-registrations

is forwarded to the Express backend.

Otherwise configure the frontend to use the real deployed backend URL.

Make the solution work in:
- local development
- Vercel production
- production frontend

Do not break existing payment API calls.

==================================================
2. FIX "COULD NOT SAVE YOUR REGISTRATION"
==================================================

The current frontend displays:

"Could not save your registration."

Find exactly where this message is generated.

Inspect:

src/components/jamb/JambRegistrationForm.tsx

and the complete registration/payment flow.

The registration request must:

1. Validate the form.
2. POST to the correct backend:
   /api/jamb-registrations
3. Receive HTTP 201.
4. Receive:
   success: true
5. Obtain the generated registration reference.
6. Continue to the payment process for online payment.

The backend already generates a registration reference and returns registration data.

Do not show "Could not save your registration" if the registration was actually accepted.

Improve error handling so the actual backend error message is displayed during development rather than hiding it behind a generic message.

For production, display a clean user-friendly error while logging the technical error to console.

==================================================
3. FIX PAYMENT FLOW
==================================================

The required registration fee is:

?5,000

The existing Flutterwave/payment system must remain in use.

Do NOT replace Flutterwave.

Do NOT create a second payment gateway.

Do NOT hardcode secret keys in frontend code.

Inspect:

src/components/ui/FlutterwavePayment.tsx

backend/routes/payments.js

and all existing payment configuration.

The intended flow is:

FORM
?
CREATE JAMB REGISTRATION
?
GET REGISTRATION REFERENCE
?
INITIALIZE ?5,000 PAYMENT
?
FLUTTERWAVE CHECKOUT
?
PAYMENT SUCCESS
?
VERIFY PAYMENT
?
UPDATE REGISTRATION TO PAID
?
SUCCESS PAGE
?
JOIN WHATSAPP GROUP

WhatsApp group:

https://chat.whatsapp.com/Iu3lEeviMtZJCKVoXeMCwq

Do NOT redirect to the WhatsApp group immediately after clicking payment.

Only show the successful registration page after payment has actually succeeded/been verified.

Payment amount must remain server-controlled at:

5000 NGN

Do not trust an amount supplied by the browser.

==================================================
4. GOOGLE SHEETS
==================================================

The backend currently calls:

appendJambRegistration(record)

Inspect:

backend/services/googleSheets.js

Make sure Google Sheets configuration is correctly handled in production.

If Google Sheets credentials are missing, do NOT make the frontend falsely report a successful payment.

However, registration creation should not unnecessarily fail merely because an asynchronous Google Sheets write has a transient problem if the application's intended design is to record asynchronously.

Ensure errors are logged clearly.

Never expose Google service-account credentials to the frontend.

==================================================
5. HERO POSTER WARNING
==================================================

The browser reports:

https://tutoring.dmultichoice.com/images/hero-poster.jpg

was preloaded but not used within a few seconds after page load.

Inspect the actual hero component and index.html.

Find the preload for hero-poster.jpg.

If the hero image is actually displayed immediately:
- use rel="preload"
- use as="image"
- ensure the URL is correct
- ensure the image is actually the first/hero image

If it is not needed immediately:
REMOVE the preload.

Do not remove the actual hero image.

Do not preload an image simply for performance claims.

Also verify whether the file actually exists in the production public assets.

==================================================
6. TIKTOK ERROR
==================================================

The browser reports:

analytics.tiktok.com
ERR_NAME_NOT_RESOLVED

Do not break the website because TikTok analytics cannot resolve.

Inspect the TikTok tracking implementation.

Make sure TikTok tracking is loaded safely and failure of the external analytics domain does not affect registration or payment.

Do not remove TikTok tracking.

Do not create fake fallback domains.

Do not make payment dependent on TikTok analytics.

==================================================
7. PAYMENT ERROR HANDLING
==================================================

The frontend currently appears to report:

Could not save your registration.

Make errors distinguishable:

"Unable to connect to registration server."
"Registration data could not be saved."
"Payment could not be initialized."
"Payment was cancelled."
"Payment verification failed."

Do not use one generic error for every failure.

Log:
- HTTP status
- response body
- endpoint
- payment reference where safe

Never log:
- secret API keys
- Flutterwave secret key
- Google service-account private key
- passwords

==================================================
8. PRODUCTION API CONFIGURATION
==================================================

Inspect all of:

.env
.env.local
.env.production
Vercel configuration
package.json
backend/server.js
src/components/jamb/JambRegistrationForm.tsx
src/components/ui/FlutterwavePayment.tsx
backend/routes/payments.js
backend/routes/jambRegistrations.js

Do not commit .env files containing secrets.

If VITE_API_BASE_URL is required, document the exact production environment variable that must be configured in Vercel.

The production API must end up as:

<BACKEND_URL>/api

and JAMB registration:

<BACKEND_URL>/api/jamb-registrations

==================================================
9. TESTING
==================================================

After changes run:

npm run build

Then inspect the generated production code and confirm it does NOT contain:

https://tutoring.dmultichoice.com/jamb-registrations

unless a rewrite/proxy is intentionally configured for that path.

Confirm it uses:

/api/jamb-registrations

or the correct deployed backend API base URL.

Test:

GET <BACKEND_URL>/health

Then test the JAMB endpoint.

Do not use a real ?5,000 payment during automated testing.

Verify the payment initialization configuration without completing a real transaction.

==================================================
10. DO NOT CHANGE
==================================================

Do not remove:
- JAMB landing page
- Holiday lessons
- homepage notification
- homepage popup
- JAMB navigation CTA
- Flutterwave
- Google Sheets registration
- WhatsApp group
- existing Vercel deployment
- existing website pages

Do not downgrade dependencies.

Do not run:

npm audit fix --force

Do not make unrelated design changes.

==================================================
FINAL REQUIREMENT
==================================================

After fixing everything, report:

1. Exact API URL used by the frontend.
2. Exact backend endpoint for JAMB registration.
3. Why the previous 404 occurred.
4. Why "Could not save your registration" occurred.
5. How payment now flows.
6. Whether hero-poster preload was fixed.
7. Whether TikTok failure can still interrupt the website.
8. Result of npm run build.
