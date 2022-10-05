import { UpdateUserDTO } from "../dtos";

export interface IPROFILE {
    updateUser(body: UpdateUserDTO): any;
}