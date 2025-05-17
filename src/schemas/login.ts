import z from 'zod';
export const loginSchema = z
    .object({
        username: z
            .string()
            .nonempty({ message: 'Vui lòng nhập tên người dùng!' })
            .min(2, { message: 'Tên người dùng quá ngắn quá ngắn!' }),
        password: z.string().min(2, { message: 'Mật khẩu quá ngắn!' }),
    })
    .strict();

export type loginSchemaType = z.infer<typeof loginSchema>;
