import { localStorageName } from '@/constans/localStorage';
import { orderState } from '@/redux/slice/orderSlice';

export default function getOrderFromLocalStorage(): orderState | null {
    const data = localStorage.getItem(localStorageName.STORE_ORDER);
    const order: orderState | null = data ? JSON.parse(data) : null;
    return order;
}
