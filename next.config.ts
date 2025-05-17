import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/thanh-toan',
                destination: '/payment',
            },
            {
                source: '/dat-mon',
                destination: '/order',
            },
            {
                source: '/san-pham/:slug',
                destination: '/product/:slug',
            },
            {
                source: '/manager-order',
                destination: '/managerOrder',
            },
        ];
    },
};

export default nextConfig;
