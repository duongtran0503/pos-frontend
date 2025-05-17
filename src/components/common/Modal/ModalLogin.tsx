'use client';
import { InputFormCustomStyle } from '@/components/common/Input/InputFormCustom';
import { loginSchema, loginSchemaType } from '@/schemas/login';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonCustom from '@/components/common/Button/ButtonCustom';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { LoginType } from '@/types/auth';
import authService from '@/services/authService';
import { localStorageName } from '@/constans/localStorage';
import { useRouter } from 'next/navigation';
export default function ModalLogin() {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
    });
    const submitLogin = async (data: loginSchemaType) => {
        const res: LoginType = await authService.login(data);
        localStorage.removeItem(localStorageName.STORE_ORDER);
        if (res.token) {
            localStorage.setItem(
                localStorageName.AUTH_TOKEN,
                JSON.stringify(res.token)
            );

            router.push('/manager-order');
        }
    };
    return (
        <Box
            sx={{
                width: '400px',
                height: '400px',
                background: 'white',
                borderRadius: '10px',
                padding: '10px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography>Đăng nhập</Typography>
            </Box>
            <Box>
                <form onSubmit={handleSubmit(submitLogin)}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '8px',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                    >
                        <Typography
                            component={'label'}
                            sx={{ fontSize: '14px' }}
                        >
                            Tên người dùng
                        </Typography>
                        <InputFormCustomStyle
                            placeholder='username'
                            sx={{
                                width: '100%',
                                height: '40px',
                            }}
                            {...register('username')}
                        />
                        {errors.username ? (
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    color: 'red',
                                }}
                            >
                                {errors.username.message}
                            </Typography>
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '8px',
                            marginTop: '10px',
                            marginBottom: '10px',
                            position: 'relative',
                        }}
                    >
                        <Typography
                            component={'label'}
                            sx={{ fontSize: '14px' }}
                        >
                            Mật khẩu
                        </Typography>
                        <InputFormCustomStyle
                            placeholder='password'
                            type={isShowPassword ? 'text' : 'password'}
                            sx={{
                                width: '100%',
                                height: '40px',
                            }}
                            {...register('password')}
                        />
                        {errors.password ? (
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    color: 'red',
                                }}
                            >
                                {errors.password.message}
                            </Typography>
                        ) : (
                            <></>
                        )}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                            }}
                        >
                            {isShowPassword ? (
                                <Box
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => setIsShowPassword(false)}
                                >
                                    <FaEyeSlash />
                                </Box>
                            ) : (
                                <Box
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => setIsShowPassword(true)}
                                >
                                    <FaEye />
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '20px',
                        }}
                    >
                        <ButtonCustom
                            type='submit'
                            sx={{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            Đăng nhập
                        </ButtonCustom>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
