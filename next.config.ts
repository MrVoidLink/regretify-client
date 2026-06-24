import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.188:3000"],
  async headers() {
    const longLivedAssetHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    return [
      {
        source: "/models/character-512-rig-25000poly-compressed.glb",
        headers: longLivedAssetHeaders,
      },
      {
        source: "/models/wooden-archery-target-512-2500poly.glb",
        headers: longLivedAssetHeaders,
      },
      {
        source: "/models/bow.obj",
        headers: longLivedAssetHeaders,
      },
      {
        source: "/models/arrow.obj",
        headers: longLivedAssetHeaders,
      },
      {
        source: "/images/home/hero-background-test-backg-lite.webp",
        headers: longLivedAssetHeaders,
      },
      {
        source: "/images/home/hero-background-mobile-v1.png",
        headers: longLivedAssetHeaders,
      },
      {
        source: "/images/home/hero-stage-mobile-v2.png",
        headers: longLivedAssetHeaders,
      },
    ];
  },
};

export default nextConfig;
