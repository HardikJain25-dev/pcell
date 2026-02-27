# Hosting a Next.js app as a static site on Hostinger (Simple Website hosting)

This guide walks you through exporting a static version of a Next.js app and hosting it on Hostinger's simple/shared plan with a domain.

Prerequisites
- Node.js environment for local build (Node installed)
- Domain pointing to Hostinger hosting (DNS A/ CNAME configured in Hostinger)

1) Prepare a static export
- Ensure your Next.js app can be exported as static HTML (getStaticProps/pages router). If your app relies on server-rendering or API routes, you will need to adapt or use a different hosting path (see Options below).
- In package.json, you now have a script to export: "export": "next export".
- Run locally:
  - npm ci
  - npm run build
  - npm run export
  This will produce an out/ directory containing the static site.

2) Deploy to Hostinger
- Log in to Hostinger and go to the File Manager (or use FTP/SFTP).
- Upload the contents of the out/ directory to your domain's document root (usually public_html/ or public_html/yourdomain/ depending on setup).
- Ensure index.html is at the root of the deployed site (out/index.html).
- If you have subpaths (e.g., /about), verify the corresponding folders exist (out/about/index.html).

3) Domain and HTTPS
- In Hostinger, attach your domain to the hosting plan if not already done.
- Enable Let’s Encrypt SSL (Hostinger typically offers this in hPanel).
- Ensure there are no mixed content issues; all assets should be served over HTTPS.

4) Verification
- Visit your domain and check the following:
  - Home page loads (index.html)
  - Static routes render correctly (e.g., /about/, /contact/)
  - Assets (CSS/JS/images) load without 404s
  - The site behaves consistently on desktop and mobile

5) Caveats
- This approach does not support Next.js API routes or server-side rendering on Hostinger's shared hosting.
- If your app requires SSR or API routes, consider deploying to a Node-friendly host (VPS) or using a platform like Vercel/Netlify and pointing your domain to that provider.

6) Optional: Alternative hosting options
- Vercel or Netlify: Connect your repo, deploy automatically, and configure your domain with easy SSL.
- If you still want to host a Next.js app with SSR, you’ll need a Node.js-capable host (VPS/Cloud) or a dedicated Next.js hosting service.

Need a tailored deployment plan for your exact repo and domain? Tell me your preferred hosting path (static export, Vercel/Netlify, or VPS) and I’ll adapt this with exact commands and config.
