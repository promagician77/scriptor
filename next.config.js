/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '' : process.env.BASEPATH,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  async redirects() {
    return [
      // Removed the /auth/callback redirect as we now have a proper route handler
    ]
  }
}

module.exports = nextConfig
