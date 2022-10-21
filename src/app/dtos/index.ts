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

// Operations

import {
    OperationDTO
} from './request/operations.dto';

// Resources 

// Auth
import {
    GetUserDTO,
    ResetParamsDTO,
    GetAssociatedDTO,
    Associated
} from './resources/auth.dto';

export {
    // Request
    LoginDTO,
    RegisterParamsDTO,
    CheckPermissionDTO,
    OperationDTO,

    // Resources
    GetUserDTO,
    ResetParamsDTO,
    UpdateUserDTO,
    GetAssociatedDTO,
    Associated
};