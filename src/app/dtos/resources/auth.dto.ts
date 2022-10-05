export interface GetUserDTO {
    token: string;
    user: User;
}
interface User {
    id: number;
    email: string;    
}
export interface ResetParamsDTO {
    password: string;
    password_confirmation: string;
    code: string;
}