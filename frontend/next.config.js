/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'public/assets/scss')],
  },
  // images: {
  //   domains: ['localhost'], // Add 'localhost' or your domain name here
  // },
}

module.exports = nextConfig
