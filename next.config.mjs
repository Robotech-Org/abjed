import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        {
          key: 'Content-Security-Policy',
          value: process.env.NODE_ENV === 'development'
            ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://trusted-types.accounts.google.com; style-src 'self' 'unsafe-inline'; frame-src https://accounts.google.com; connect-src https://accounts.google.com;"
            : "default-src 'self'; script-src 'self' 'unsafe-inline' https://accounts.google.com https://trusted-types.accounts.google.com; style-src 'self' 'unsafe-inline'; frame-src https://accounts.google.com; connect-src https://accounts.google.com;"
        },
      ],
    },
  ],
};

export default withSerwist(withNextIntl(nextConfig));
