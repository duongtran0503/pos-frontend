export interface ApiResponse<T = unknown> {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    data?: T;
}
