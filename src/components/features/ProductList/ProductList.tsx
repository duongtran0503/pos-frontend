'use client';
import { images } from '@/assets/images';
import Product from '@/components/features/Product/Product';
import Wrapper from '@/components/layout/Wrapper';
import { ProductType } from '@/types/product';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { RefObject } from 'react';

interface Props {
    products: ProductType[];
    allProductLoaded: boolean;
    loadingLoadMore: boolean;
    loadMoreRef: RefObject<HTMLDivElement | null>;
}
export default function ProductList(props: Props) {
    const { products, loadingLoadMore, loadMoreRef } = props;
    if (products.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ marginBottom: '10px' }}>
                        Sản phẩm hiển không có trong cửa hàng vui lòng quy trở
                        lại sau!
                    </Typography>
                    <Image
                        src={images.not_food_result}
                        alt='not-food'
                        width={200}
                        height={200}
                    />
                </Box>
            </Box>
        );
    }
    return (
        <Box sx={{ marginTop: '10px' }}>
            <Wrapper>
                <Box sx={{ marginTop: '20px' }}>
                    <Grid container spacing={2} rowGap={4}>
                        {products.map((product) => {
                            return (
                                <Grid size={{ xs: 12 / 5 }} key={nanoid()}>
                                    <Product product={product} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                {loadingLoadMore ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <></>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10px',
                    }}
                    ref={loadMoreRef}
                ></Box>
            </Wrapper>
        </Box>
    );
}
