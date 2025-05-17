import { DefaultLayout } from '@/components/layout/DefaultLayout/DefaultLayout';
import { Box } from '@mui/material';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box>
            <DefaultLayout>{children}</DefaultLayout>
        </Box>
    );
}
