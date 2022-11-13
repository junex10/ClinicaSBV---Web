// Sockets
import { PatientSocketsService } from './sockets/patient/sockets.service';

// Services
import { LoginService } from './login/login.service';
import { AuthService } from './auth/auth.service';
import { PetitionService } from './petitions/petitions.service';
import { ProfileService } from './profile/profile.service';
import { OperationService } from './operations/operations.service';

// Patients
import { 
    AssociatesService,
    AppointmentsService,
    PatientChatService
} from './patient';

export {
    PatientSocketsService,
    LoginService,
    AuthService,
    PetitionService,
    ProfileService,
    OperationService,
    
    AssociatesService,
    AppointmentsService,
    PatientChatService
}