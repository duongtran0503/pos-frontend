'use client';
import ButtonCustom from '@/components/common/Button/ButtonCustom';
import ModalLogin from '@/components/common/Modal/ModalLogin';
import ModalWrapper from '@/components/common/Modal/ModalWrapper';
import ShoppingCart from '@/components/features/ShoppingCart/ShoppingCart';
import { OrderStatusEnum } from '@/constans/order';
import { orderSelector, resetOrder } from '@/redux/slice/orderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import orderService from '@/services/orderService';
import formatPriceToVND from '@/utils/formatPriceToVND';
import getAccessToken from '@/utils/getAccessToken';
import getOrderFromLocalStorage from '@/utils/getOrderFromLocalStorage';
import {
    Box,
    ListItemIcon,
    Menu,
    MenuItem,
    Skeleton,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaCartShopping } from 'react-icons/fa6';
import { MdOutlineDashboard } from 'react-icons/md';
export default function GroupButtonHeader() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
    const [isOpenModalogin, setIsOpentModalLogin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const orders = useAppSelector(orderSelector);
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        const token = getAccessToken();
        if (token) setIsLogin(true);
    }, []);
    useEffect(() => {
        const getOrder = async (id: string) => {
            const order = await orderService.getOrderById(id);
            if (order) {
                dispatch(
                    resetOrder({
                        listOrder: order.orderDetails.map((order) => ({
                            product: order.product,
                            quantity: order.quantity,
                        })),
                        totalPrice: order.finalAmount,
                        totalProduct: order.orderDetails.length,
                        orderStatus: order.status as OrderStatusEnum,
                        id: order._id,
                    })
                );
            }
        };
        const orders = getOrderFromLocalStorage();
        if (orders) {
            if (orders.id) {
                getOrder(orders.id);
            } else {
                dispatch(resetOrder(orders));
            }
        }
        setIsLoading(false);
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        router.refresh();
        setIsLogin(false);
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginRight: '5px' }}>
                {isLogin ? (
                    <ButtonCustom
                        sx={{ fontSize: '12px' }}
                        onClick={handleClick}
                    >
                        tài khoản
                    </ButtonCustom>
                ) : (
                    <ButtonCustom
                        sx={{ fontSize: '12px' }}
                        onClick={() => setIsOpentModalLogin(true)}
                    >
                        Đăng nhập
                    </ButtonCustom>
                )}
            </Box>
            <ModalWrapper
                isOpen={isOpenModalogin}
                onClose={() => setIsOpentModalLogin(false)}
            >
                <ModalLogin />
            </ModalWrapper>
            {isLoading ? (
                <>
                    <Skeleton height={40} width={80} />
                </>
            ) : (
                <Box
                    sx={{
                        padding: ' 0 10px',
                        paddingTop: '8px',
                        display: 'flex',
                        borderRight: '1px slolid rgb(177, 177, 177)',
                        alignItems: 'center',
                        columnGap: '5px',
                        cursor: 'pointer',
                        position: 'relative',
                        width: '145px',
                    }}
                    onClick={() => setIsOpenCart(true)}
                >
                    <FaCartShopping size={25} color='#ff5940' />
                    <Box>
                        <Typography sx={{ fontSize: '10px' }}>
                            Số món ăn:{orders.totalProduct}
                        </Typography>
                        <Typography sx={{ fontSize: '10px' }}>
                            Tổng tiền:{formatPriceToVND(orders.totalPrice)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '1px',
                            top: '0',
                            bottom: '0',
                            width: '2px',
                            borderRadius: '10%',
                            background: 'rgb(177, 177, 177)',
                        }}
                    ></Box>
                </Box>
            )}
            <ShoppingCart
                isOpen={isOpenCart}
                onClose={() => setIsOpenCart(false)}
            />
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 100,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    sx={{ width: '200px', fontSize: '16px' }}
                    onClick={() => router.push('/manager-order')}
                >
                    <ListItemIcon>
                        <MdOutlineDashboard size={20} />
                    </ListItemIcon>
                    Quản lý
                </MenuItem>
                <MenuItem
                    sx={{ width: '200px', fontSize: '16px' }}
                    onClick={handleLogout}
                >
                    <ListItemIcon>
                        <CiLogout size={20} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}
