/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_URL: process.env.POSTGRES_URL,
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
        POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        DATABASE_URL: process.env.DATABASE_URL,
        BCRYPT_COST: process.env.BCRYPT_COST,
        JWT_KEY: process.env.JWT_KEY,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
        EXPIRES_IN: process.env.EXPIRES_IN,
        SECRET: process.env.SECRET,
    }
};

export default nextConfig;
