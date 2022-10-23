import { Observable } from "rxjs";
import { GetSpecializationsDTO } from "../../dtos";

export interface IPATIENTS_APPOINTMENTS {
    getSpecializations(): Observable<GetSpecializationsDTO[]>;
}