export default function formatPriceToVND(price: number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formatter.format(price);
}
