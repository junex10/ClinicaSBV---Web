// Login
import { LoginDTO } from "./request/login.dto";
import { RegisterParamsDTO } from './request/register.dto';

// Auth
import {
    CheckPermissionDTO
} from './request/auth.dto';

// Profile
import {
    UpdateUserDTO
} from './request/profile.dto';

// Resources
import {
    GetUserDTO,
    ResetParamsDTO,
    GetAssociatedDTO
} from './resources/auth.dto';

export {
    // Request
    LoginDTO,
    RegisterParamsDTO,
    CheckPermissionDTO,

    // Resources
    GetUserDTO,
    ResetParamsDTO,
    UpdateUserDTO,
    GetAssociatedDTO
};