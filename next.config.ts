import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img.vietqr.io',
                pathname: '/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/thanh-toan/:id',
                destination: '/payment/:id',
            },
            {
                source: '/thanh-toan/goi-them-mon-khac/:id',
                destination: '/payment/add/:id',
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
