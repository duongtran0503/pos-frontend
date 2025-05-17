// app/loading.tsx
'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
        >
            <CircularProgress color='primary' />
            <Typography mt={2}>Đang tải ứng dụng...</Typography>
        </Box>
    );
}
