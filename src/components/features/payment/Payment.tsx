import { myBank } from '@/constans/bank';
import { BillType } from '@/types/order';
import formatPriceToVND from '@/utils/formatPriceToVND';
import generateQRCodeURL from '@/utils/generateQrCodeUrl';
import parseDateTime from '@/utils/parserTimeAndDate';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
interface Props {
    bill: BillType;
}
export default function Payment(props: Props) {
    return (
        <Box>
            <Box
                sx={{
                    padding: '8px',
                    background: 'white',
                    borderRadius: '10px',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                }}
            >
                <Typography>Thông tin đơn hàng</Typography>
                <Box>
                    <Typography sx={{ fontSize: '16px' }}>
                        Ngày đặt: {parseDateTime(props.bill.updatedAt).date}{' '}
                        {parseDateTime(props.bill.updatedAt).time}
                    </Typography>
                    <Typography sx={{ fontSize: '16px' }}>
                        Tổng sản phẩm: {props.bill.orderDetails.length}
                    </Typography>
                    <Typography sx={{ fontSize: '16px' }}>
                        Tổng tiền: {formatPriceToVND(props.bill.finalAmount)}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    padding: '8px',
                    background: 'white',
                    borderRadius: '10px',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    position: 'relative',
                    minHeight: '200px',
                    marginTop: '18px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '40px',
                        background: '#da3645',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ color: 'white', fontWeight: '600' }}>
                        Phương thức thanh toán
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: '50px',
                    }}
                >
                    <Image
                        src={generateQRCodeURL({
                            bankId: myBank.BANK_ID,
                            accountNo: myBank.ACCOUNT_NO,
                            description: myBank.DESCRIPTION,
                            amount: props.bill.finalAmount.toString(),
                        })}
                        alt='qr-code'
                        width={360}
                        height={500}
                    />
                </Box>
            </Box>
        </Box>
    );
}
