import AdminNav from '@/components/common/Navigation/AdminNav';
import Wrapper from '@/components/layout/Wrapper';
import { Box } from '@mui/material';

export default function AdminHeader() {
    return (
        <Box
            sx={{
                height: '60px',
                background: 'white',
            }}
        >
            <Wrapper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <AdminNav />
            </Wrapper>
        </Box>
    );
}
