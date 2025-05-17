import { inter } from '@/themes/font';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#f0f2f5',
        },
    },
    typography: {
        fontSize: 16,
        fontFamily: `${inter.style.fontFamily}`,
        h1: {
            fontWeight: '800',
            fontSize: '20px',
        },
    },
});

export default theme;
