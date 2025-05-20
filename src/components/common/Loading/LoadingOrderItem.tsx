import { Box, Grid, Skeleton } from '@mui/material';
import { nanoid } from 'nanoid';
const loading: number[] = [1, 2, 3, 4, 5, 5, 6];
export default function LoadingOrderItem() {
    return (
        <Box>
            <Grid container rowGap={5}>
                {loading.map(() => {
                    return (
                        <Grid key={nanoid()} size={{ lg: 12 / 4, md: 12 / 4 }}>
                            <Box
                                sx={{
                                    borderRadius: '10px',
                                    background: 'white',
                                    margin: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton height={280} width={230} />
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
