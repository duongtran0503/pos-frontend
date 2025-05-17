import { ProductType } from '@/types/product';

export interface ProductListType {
    products: ProductType[];
    page: number;
    totalProduct: number;
    currentItemsPerPage: number;
    [key: string]: unknown;
}
