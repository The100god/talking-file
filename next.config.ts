import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  turbopack: {},
};

export default withPWA({
  dest:"public", 
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  runtimeCaching: [
    {
      urlPattern: ({ request }: { request: Request })=> request.destination === 'document',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
      },
    },
    {
      urlPattern: ({ request }: { request: Request }) =>
        ["script", "style", "worker"].includes(request.destination),
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "assets-cache",
      },
    },
    {
      urlPattern: ({ request }: { request: Request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 100,
        },
      },
      },
  ]
})(nextConfig);
