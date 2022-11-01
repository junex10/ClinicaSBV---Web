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

// Associates

import {
    ModifyAssociatedDTO
} from './request/associates.dto';

// Resources 

// Auth
import {
    User,
    GetUserDTO,
    ResetParamsDTO,
    GetAssociatedDTO,
    Associated,
    SelectDTO
} from './resources/auth.dto';

import {
    GetSpecializationsDTO,
    GetDoctorsDTO,
    GetDatesToHideDTO
} from './resources/patient.dto';

export {
    // Request
    LoginDTO,
    RegisterParamsDTO,
    CheckPermissionDTO,
    OperationDTO,
    ModifyAssociatedDTO,

    // Resources
    User,
    GetUserDTO,
    ResetParamsDTO,
    UpdateUserDTO,
    GetAssociatedDTO,
    Associated,
    GetSpecializationsDTO,
    GetDoctorsDTO,
    SelectDTO,
    GetDatesToHideDTO
};