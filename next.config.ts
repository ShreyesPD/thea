import type { NextConfig } from "next";

const PORT = process.env.PORT || '3003';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'www.instagram.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [`localhost:${PORT}`, `127.0.0.1:${PORT}`, 'localhost:3000', 'localhost:3001', '127.0.0.1:57553', '127.0.0.1:3001'],
    },
  },
};

export default nextConfig;
