/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    eslint: {
    ignoreDuringBuilds: true,
    },
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        NEXT_PUBLIC_CART_STORAGE_KEY: process.env.NEXT_PUBLIC_CART_STORAGE_KEY
    }
};

export default nextConfig;
