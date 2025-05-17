'use client';
import ButtonCustom from '@/components/common/Button/ButtonCustom';
import { OrderStatusEnum } from '@/constans/order';
import { addProduct, orderSelector } from '@/redux/slice/orderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ProductType } from '@/types/product';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { IoAddOutline, IoCloseSharp } from 'react-icons/io5';
import { RiSubtractFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
interface Props {
    product: ProductType;
    onClose: () => void;
    isOpen?: boolean;
}
export default function ModalDetailProduct(props: Props) {
    const { product, onClose } = props;
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useAppDispatch();
    const orders = useAppSelector(orderSelector);
    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };
    const handleAddProductToCart = (product: ProductType, quantity: number) => {
        if (orders.orderStatus === OrderStatusEnum.PROCESSING) {
            toast.warn(
                'Các món ăn hiện tại đang được chuẩn bị vui lòng chờ để gọi thêm!'
            );
            return;
        }
        if (
            orders.listOrder.some((order) => order.product._id === product._id)
        ) {
            toast.warn('Sản phẩm đã có trong giỏ hàng!');
        } else {
            dispatch(addProduct({ product, quantity }));
            toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
        }
    };
    return (
        <Box
            sx={{
                background: 'white',
                width: '800px',
                minHeight: '500px',
                borderRadius: '10px',
                padding: '10px',
                position: 'relative',
            }}
        >
            <Grid container>
                <Grid size={{ xs: 6 }}>
                    <Box
                        sx={{
                            borderRadius: '8px',
                            boxShadow:
                                ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                width: '360px',
                                height: '360px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={360}
                                height={360}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Box
                        sx={{
                            padding: '10px',
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{ fontWeight: '600', fontSize: '20px' }}
                            >
                                {product.name}
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'red',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                }}
                            >
                                {formatPriceToVND(product.price)}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                marginTop: '10px',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
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
                                            padding: '5px',
                                            border: '1px solid gray',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '20%',
                                            '&:hover': {
                                                boxShadow:
                                                    ' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                                            },
                                        }}
                                        component={'div'}
                                        onClick={handleIncrease}
                                    >
                                        <IoAddOutline />
                                    </Box>
                                    <Box
                                        sx={{
                                            minWidth: '20px',
                                        }}
                                    >
                                        <Typography>{quantity}</Typography>
                                    </Box>
                                    <Box
                                        onClick={handleDecrease}
                                        sx={{
                                            padding: '5px',
                                            border: '1px solid gray',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '20%',
                                            '&:hover': {
                                                boxShadow:
                                                    ' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                                            },
                                            ':disabled': {
                                                background: 'gray',
                                            },
                                        }}
                                    >
                                        <RiSubtractFill />
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography>
                                        Tạm tính:{' '}
                                        {formatPriceToVND(
                                            quantity * product.price
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: '14px' }}>
                                <ButtonCustom
                                    onClick={() => {
                                        handleAddProductToCart(
                                            product,
                                            quantity
                                        );
                                        onClose();
                                    }}
                                >
                                    Thêm vào giỏ hàng
                                </ButtonCustom>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ marginTop: '10px' }}>
                <Typography
                    sx={{
                        fontWeight: '600',
                    }}
                >
                    Mô tả món ăn
                </Typography>
                <Typography>{product.description}</Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    padding: '8px',
                    borderRadius: '50%',
                    background: '#ff5940',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        border: '1px solid gray',
                    },
                }}
                onClick={() => onClose()}
            >
                <IoCloseSharp color='white' />
            </Box>
        </Box>
    );
}
