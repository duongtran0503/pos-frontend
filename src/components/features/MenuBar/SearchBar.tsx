'use client';
import { images } from '@/assets/images';
import { InputCustomStyle } from '@/components/common/Input/InputCustom';
import productService from '@/services/productService';
import { ProductType } from '@/types/product';
import { Box, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoIosCloseCircleOutline } from 'react-icons/io';
export default function SearchBar() {
    const [searchKey, setSearchKey] = useState<string>('');
    const [showResult, setShowResult] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<ProductType[]>([]);
    const [showNotProduct, setShowNotProduct] = useState<boolean>(false);

    const debounceSearch = useCallback(
        debounce(async (query: string) => {
            const products = await productService.searchProduct(query);

            setSearchValue(products);
        }, 600),
        []
    );

    const handleChangeInputSearch = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchKey(event.target.value);
        if (event.target.value.length > 2) {
            debounceSearch(event.target.value);
        } else {
            setSearchValue([]);
            setShowResult(false);
            setShowNotProduct(false);
        }
        console.log('run');
    };

    useEffect(() => {
        setShowResult(searchValue.length > 0);
        setShowNotProduct(searchKey.length > 2 && searchValue.length === 0);
    }, [searchValue, searchKey]);
    const handleCloseSearch = () => {
        setSearchKey('');
        setSearchValue([]);
        setShowNotProduct(false);
    };
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'white',
                    borderRadius: '10px',
                    padding: '2px 10px',
                    position: 'relative',
                }}
            >
                <label
                    htmlFor='input-search'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {' '}
                    <CiSearch size={30} />{' '}
                </label>
                <InputCustomStyle
                    autoComplete='off'
                    sx={{ width: '100%', height: '40px' }}
                    id='input-search'
                    placeholder='Nhập món ăn cần tim ?'
                    value={searchKey}
                    onChange={handleChangeInputSearch}
                    onFocus={() => {
                        setSearchKey('');
                    }}
                />
                {searchKey.length > 0 ? (
                    <Box sx={{ cursor: 'pointer' }} onClick={handleCloseSearch}>
                        <IoIosCloseCircleOutline size={25} />
                    </Box>
                ) : (
                    <></>
                )}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '120%',
                        left: 0,
                        right: 0,
                        height: 'auto',
                        background: 'white',
                        zIndex: '500',
                        borderRadius: '10px',
                        boxShadow:
                            ' rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                        padding: '10px',
                        visibility: showResult ? 'visible' : 'hidden',
                    }}
                >
                    {searchValue.map((product) => {
                        return (
                            <Box
                                key={nanoid()}
                                sx={{
                                    height: '80px',
                                    padding: '5px',
                                    display: 'flex',
                                    columnGap: '10px',
                                    borderBottom: '1px solid gray',
                                    transition: 'ease-in-out 0.1s',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        background: '#f5f4f2',
                                    },
                                }}
                            >
                                <Box>
                                    <Image
                                        src={product.image}
                                        alt='img'
                                        width={60}
                                        height={60}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: '15px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {' '}
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            fontFamily: 'unset',
                                        }}
                                    >
                                        {product.description}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                    <Box
                        sx={{
                            height: '80px',
                            padding: '5px',
                            display: showNotProduct ? 'flex' : 'none',
                            columnGap: '10px',
                            borderBottom: '1px solid gray',
                            transition: 'ease-in-out 0.1s',
                        }}
                    >
                        <Box>
                            <Image
                                src={images.not_food_result}
                                alt='img'
                                width={60}
                                height={60}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ fontSize: '14px' }}>
                                Món ăn cần tìm hiện không có trong cửa hàng!
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '120%',
                        left: 0,
                        right: 0,
                        height: 'auto',
                        background: 'white',
                        zIndex: '500',
                        borderRadius: '10px',
                        boxShadow:
                            ' rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                        padding: '10px',
                        visibility: showNotProduct ? 'visible' : 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            height: '80px',
                            padding: '5px',
                            display: showNotProduct ? 'flex' : 'none',
                            columnGap: '10px',
                            borderBottom: '1px solid gray',
                            transition: 'ease-in-out 0.1s',
                        }}
                    >
                        <Box>
                            <Image
                                src={images.not_food_result}
                                alt='img'
                                width={60}
                                height={60}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ fontSize: '14px' }}>
                                Món ăn cần tìm hiện không có trong cửa hàng!
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
