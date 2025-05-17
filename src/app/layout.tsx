import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeProviders from '@/providers/themeProvider';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ReduxProvider from '@/providers/reduxProvider';
import type { Metadata } from 'next';
import { inter } from '@/themes/font';
import { images } from '@/assets/images';

export const metadata: Metadata = {
    title: {
        template: '%s | Shrin Food - Trải nghiệm ẩm thực độc đáo',
        default: 'Shrin Food - Trải nghiệm ẩm thực độc đáo',
    },
    description:
        'Khám phá Shrin Food, nhà hàng mang đến những món ăn đặc sắc, hương vị tinh tế và trải nghiệm ẩm thực khó quên tại [Địa điểm nhà hàng]. Đặt bàn ngay!',
    icons: {
        icon: images.logo,
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='vi'>
            <body className={`${inter.variable} font-sans`}>
                <AppRouterCacheProvider>
                    <ThemeProviders>
                        <ReduxProvider>{children}</ReduxProvider>

                        <ToastContainer
                            position='top-center'
                            style={{ fontSize: '14px' }}
                        />
                    </ThemeProviders>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
