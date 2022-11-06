/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://reactjs.org/blog/2022/03/29/react-v18.html#new-strict-mode-behaviors
  // It was set to true, but it causes double renders in dev mode which is confusing and annoying
  reactStrictMode: false,
}

module.exports = nextConfig
