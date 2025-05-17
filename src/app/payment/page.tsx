import { Box, Grid } from '@mui/material';

export default function PaymentPage() {
    return (
        <Box>
            <Grid container>
                <Grid size={{ xs: 8 }}>order</Grid>
                <Grid size={{ xs: 4 }}>payment</Grid>
            </Grid>
        </Box>
    );
}
