import { Observable } from "rxjs";
import {
    GetSpecializationsDTO, 
    GetDoctorsDTO,
    RegisterAppointmentDTO,
    GetAppointmentsDTO,
    GetDatesToHideDTO
} from "../../dtos";

export interface IDOCTOR_APPOINTMENTS {
    getSpecializations(): Observable<GetSpecializationsDTO[]>;
    getDoctor(specialization_id: number): Observable<GetDoctorsDTO[]>;
    getDoctorControl(doctor_id: number, specialization_id: number): Observable<GetDatesToHideDTO>;
    register(request: RegisterAppointmentDTO): Observable<RegisterAppointmentDTO | boolean>;
    get(request: GetAppointmentsDTO): Observable<any>;
    getPDF(request: GetAppointmentsDTO): Observable<any>;
    getExcel(request: GetAppointmentsDTO): Observable<any>;
}