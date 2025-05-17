import ListProductOrder from '@/components/features/order/ListProductOrder';
import Payment from '@/components/features/payment/Payment';
import Wrapper from '@/components/layout/Wrapper';
import { Box, Grid } from '@mui/material';

export default function OrderPage() {
    return (
        <Box>
            <Wrapper>
                <Box sx={{ marginTop: '10px' }}>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 8 }}>
                            <ListProductOrder />
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Payment />
                        </Grid>
                    </Grid>
                </Box>
            </Wrapper>
        </Box>
    );
}
