import LoadingPayment from '@/components/common/Loading/LoadingPayment';
import Payment from '@/components/features/payment/Payment';
import PaymentDetail from '@/components/features/payment/PaymentDetail';
import orderService from '@/services/orderService';
import { BillType } from '@/types/order';
import { Box, Grid } from '@mui/material';
interface Props {
    params: Promise<{ id: string }>;
}
export default async function PaymentPage(props: Props) {
    const bill: BillType | null = await orderService.getOrderById(
        (
            await props.params
        ).id
    );
    if (!bill) {
        return <LoadingPayment />;
    }
    return (
        <Box
            sx={{
                width: '1200px',
                margin: '0 auto',
            }}
        >
            {' '}
            <Grid container>
                <Grid size={{ md: 8 }} spacing={2}>
                    <Box
                        sx={{
                            background: 'white',
                            borderRadius: '10px',
                            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',

                            height: '100%',
                            margin: '5px',
                        }}
                    >
                        <PaymentDetail bill={bill} />
                    </Box>
                </Grid>
                <Grid size={{ md: 4 }}>
                    <Box
                        sx={{
                            height: '100%',
                            margin: '5px',
                        }}
                    >
                        <Payment bill={bill} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
