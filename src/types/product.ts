export interface ProductType {
    _id: string;
    name: string;
    productCode: string;
    description: string;
    image: string;
    price: number;
    category: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}
export const defaultValueProductType: ProductType = {
    _id: '',
    name: 'Tên sản phẩm mặc định',
    productCode: '',
    description: 'Mô tả mặc định',
    image: '',
    price: 0,
    category: '',
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};
