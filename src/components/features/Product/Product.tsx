'use client';
import ModalDetailProduct from '@/components/common/Modal/ModalDetailProduct';
import ModalWrapper from '@/components/common/Modal/ModalWrapper';
import { OrderStatusEnum } from '@/constans/order';
import { addProduct, orderSelector } from '@/redux/slice/orderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ProductType } from '@/types/product';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';

interface Props {
    product: ProductType;
}
export default function Product(props: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { product } = props;
    const orders = useAppSelector(orderSelector);
    const dispatch = useAppDispatch();
    const handleAddToCart = (product: ProductType) => {
        if (orders.orderStatus === OrderStatusEnum.PROCESSING) {
            toast.warn(
                'Các món ăn hiện tại đang được chuẩn bị vui lòng chở để gọi thêm!'
            );
            return;
        }
        if (
            orders.listOrder.some((order) => order.product._id === product._id)
        ) {
            toast.warning('Sản phẩm đã có trong giỏ hàng');
        } else {
            dispatch(addProduct({ product, quantity: 1 }));
            toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
        }
    };
    return (
        <>
            <Box
                onClick={() => setIsOpen(true)}
                sx={{
                    width: '220px',
                    height: '260px',
                    maxHeight: '260px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    transition: 'box-shadow  0.2s',
                    background: 'white',
                    boxShadow:
                        ' rgba(0, 0, 0, 0.02) 0px 1px 3px 1px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                    '&:hover': {
                        boxShadow:
                            ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '160px',
                        borderRadiusL: '10px',
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={240}
                        height={160}
                    />
                </Box>
                <Box
                    sx={{
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100px',
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                                maxWidth: '220px',
                                fontWeight: '600',
                                fontSize: '16px',
                            }}
                        >
                            {product.name}
                        </Typography>
                    </Box>

                    {product.isAvailable ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'rgb(234, 94, 78)',
                                }}
                            >
                                {formatPriceToVND(product.price)}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '10px',
                                    border: '1px solid rgb(247, 75, 75)',
                                    borderRadius: '20%',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow:
                                            ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                    },
                                }}
                                component={'button'}
                                title='Thêm vào giỏ hàng'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product);
                                }}
                            >
                                <MdOutlineAddShoppingCart />
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            <Typography sx={{ color: 'red' }}>
                                Món ăn đẵ hết
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            <ModalWrapper isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalDetailProduct
                    product={product}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </ModalWrapper>
        </>
    );
}
