'use client';
import LoadingProduct from '@/components/common/Loading/LoadingProduct';
import ProductList from '@/components/features/ProductList/ProductList';
import Wrapper from '@/components/layout/Wrapper';
import { ProductTypeEnum, SortProductBy } from '@/constans/product';
import productService from '@/services/productService';
import { ProductType } from '@/types/product';
import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
interface Props {
    typeProduct: ProductTypeEnum;
}
export default function ProductSection(props: Props) {
    const [productList, setProductList] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allProductsLoaded, setAllProductLoaded] = useState<boolean>(true);
    const [sortProductValue, setSortProductValue] = useState<string>(
        SortProductBy.NONE
    );
    const [page, setPage] = useState<number>(1);
    const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const getProduct = async () => {
            const productList = await productService.getProducts({
                type: props.typeProduct,
            });
            setProductList(productList.products);
            if (productList.currentItemsPerPage === productList.totalProduct) {
                setAllProductLoaded(true);
            } else {
                setAllProductLoaded(false);
            }
            setPage(productList.page ?? 1);
        };
        getProduct();
        setIsLoading(false);
    }, []);
    useEffect(() => {
        const sortedProducts = [...productList];

        if (sortProductValue === SortProductBy.ASC) {
            sortedProducts.sort((p1, p2) => p1.price - p2.price);
        } else if (sortProductValue === SortProductBy.DESC) {
            sortedProducts.sort((p1, p2) => p2.price - p1.price);
        }

        setProductList(sortedProducts);
    }, [sortProductValue]);

    useEffect(() => {
        const getMoreProduct = async (page: number) => {
            setLoadingLoadMore(true);
            const nextPage = page + 1;
            const products = await productService.getProducts({
                type: ProductTypeEnum.FOOD,
                page: nextPage,
                itemPerpage: 5,
            });
            const newProducts = [...productList, ...products.products];
            setProductList(newProducts);

            setPage(products.page);
            if (products.currentItemsPerPage === products.totalProduct) {
                setAllProductLoaded(true);
            }
            setLoadingLoadMore(false);
        };

        const obServer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && !allProductsLoaded) {
                getMoreProduct(page);
            }
        });
        const currentLoadMoreRef = loadMoreRef.current;
        if (currentLoadMoreRef) {
            obServer.observe(currentLoadMoreRef);
        }

        return () => {
            if (currentLoadMoreRef) {
                obServer.unobserve(currentLoadMoreRef);
            }
        };
    }, [allProductsLoaded, page]);
    return (
        <Box>
            <Wrapper>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'white',
                        padding: ' 0 10px',
                        height: '60px',
                    }}
                >
                    <Typography>Món ăn nổi bật</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <Typography>Hiển thị theo giá:</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '5px',
                            }}
                        >
                            <RadioGroup
                                aria-label='sort-direction'
                                name='sort-direction-group'
                                row
                                value={sortProductValue}
                                onChange={(e) =>
                                    setSortProductValue(e.target.value)
                                }
                            >
                                <FormControlLabel
                                    value={SortProductBy.ASC}
                                    control={<Radio />}
                                    label={<FaSortAmountUp />}
                                />
                                <FormControlLabel
                                    value={SortProductBy.DESC}
                                    control={<Radio />}
                                    label={<FaSortAmountDown />}
                                />
                            </RadioGroup>
                        </Box>
                    </Box>
                </Box>
            </Wrapper>
            {isLoading ? (
                <LoadingProduct />
            ) : (
                <ProductList
                    products={productList}
                    allProductLoaded={allProductsLoaded}
                    loadingLoadMore={loadingLoadMore}
                    loadMoreRef={loadMoreRef}
                />
            )}
        </Box>
    );
}
