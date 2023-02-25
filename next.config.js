/** @type {import('next').NextConfig} */
const withSass = require("@zeit/next-sass");
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withSass(nextConfig);
