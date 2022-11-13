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

import {
    GetAppointmentsDTO
} from './request/appointments.dto';

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

// Appointments

import {
    RegisterAppointmentDTO
} from './resources/appointments.dto';

import {
    GetSpecializationsDTO,
    GetDoctorsDTO,
    GetDatesToHideDTO,

    PatientGetChatsDTO,
    PatientNewChatDTO,
    PatientNewMessageDTO,
    PatientGetLogsDTO,
    PatientDeleteDTO,
    PatientViewedDTO
} from './resources/patient.dto';

import {
    PaginationDTO
} from './resources/general.dto';

export {
    // Request
    LoginDTO,
    RegisterParamsDTO,
    CheckPermissionDTO,
    OperationDTO,
    ModifyAssociatedDTO,
    GetAppointmentsDTO,

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
    GetDatesToHideDTO,
    RegisterAppointmentDTO,
    PaginationDTO,
    PatientGetChatsDTO,
    PatientNewChatDTO,
    PatientNewMessageDTO,
    PatientGetLogsDTO,
    PatientDeleteDTO,
    PatientViewedDTO
};