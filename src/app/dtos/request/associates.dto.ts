export interface ModifyAssociatedDTO {
    user_id: number;
    email: string;
    name: string;
    lastname?: string;
    phone?: string;
    address?: string;
    birthdate?: Date | string;
}