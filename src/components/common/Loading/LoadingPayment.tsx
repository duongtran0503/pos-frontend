import { Box, Grid, Skeleton } from '@mui/material';

export default function LoadingPayment() {
    return (
        <Box
            sx={{
                width: '1200px',
                margin: '0 auto',
            }}
        >
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
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Skeleton height={400} width={400} />
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ md: 4 }}>
                    <Box
                        sx={{
                            height: '100%',
                            margin: '5px',
                        }}
                    >
                        <Box
                            sx={{
                                background: 'white',
                                borderRadius: '10px',
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',

                                height: '100%',
                                margin: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Skeleton height={300} width={200} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
