export type CategoryType = {
    name: string;
    categoryCode: string;
    description?: string;
} & Record<string, unknown>;
