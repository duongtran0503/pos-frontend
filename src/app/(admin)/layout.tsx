import AdminHeader from '@/components/features/Header/AdminHeader';
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
            <AdminHeader />
            <Box
                sx={{
                    margin: '0 auto',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                    marginTop: '10px',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
