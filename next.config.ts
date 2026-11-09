/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Static site for FTP / static hosting. Admin CMS lives in `../monangabadi-admin`. */
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "monangabadi.com"
      }
    ]
  }
};

module.exports = nextConfig;
