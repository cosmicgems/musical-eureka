const { withFrameworkConfig } = require("./src/framework/common/config")

module.exports = withFrameworkConfig({
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
  },
  framework: {
    name: process.env.NEXT_PUBLIC_FRAMEWORK
  },
  i18n: {
    locales: ["en-US", "es"],
    defaultLocale: "en-US"
  }
});

console.log("next.config.js", JSON.stringify(module.exports, null, 2))