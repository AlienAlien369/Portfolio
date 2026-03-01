/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github-profile-summary-cards.vercel.app' },
      { protocol: 'https', hostname: 'streak-stats.demolab.com' },
      { protocol: 'https', hostname: 'github-readme-stats.vercel.app' },
      { protocol: 'https', hostname: 'github-readme-streak-stats.herokuapp.com' },
    ],
  },
}

module.exports = nextConfig
