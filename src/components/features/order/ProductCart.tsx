import { OrderType } from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
interface Props {
    order: OrderType;
}
export default function ProductCart(props: Props) {
    const { order } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100px',
                padding: '10px',
                borderRadius: '10px',
                columnGap: '10px',
                alignItems: 'center',
                background: 'white',
                justifyContent: 'space-between',
                margin: '10px 0',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    columnGap: '10px',
                }}
            >
                <Box
                    sx={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src={order.product.image}
                        alt=''
                        width={80}
                        height={80}
                    />
                </Box>
                <Box>
                    <Typography>
                        {order.product.name}

                        <Typography component={'span'} sx={{ color: 'red' }}>
                            x {order.quantity}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
            <Box>
                tạm tính:{' '}
                <Typography sx={{ color: 'red' }} component={'span'}>
                    {formatPriceToVND(order.product.price * order.quantity)}
                </Typography>
            </Box>
        </Box>
    );
}
