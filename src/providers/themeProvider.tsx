'use client';
import theme from '@/themes';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function ThemeProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
