import Wrapper from '@/components/layout/Wrapper';
import { Box, Typography, Link, Grid } from '@mui/material';

const footerLinks = [
    { title: 'Giới thiệu', href: '/' },
    { title: 'Dịch vụ', href: '/' },
    { title: 'Liên hệ', href: '/' },
    { title: 'Điều khoản', href: '/' },
    { title: 'Bảo mật', href: '/' },
];

export default function Footer() {
    return (
        <Box
            component='footer'
            sx={{
                py: 4,
                background: 'white',

                margin: '0 auto',
                marginTop: '20px',
            }}
        >
            <Wrapper>
                <Grid container justifyContent='space-between'>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography
                            variant='h6'
                            color='text.primary'
                            gutterBottom
                        >
                            Về Chúng Tôi
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Shirin Food Website: Khám phá thực đơn [loại hình ẩm
                            thực] đặc sắc, xem ảnh món ăn, không gian nhà hàng,
                            ưu đãi và sự kiện. Tiện lợi đặt bàn, xem địa chỉ,
                            giờ mở cửa. Kết nối dễ dàng với hương vị Shirin
                            Food.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography
                            variant='h6'
                            color='text.primary'
                            gutterBottom
                        >
                            Liên kết Hữu ích
                        </Typography>
                        {footerLinks.map((link) => (
                            <Typography
                                key={link.title}
                                variant='body2'
                                color='text.secondary'
                            >
                                <Link
                                    href={link.href}
                                    color='inherit'
                                    sx={{ textDecoration: 'none' }}
                                >
                                    {link.title}
                                </Link>
                            </Typography>
                        ))}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography
                            variant='h6'
                            color='text.primary'
                            gutterBottom
                        >
                            Liên hệ
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Địa chỉ: 68-76 Đ. Tản Đà, Phường 11, Quận 5, Hồ Chí
                            Minh 700000
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Email: shrinfood@gmail.com
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Điện thoại: : 028 3856 3888
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant='body2' color='text.secondary'>
                        Copyright © Your Website {new Date().getFullYear()}. All
                        rights reserved.
                    </Typography>
                </Box>
            </Wrapper>
        </Box>
    );
}
