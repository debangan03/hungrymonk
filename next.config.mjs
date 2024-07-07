/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['tipppz-emp-photos.s3.ap-south-1.amazonaws.com'],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      },
};

export default nextConfig;
