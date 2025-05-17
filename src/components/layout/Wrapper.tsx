import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface WrapperProps extends BoxProps {
    children?: ReactNode;
}

export default function Wrapper({ children, ...rest }: WrapperProps) {
    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }} {...rest}>
            {children}
        </Box>
    );
}
