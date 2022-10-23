import { Observable } from "rxjs";
import {
    GetSpecializationsDTO, 
    GetDoctorsDTO 
} from "../../dtos";

export interface IPATIENTS_APPOINTMENTS {
    getSpecializations(): Observable<GetSpecializationsDTO[]>;
    getDoctor(specialization_id: number): Observable<GetDoctorsDTO[]>;
}