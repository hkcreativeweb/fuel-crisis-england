import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/save-money",
        destination: "/save-fuel-money",
        permanent: true,
      },
      {
        source: "/impact",
        destination: "/cost-of-living",
        permanent: true,
      },
      {
        source: "/mp",
        destination: "/ask-your-mp",
        permanent: true,
      },
      {
        source: "/take-action",
        destination: "/make-a-change",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
