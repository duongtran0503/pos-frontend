import { images } from '@/assets/images';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link href={'/'} style={{ textDecoration: 'none', color: 'black' }}>
            <Box
                sx={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}
            >
                <Image src={images.logo} alt='logo' width={50} height={50} />
                <Typography variant='h1' sx={{ fontSize: '22px' }}>
                    Shrin Food
                </Typography>
            </Box>
        </Link>
    );
}
