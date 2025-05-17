'use client';

import { Swiper as SwiperReact, SwiperSlide, SwiperRef } from 'swiper/react';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { images } from '@/assets/images';
import { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { CategoryType } from '@/types/category';
interface Props {
    menuItems: CategoryType[];
}
export default function Slider(props: Props) {
    const { menuItems } = props;
    const [isHover, setIsHover] = useState<boolean>(false);
    const swiperRef = useRef<SwiperRef>(null);
    const buttonNext = useRef(null);
    const buttonPrev = useRef(null);
    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };
    return (
        <Box
            sx={{ position: 'relative', width: '100%' }}
            component={'div'}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <SwiperReact
                navigation={{
                    nextEl: buttonNext.current,
                    prevEl: buttonPrev.current,
                }}
                slidesPerView={6}
                modules={[Navigation]}
                className='mySwiper'
                spaceBetween={'5px'}
                style={{
                    margin: '0 40px',
                }}
                ref={swiperRef}
            >
                {menuItems.map((item) => {
                    return (
                        <SwiperSlide key={nanoid()}>
                            <Link href={'/'}>
                                <Box
                                    sx={{
                                        width: '180px',
                                        height: '110px',
                                        borderRadius: '10px',
                                        border: '2px solid transparent',
                                        boxShadow:
                                            ' rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
                                        '&:hover': {
                                            borderColor: ' #ff5940',
                                            transition: 'ease-in 0.2s',
                                        },
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'rgba(78, 78, 78, 0.4)',
                                            zIndex: 10,
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 1,
                                        }}
                                    >
                                        <Image
                                            src={images.backround_menu}
                                            alt='menu-image'
                                            width={180}
                                            height={110}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 100,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            '&:hover': {
                                                background:
                                                    'rgba(78, 78, 78, 0.6)',
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </SwiperReact>
            {menuItems.length <= 6 ? (
                <></>
            ) : (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: '0',
                        visibility: isHover ? 'visible' : 'hidden',
                        transition: 'ease-in 0.2s',
                    }}
                >
                    <Box
                        ref={buttonPrev}
                        sx={{
                            background: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            '&:hover': {
                                border: '1px solid',
                            },
                        }}
                        onClick={handlePrev}
                    >
                        <GrFormPrevious />
                    </Box>
                    <Box
                        ref={buttonPrev}
                        sx={{
                            background: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            '&:hover': {
                                border: '1px solid',
                            },
                        }}
                        onClick={handleNext}
                    >
                        <MdNavigateNext />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
