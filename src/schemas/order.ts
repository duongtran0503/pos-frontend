import { OrderStatusEnum, OrderTypeEnum } from '@/constans/order';
import { PaymentStatusEnum } from '@/constans/payment';
import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const OrderDetailSchema = z.object({
    product: z.string().regex(objectIdRegex, 'id không hợp lệ!'),
    quantity: z.number().min(1, 'Số lượng tối thiếu là 1!'),
    notes: z.string().optional(),
});

export const CreateOrderSchema = z.object({
    orderDetails: z.array(OrderDetailSchema).min(1, 'Đơn hàng rổng!'),
    table: z.string().regex(objectIdRegex, 'id không hợp lệ').optional(),
    totalAmount: z.number().min(0),
    discountAmount: z.number().min(0).default(0),
    finalAmount: z.number().min(0),
    status: z
        .nativeEnum(OrderStatusEnum)
        .default(OrderStatusEnum.PENDING)
        .optional(),
    orderType: z.nativeEnum(OrderTypeEnum),
    staffNotes: z.string().optional(),
    customNotes: z.string().optional(),
    paymentStatus: z
        .nativeEnum(PaymentStatusEnum)
        .default(PaymentStatusEnum.UNPAID),
    paymentDate: z.coerce.date().optional(),
});
export const UpdateOrderSchema = z
    .object({
        status: z.nativeEnum(OrderStatusEnum).optional(),
        paymentStatus: z.nativeEnum(PaymentStatusEnum),
    })
    .strict();

export type UpdateOrderSchemaType = z.infer<typeof UpdateOrderSchema>;
export type CreateOrderSchemaType = z.infer<typeof CreateOrderSchema>;
export type OrderDetailSchemaType = z.infer<typeof OrderDetailSchema>;
