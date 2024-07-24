/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SESSION_SECRET: process.env.SECRET_KEY,
  },
};

export default nextConfig;
