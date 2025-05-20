'use client';
import React from 'react';
import { ProductType } from '@/types/product';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Grid, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { MdAddShoppingCart } from 'react-icons/md';
import { useAppDispatch } from '@/redux/store';
import { addProductToOrder } from '@/redux/slice/paymentSlice';

interface Props {
    listProducts: ProductType[];
}
export default React.memo(function ListProduct({ listProducts }: Props) {
    const dispatch = useAppDispatch();

    const handleAddProductToOrder = (product: ProductType) => {
        dispatch(addProductToOrder(product));
    };
    return (
        <Grid container spacing={4}>
            {listProducts.map((product) => {
                return (
                    <Grid key={nanoid()} size={{ sm: 6 }}>
                        <Box
                            sx={{
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: '8px',
                                boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                minHeight: '100px',
                                transition: 'box-shadow ease-in 0.2s',
                                '&:hover': {
                                    boxShadow:
                                        ' rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        width: '70px',
                                        height: '70px',
                                        marginRight: '10px',
                                    }}
                                >
                                    <Image
                                        src={product.image}
                                        alt='product'
                                        width={70}
                                        height={70}
                                    />
                                </Box>
                                <Box>
                                    <Typography>{product.name}</Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '16px',
                                        }}
                                    >
                                        {formatPriceToVND(product.price)}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '8px',
                                    cursor: 'pointer',
                                }}
                                component={'div'}
                                onClick={() => handleAddProductToOrder(product)}
                            >
                                <MdAddShoppingCart />
                            </Box>
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
});
