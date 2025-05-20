import { BillType } from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import { Box, Button, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import Link from 'next/link';

interface Props {
    bill: BillType;
}
export default function PaymentDetail(props: Props) {
    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: '10px',
                padding: '8px',
                minHeight: '500px',
            }}
        >
            <Box
                sx={{
                    minHeight: '500px',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ borderBottom: '1px solid rgb(207, 209, 211)' }}>
                        <Typography
                            sx={{ fontWeight: '600', fontSize: '16px' }}
                        >
                            Sản phẩm
                        </Typography>
                        {props.bill.orderDetails.map((order) => {
                            return (
                                <Box key={nanoid()}>
                                    <Typography sx={{ fontSize: '16px' }}>
                                        {order.product.name}{' '}
                                        <span style={{ fontSize: '14px' }}>
                                            x{order.quantity}
                                        </span>
                                    </Typography>
                                    <Typography
                                        component={'span'}
                                        sx={{
                                            fontSize: '12px',
                                            fontWeight: '400',
                                        }}
                                    >
                                        {' '}
                                        Tổng tiền:
                                        {formatPriceToVND(
                                            order.product.price * order.quantity
                                        )}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                    <Box
                        sx={{
                            borderBottom: '1px solid rgb(207, 209, 211)',
                            minHeight: '80px',
                        }}
                    >
                        <Typography sx={{ fontSize: '14px' }}>
                            Phương thực phục vụ:ăn tại nhà hàng
                        </Typography>
                        <Typography sx={{ fontSize: '14px' }}>
                            Vị trí: bàn {props.bill.table.tableNumber}
                        </Typography>
                        <Typography sx={{ fontSize: '14px' }}>
                            Tổng tiền cần thanh toán:
                            {formatPriceToVND(props.bill.finalAmount)}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Link
                        href={`/thanh-toan/goi-them-mon-khac/${props.bill._id}`}
                    >
                        <Button
                            sx={{
                                textTransform: 'unset',
                                border: '1px solid ',
                            }}
                        >
                            Gọi thêm món khác!
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
