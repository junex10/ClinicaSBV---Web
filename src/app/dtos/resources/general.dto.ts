export interface PaginationDTO {
    data: {
        count: number;
        rows: unknown[]
    }
}
export interface DataTableDTO {
    data: any[];
    total: number;
    header: string[];
    page: number;
}