import { images } from '@/assets/images';
import { BillType } from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
interface Props {
    bill: BillType;
    printRef: React.RefObject<HTMLDivElement | null> | null;
}
export default function FormatPDFOrder(props: Props) {
    const { bill, printRef } = props;
    return (
        <Box
            sx={{
                maxWidth: 400,
                p: 2,
                fontFamily: 'monospace',
                backgroundColor: '#fff',
                color: '#000',
            }}
            component={'div'}
            ref={printRef}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '5px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '8px',
                    }}
                >
                    <Image
                        src={images.logo}
                        alt='logo'
                        width={30}
                        height={30}
                    />
                    <Typography variant='h1' sx={{ fontSize: '22px' }}>
                        Shrin Food
                    </Typography>
                </Box>
            </Box>
            <Typography variant='body2' align='center'>
                306-308 Lê Văn Sỹ,
            </Typography>
            <Typography variant='body2' align='center'>
                P. 1, Q. Tân Bình, TP.HCM
            </Typography>
            <Typography variant='body2' align='center'>
                Tel: 0906.79.79.32
            </Typography>
            <Divider
                sx={{ my: 1, border: '1px solid black', borderStyle: 'dashed' }}
            />
            <Typography variant='body2'>
                Bàn số: {bill.table.tableNumber}
            </Typography>
            <Typography variant='body2'>
                {dayjs(bill.createdAt).format('DD-MM-YYYY HH:mm')}
            </Typography>
            <Divider
                sx={{ my: 1, border: '1px solid black', borderStyle: 'dashed' }}
            />

            {bill.orderDetails.map((item, index) => (
                <Box key={index} display='flex' justifyContent='space-between'>
                    <Typography
                        variant='body2'
                        sx={{
                            wordWrap: 'break-word',
                            maxWidth: '160px',
                        }}
                    >
                        {item.product.name}x{item.quantity}
                    </Typography>
                    <Typography variant='body2'>
                        {formatPriceToVND(item.product.price * item.quantity)}
                    </Typography>
                </Box>
            ))}

            <Divider
                sx={{ my: 1, border: '1px solid black', borderStyle: 'dashed' }}
            />
            <Box display='flex' justifyContent='space-between'>
                <Typography variant='body2'>Tổng tiền:</Typography>
                <Typography variant='body2'>
                    {formatPriceToVND(bill.totalAmount)}
                </Typography>
            </Box>

            <Box display='flex' justifyContent='space-between'>
                <Typography variant='body2'>Giảm giá:</Typography>
                <Typography variant='body2'>
                    {formatPriceToVND(bill.discountAmount)}
                </Typography>
            </Box>

            <Box display='flex' justifyContent='space-between'>
                <Typography variant='body2' fontWeight='bold'>
                    Tổng tiền cần thu:
                </Typography>
                <Typography variant='body2' fontWeight='bold'>
                    {formatPriceToVND(bill.finalAmount)}
                </Typography>
            </Box>
            <Divider
                sx={{ my: 1, border: '1px solid black', borderStyle: 'dashed' }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ fontSize: '14px' }}>
                    {formatPriceToVND(bill.finalAmount)}
                </Typography>
                <Image
                    src={images.image_or_code}
                    alt='qr-code'
                    width={150}
                    height={150}
                />
            </Box>
            <Typography align='center' variant='body2'>
                THANK YOU
            </Typography>
        </Box>
    );
}
