import { Observable } from "rxjs";
import { 
    GetAssociatedDTO, 
    User,
    PatientGetChatsDTO,
    PatientNewChatDTO,
    PatientNewMessageDTO,
    PatientGetLogsDTO,
    PatientDeleteDTO,
    PatientViewedDTO 
} from "../../dtos";

export interface IPATIENTS {
    addAssociated(body: any): Promise<GetAssociatedDTO>;
    getAll(user_id: number, page?: number): Promise<GetAssociatedDTO | User[]>
}
export interface IPATIENTCHAT {
    getChats(request: PatientGetChatsDTO): Observable<unknown>;
    newChat(request: PatientNewChatDTO): Observable<unknown>;
    newMessage(request: PatientNewMessageDTO): Observable<unknown>;
    getLogs(request: PatientGetLogsDTO): Observable<unknown>;
    delete(request: PatientDeleteDTO): Observable<unknown>;
    viewed(request: PatientViewedDTO): Observable<unknown>;
    getUsers(): Observable<unknown>;
}