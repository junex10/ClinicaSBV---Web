// Appointments

import { User } from "./auth.dto";

export interface GetSpecializationsDTO {
    code: string;
    id: number;
    name: string;
}
export interface GetDoctorsDTO {
    day: string;
    quotes_available: number;
    doctor: User;
}
export interface GetDatesToHideDTO {
    data: {
        days: string[];
        weeks: number[];
    };
}