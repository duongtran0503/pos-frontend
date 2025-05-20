import { Box } from '@mui/material';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Thanh toán',
};
export default function PaymentLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: ReactNode;
}) {
    return (
        <Box sx={{ marginTop: '70px', minHeight: '400px' }}>
            {children}
            {modal}
        </Box>
    );
}
