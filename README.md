# Zahraa Mahmood — Engineering Portfolio

A production-oriented Next.js / TypeScript portfolio redesign. Light and dark mode, responsive layout, professional case studies, interactive architecture explorer, developer terminal, technical writing, and a server-side contact API.

## Local development

1. `npm install`
2. `cp .env.example .env.local`
3. `npm run dev` then open http://localhost:3000
4. `npm run lint` and `npm run build`

## Deploy to Vercel

Import the repository into Vercel, or create a separate review project first. Set the environment variables listed below in Project Settings → Environment Variables. Redeploy after changes. When approved, connect the existing production domain to the new project or merge this code into the original repository. Do not overwrite the current live version until reviewed.

## Contact form setup (required for sending)

1. Create a free Resend account at https://resend.com. Its currently published free allowance is 3,000 emails/month, up to 100 per day; limits may change.
2. Verify a **domain you control** in Resend (SPF/DKIM as instructed by Resend). A `vercel.app` subdomain generally cannot be verified as your own sending domain. Domain acquisition is a separate possible expense; if you don't own a domain, check alternatives such as existing EmailJS credentials before committing to this solution.
3. Create a Resend API key and configure, in Vercel **server-only**, `RESEND_API_KEY=re_...` and `CONTACT_FROM_EMAIL=Portfolio <hello@yourverifieddomain.com>`.
4. Set `CONTACT_TO_EMAIL=zahraamahmood222@gmail.com` and `NEXT_PUBLIC_SITE_URL=https://zahraa-mahmood.vercel.app` (the latter is needed on the production domain if request origin differs from preview deployments; set per environment).
5. Deploy. Submit a real message from the production site and check Inbox and Spam. Confirm success response, actual email receipt, Reply-To, invalid input, and provider error behavior. **Delivery has not been verified until this test passes**.
6. For public launch, add a robust anti-abuse mechanism. Server route includes a honeypot, input validation, origin check, and optional Turnstile verification, but an in-memory rate limit is insufficient for serverless. Use provider limits and server-side bot validation. If enabling Turnstile, also add the corresponding front-end widget/token wiring; simply setting secret without the UI will block submissions. Keep credentials out of `NEXT_PUBLIC_` variables and git.

### Contact form limitations

The contact UI is built, the Resend HTTP API is integrated, and error handling exists; however **without API key, verified sender domain, deployment, and a real send test, the form is not operational**. Avoid saying otherwise.

## Content and privacy

Professional case studies are conceptual summaries. Verify wording, metrics, and permission to disclose employer-related work before publishing. The architecture explorer deliberately represents generic patterns rather than proprietary infrastructure. Writing entries are short original technical notes, not published historical blog posts. Social links are only included where known; do not invent LinkedIn URLs. No portrait/photo is used.

## Architecture

- Next.js App Router and TypeScript
- CSS design tokens with `localStorage` light/dark preference
- Accessible navigation, reduced-motion support, responsive case studies
- Client-side terminal with **allowlisted** commands (no shell execution)
- Server-side `/api/contact` proxy to Resend (API key never shipped to browser)

## Remaining review items

- Confirm employer/public disclosure wording of 3 case studies.
- Optionally add a verified LinkedIn URL and actual downloadable resume.
- Add real favicon and Open Graph artwork.
- Consider Turnstile token integration before high-traffic deployment.
- Perform `npm install`, typecheck, and build in network-enabled CI; package was authored offline.
