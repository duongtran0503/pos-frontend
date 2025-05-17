import { DefaultLayout } from '@/components/layout/DefaultLayout/DefaultLayout';
import { Box } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đặt món ăn',
};
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box>
            <DefaultLayout isHiddenButtonheader={true}>
                {children}
            </DefaultLayout>
        </Box>
    );
}
