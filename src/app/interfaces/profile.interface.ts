import { GetUserDTO } from "../dtos";

export interface IPROFILE {
    updateUser(body: any): Promise<GetUserDTO>;
}