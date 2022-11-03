export interface RegisterAppointmentDTO {
    medical_reason: string;
    specialization: number;
    doctor: number;
    medical_description: string;
    patient: number;
    date_cite: Date | string;
}