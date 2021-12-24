import { AdmTypology, TypologyId } from './AdmTypology';
import { environment  as env} from '../../../environments/environment';
import { AdmCreatedBy, AdmUser } from './AdmUser';



export class AdmPhone{
    phoneId = 0;
    phoneAccount: AdmPhoneAccount;
    phone: number;
    status: AdmTypology;
    type: AdmTypology;
    createdBy: AdmCreatedBy;
    dateCreated = env.NOW;
    leader: boolean = false;

    constructor() {
        this.phoneAccount = new AdmPhoneAccount();
        this.type = new AdmTypology();
        this.type.typologyId =  env.DEFAULT_PHONE_CONTACT_TYPE;
        this.createdBy = new AdmCreatedBy();
        this.status = new AdmTypology();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE;
        this.createdBy =  new AdmCreatedBy();
        // this.createdBy.person.personKey =  createdBy.person.personKey;
    }
}


export class AdmPhoneAccount {
    phoneAccountId: number;
    dateCreated = env.NOW;
}


export class contactPhone {
    phone: number = 0;
    type: TypologyId;
    status: TypologyId;
    constructor() {
        this.type = new TypologyId()
        this.type.typologyId = env.DEFAULT_PHONE_CONTACT_TYPE;
        this.status =  new TypologyId();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE;
    }


}

