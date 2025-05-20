'use client';
import { Box, keyframes } from '@mui/material';

const bounce = keyframes`
  0% { transform: translateY(0) scale(1.2); }
  50% { transform: translateY(-6px) scale(1); }
  100% { transform: translateY(0) scale(1.2); }
`;

const shadowPulse = keyframes`
  0% { transform: scaleX(1.5); opacity: 0.3; }
  50% { transform: scaleX(1); opacity: 0.6; }
  100% { transform: scaleX(0.5); opacity: 0.2; }
`;

export default function LoadingOrder() {
    const delays = [0, 0.2, 0.4];

    return (
        <Box
            sx={{
                position: 'relative',
                width: 60,
                height: 30,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
            }}
        >
            {delays.map((delay, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                    {/* Circle */}
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#000',
                            animation: `${bounce} 0.6s ${delay}s infinite ease-in-out`,
                        }}
                    />
                    {/* Shadow */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 12,
                            width: 6,
                            height: 3,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            filter: 'blur(1px)',
                            animation: `${shadowPulse} 0.6s ${delay}s infinite ease-in-out`,
                            margin: '0 auto',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    />
                </Box>
            ))}
        </Box>
    );
}
