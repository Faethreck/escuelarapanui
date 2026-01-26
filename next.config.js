/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'escuelarapanui.cl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
    ],
  },
  // If deploying to GitHub Pages with a repository name, uncomment and set:
  // basePath: '/escuelarapanui',
  // trailingSlash: true,
}

module.exports = nextConfig
