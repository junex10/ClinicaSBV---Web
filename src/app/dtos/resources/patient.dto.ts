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

// Chats

export interface PatientGetChatsDTO {
    user_id: number;
}
export interface PatientNewChatDTO {
    sender_id: number;
    name?: string;
}
export interface PatientNewMessageDTO {
    sender_id: number;
    message: string;
    session_id: number;
    attachments?: any[];
    formData?: boolean;
}
export interface PatientGetLogsDTO{
    chat_session_id: number;
}
export interface PatientDeleteDTO{
    chat_session_id: number;
    host_id: number;
}
export interface PatientViewedDTO{
    chat_session_id: number;
    user_id: number;
}