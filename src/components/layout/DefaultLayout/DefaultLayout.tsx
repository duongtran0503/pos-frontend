import Footer from '@/components/features/Footer/Footer';
import Header from '@/components/features/Header/Header';
import { Box } from '@mui/material';

interface Props {
    children: React.ReactNode;
    isHiddenButtonheader?: boolean;
}
export function DefaultLayout(props: Props) {
    const { children, isHiddenButtonheader } = props;
    return (
        <Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: '0',
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                }}
            >
                <Header isHiddenGroupButtonHeader={isHiddenButtonheader} />
            </Box>
            <Box sx={{ marginTop: '70px', minHeight: '400px' }}>{children}</Box>
            <Footer />
        </Box>
    );
}
