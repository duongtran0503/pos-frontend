export const apiEndpoints = {
    category: {
        getCategories: '/categories',
    },
    product: {
        getProducts: '/products',
        searchProduct: '/products/search',
    },
    auth: {
        login: '/auth/login',
    },
    order: {
        createOrder: '/orders',
        getOrder: '/orders',
        getOrderDetail: '/orders/detail/',
        updateOrder: '/orders/',
    },
    table: {
        getTable: '/tables',
    },
};
