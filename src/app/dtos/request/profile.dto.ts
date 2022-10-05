export interface UpdateUserDTO{
    id: number;
    name: string;
    lastname?: string;
    email: string;
    phone?: string;
    birthdate?: Date | string;
    document?: string;
    new_password?: string;
    level_id?: number;
    address?: string;
}