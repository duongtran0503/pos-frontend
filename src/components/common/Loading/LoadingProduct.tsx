import { Box, Skeleton } from '@mui/material';
import { nanoid } from 'nanoid';
const girditem = [1, 2, 3, 4, 5];
export default function LoadingProduct() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {girditem.map(() => {
                return (
                    <Box
                        key={nanoid()}
                        sx={{
                            padding: '10px',
                        }}
                    >
                        <Skeleton
                            variant='rectangular'
                            width={220}
                            height={160}
                        />
                        <Skeleton sx={{ marginTop: '5px' }} />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Skeleton width={'40%'} />
                            <Skeleton width={'20%'} />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}
