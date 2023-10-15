module.exports = {
  publicRuntimeConfig: {
      APP_NAME: 'Pearl Box',
      API_DEVELOPMENT: 'http://localhost:3000',
      API_PRODUCTION: 'musical-eureka-git-main-cosmicgems.vercel.app',
      PRODUCTION: true,
      DOMAIN_DEVELOPMENT: 'http://localhost:3000',
      DOMAIN_PRODUCTION: 'https://pearlbox.co',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
    ]
  }
};