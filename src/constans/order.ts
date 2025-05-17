export enum OrderStatusEnum {
    PENDING = 'pending',
    PROCESSING = 'processing',
    READY = 'ready',
    SERVED = 'served',
    PAID = 'paid',
    CANCELLED = 'cancelled',
}
export enum OrderTypeEnum {
    DINE_IN = 'dine-in',
    TAKE_AWAY = 'take-away',
    DELIVERY = 'delivery',
}

export const OrderStatusColors = {
    [OrderStatusEnum.PENDING]: '#F8DB46',
    [OrderStatusEnum.PROCESSING]: '#1e88e5',
    [OrderStatusEnum.READY]: '#43a047',
    [OrderStatusEnum.SERVED]: '#00bcd4',
    [OrderStatusEnum.PAID]: '#6d4c41',
    [OrderStatusEnum.CANCELLED]: '#e53935',
};
