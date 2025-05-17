'use client';

import { CategoryTypeEnum } from '@/constans/category';
import { localStorageName } from '@/constans/localStorage';
import { Box, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const menuItem: { title: string; url: string }[] = [
    { title: 'Đồ ăn', url: '/' },
    { title: 'Thực phẩm', url: '/san-pham/' + CategoryTypeEnum.BEVERAGE },
    { title: 'Rượu bia', url: '/' },
    { title: 'Đặt bàn', url: '/' },
    { title: 'Thuốc', url: '/' },
];
export default function Navigation() {
    const [itemActive, setItemActice] = useState<number>(-1);
    useEffect(() => {
        const value =
            localStorage.getItem(localStorageName.NAV_ACTIVE_ITEM) ?? 0;
        const index = typeof value === 'string' ? JSON.parse(value) : 0;
        setItemActice(index);
    }, []);
    return (
        <Box>
            <Box
                sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}
            >
                {menuItem.map((item, index) => {
                    const active = itemActive === index;
                    return (
                        <Link key={nanoid()} href={item.url}>
                            <Box
                                sx={{
                                    padding: '10px 12px 20px',
                                    color: '#ff5940',
                                    paddingBottom: '20px',
                                    borderBottom: active
                                        ? '4px solid #ff5940'
                                        : '4px solid transparent',
                                }}
                                onClick={() => {
                                    localStorage.setItem(
                                        localStorageName.NAV_ACTIVE_ITEM,
                                        JSON.stringify(index)
                                    );

                                    setItemActice(index);
                                }}
                            >
                                <Typography
                                    component={'span'}
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: active ? '800' : '400',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
}
