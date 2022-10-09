import { GetAssociatedDTO } from "../../dtos";

export interface IPATIENTS {
    addAssociated(body: any): Promise<GetAssociatedDTO>;
    getAll(user_id: number, page?: number): Promise<GetAssociatedDTO>
}