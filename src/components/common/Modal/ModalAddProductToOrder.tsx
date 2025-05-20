'use client';
import LoadingProduct from '@/components/common/Loading/LoadingProduct';
import SearchBar from '@/components/features/MenuBar/SearchBar';
import NewProductOfOrder from '@/components/features/order/NewProductOfOrder';
import ListProduct from '@/components/features/ProductList/ListProductForModal';
import { ProductTypeEnum } from '@/constans/product';
import productService from '@/services/productService';
import { BillType } from '@/types/order';
import { ProductType } from '@/types/product';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Grid, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

interface Props {
    id: string;
    bill: BillType;
}
export default function ModalAddProductToOrder(props: Props) {
    const [listProducts, setListProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true);
            const res = await productService.getProducts({
                type: ProductTypeEnum.FOOD,
            });
            setListProducts(res.products);
            setIsLoading(false);
        };
        getProduct();
    }, []);

    return (
        <Box
            sx={{
                width: '1000px',
                height: '700px',
                background: 'white',
                borderRadius: '10px',
            }}
        >
            <Grid container>
                <Grid size={{ md: 8 }}>
                    <Box
                        sx={{
                            padding: '8px',
                            borderRadius: '8px',
                            height: '100%',
                            minHeight: '700px',
                            maxHeight: '700px',
                            overflow: 'hidden',
                            overflowY: 'scroll',
                            scrollbarWidth: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                                borderRadius: '8px',
                            }}
                        >
                            <SearchBar />
                        </Box>
                        <Box
                            sx={{
                                marginTop: '10px',
                            }}
                        >
                            {isLoading ? (
                                <LoadingProduct />
                            ) : (
                                <ListProduct listProducts={listProducts} />
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ md: 4 }}>
                    <Box
                        sx={{
                            padding: '8px',
                            boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            borderRadius: '8px',
                            height: '100%',
                            minHeight: '700px',
                            maxHeight: '700px',
                        }}
                    >
                        <Typography sx={{ fontWeight: '500' }}>
                            Đơn hàng hiện tại
                        </Typography>
                        <Box
                            sx={{
                                borderBottom: '1px solid GrayText',
                                paddingBottom: '10px',
                            }}
                        >
                            <Typography sx={{ fontSize: '16px' }}>
                                Sản phẩm
                            </Typography>
                            <Box>
                                {props.bill.orderDetails.map((order) => {
                                    return (
                                        <Box key={nanoid()}>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: 'GrayText',
                                                }}
                                            >
                                                {order.product.name} x{' '}
                                                <span>{order.quantity}</span>
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Typography sx={{ fontSize: '16px' }}>
                                Tổng tiền:{' '}
                                {formatPriceToVND(props.bill.finalAmount)}
                            </Typography>
                        </Box>
                        <Typography>Thêm sản phẩm mới</Typography>
                        <NewProductOfOrder bill={props.bill} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
