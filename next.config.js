/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // PostCSS 비활성화 (Tailwind 제거 후)
  webpack: (config) => {
    config.module.rules = config.module.rules.filter(rule => {
      if (rule.test && rule.test.toString().includes('css')) {
        return false;
      }
      return true;
    });
    return config;
  },
}

module.exports = nextConfig
