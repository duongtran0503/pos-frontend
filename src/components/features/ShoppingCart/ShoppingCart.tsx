'use client';
import ButtonCustom from '@/components/common/Button/ButtonCustom';
import ItemCart from '@/components/features/ShoppingCart/ItemCart';

import { orderSelector } from '@/redux/slice/orderSlice';
import { useAppSelector } from '@/redux/store';

import formatPriceToVND from '@/utils/formatPriceToVND';

import { Box, Drawer, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
export default function ShoppingCart(props: Props) {
    const { isOpen, onClose } = props;

    const orders = useAppSelector(orderSelector);
    const router = useRouter();

    const handleOrder = () => {
        if (orders.listOrder.length === 0) {
            toast.warn('Bạn chưa thêm món ăn nào vào giỏ hàng!');
        } else {
            router.push('/dat-mon');
        }
    };
    return (
        <Box>
            <Drawer open={isOpen} onClose={onClose} anchor='right'>
                <Box
                    sx={{
                        width: '600px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',

                        height: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {' '}
                        <Typography>Giỏ hàng</Typography>
                    </Box>
                    <Box
                        sx={{
                            height: '1px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            flexGrow: 1,
                            padding: 2,
                        }}
                    >
                        {orders.listOrder.map((order) => (
                            <ItemCart key={nanoid()} order={order} />
                        ))}
                        {orders.totalProduct === 0 ? (
                            <Box
                                sx={{
                                    height: '100px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography sx={{ fontWeight: '600' }}>
                                    Bạn chưa thêm món ăn nào
                                </Typography>
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box
                        sx={{
                            height: '140px',
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTop: '1px solid #ccc',
                        }}
                    >
                        <Box sx={{ marginBottom: '10px' }}>
                            <Typography>
                                Tồng tiền cần thanh toán:
                                <Typography
                                    sx={{
                                        color: 'red',
                                    }}
                                    component={'span'}
                                >
                                    {formatPriceToVND(orders.totalPrice)}
                                </Typography>
                            </Typography>
                        </Box>
                        <ButtonCustom
                            sx={{ width: '100%' }}
                            onClick={handleOrder}
                        >
                            Đăt món
                        </ButtonCustom>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}
