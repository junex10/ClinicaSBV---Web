export interface GetUserDTO {
    token: string;
    user: User;
}
export interface Associated {
    user: GetDataAssociatedDTO;
}
export interface User {
    id: number;
    email: string;
    password?: string;
    level_id?: number;
    facebook?: number;
    google?: number;
    google_id?: string;
    facebook_id?: string;
    photo?: string;
    logged_id?: number;
    verified?: number;
    status?: number;
    person: Person;
}
export interface Person {
    name: string;
    lastname?: string;
    user_id: number;
    medical_history?: number;
    age?: number;
    birthdate?: Date;
    document?: string;
    phone?: string;
    address?: string;
}
export interface ResetParamsDTO {
    password: string;
    password_confirmation: string;
    code: string;
}
export interface GetAssociatedDTO {
    count: number;
    rows: User[];
}
export interface GetDataAssociatedDTO {
    id: number;
    email: string;
    level_id?: number;
    photo?: string;
    verified?: number;
    status?: number;
    person: Person;
}
export interface SelectDTO {
    name: string | number;
    value: string | number;
}