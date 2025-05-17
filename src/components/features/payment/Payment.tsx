'use client';
import LoadingOrder from '@/components/common/LoadingProduct/LoadingOrder';
import Logo from '@/components/common/Logo';
import CustomTabPanel, {
    a11yProps,
} from '@/components/common/Tab/CustomTabPanel';
import CommanderSurPlace from '@/components/features/payment/CommaderSurPlace';
import { OrderStatusEnum, OrderTypeEnum } from '@/constans/order';
import { PaymentStatusEnum } from '@/constans/payment';
import {
    orderSelector,
    resetOrder,
    setIsOrdered,
    updateOrderId,
} from '@/redux/slice/orderSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CreateOrderSchemaType } from '@/schemas/order';
import orderService from '@/services/orderService';
import formatPriceToVND from '@/utils/formatPriceToVND';
import {
    Box,
    Button,
    SelectChangeEvent,
    Skeleton,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

export default function Payment() {
    const orders = useAppSelector(orderSelector);
    const [value, setValue] = useState<number>(0);
    const [table, setTable] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [loadingGetTable, setLoadingGetTable] = useState<boolean>(true);
    const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleChangeSelectTable = (event: SelectChangeEvent) => {
        setTable(event.target.value as string);
        console.log(event.target.value);
    };
    const handleChangeStatusLoadingTable = (value: boolean) => {
        setLoadingGetTable(value);
    };

    const handleChangeSelectTag = (
        event: React.SyntheticEvent,
        newValue: number
    ) => {
        setValue(newValue);
    };
    const handleChangeNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
    };
    const handleOrder = async () => {
        if (table) {
            setIsLoadingOrder(true);
            const data: CreateOrderSchemaType = {
                customNotes: note,
                orderDetails: orders.listOrder.map((order) => ({
                    product: order.product._id,
                    quantity: order.quantity,
                })),
                table: table,
                finalAmount: orders.totalPrice,
                totalAmount: orders.totalPrice,
                discountAmount: 0,
                status: OrderStatusEnum.PROCESSING,
                orderType: OrderTypeEnum.DINE_IN,
                paymentStatus: PaymentStatusEnum.UNPAID,
            };
            const res = await orderService.createOrder(data);
            if (res) {
                dispatch(setIsOrdered(OrderStatusEnum.PROCESSING));
                dispatch(updateOrderId(res._id));
            }
        } else {
            toast.error('Vui lòng chọn bàn ăn!');
        }
        setIsLoadingOrder(false);
    };
    const handleNewOrder = () => {
        dispatch(resetOrder());
        router.push('/');
    };
    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: '10px',
                padding: '10px',
            }}
        >
            <Box
                sx={{
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: '1px solid gray',
                }}
            >
                <Logo />
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                }}
            >
                <Typography>
                    Tổng số món ăn: {orders.totalProduct} món
                </Typography>
                <Typography>
                    Tổng tiền cần thanh toán:
                    <Typography component={'span'} color='red'>
                        {formatPriceToVND(orders.totalPrice)}
                    </Typography>
                </Typography>
            </Box>
            {orders.orderStatus === OrderStatusEnum.PROCESSING ? (
                <Box
                    sx={{
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography>
                            Món ăn đang được chuẩn bị vui lòng chờ!
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <LoadingOrder />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '50px',
                        }}
                    >
                        <Button
                            loading={isLoadingOrder}
                            onClick={handleNewOrder}
                            sx={{
                                width: '100%',
                                background: '#fc5a03',
                                color: 'white',
                                borderRadius: '10px',
                                boxShadow:
                                    ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                '&:hover': {
                                    boxShadow:
                                        'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                },
                                textTransform: 'lowercase',
                            }}
                        >
                            Gọi Thêm món khác!
                        </Button>
                    </Box>
                </Box>
            ) : (
                <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChangeSelectTag}
                            aria-label='basic tabs example'
                        >
                            <Tab label='Ăn tại quán' {...a11yProps(0)} />
                            <Tab label='Giao tận nơi' {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <CommanderSurPlace
                            table={table}
                            handleChangeSelectTable={handleChangeSelectTable}
                            note={note}
                            handleChangeNote={handleChangeNote}
                            loadingGetTable={loadingGetTable}
                            handleChangeStatusLoadingTable={
                                handleChangeStatusLoadingTable
                            }
                        />
                        <Box sx={{ marginTop: '10px' }}>
                            {loadingGetTable ? (
                                <Skeleton height={40} />
                            ) : (
                                <Button
                                    loading={isLoadingOrder}
                                    onClick={handleOrder}
                                    sx={{
                                        width: '100%',
                                        background: '#fc5a03',
                                        color: 'white',
                                        borderRadius: '10px',
                                        boxShadow:
                                            ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                        '&:hover': {
                                            boxShadow:
                                                'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                        },
                                        textTransform: 'lowercase',
                                    }}
                                >
                                    Gọi món
                                </Button>
                            )}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Mang đi
                    </CustomTabPanel>
                </>
            )}
        </Box>
    );
}
