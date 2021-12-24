import { environment  as env} from '../../../environments/environment';
import { AdmCreatedBy, AdmUser } from './AdmUser';
import { AdmTypology } from './AdmTypology';
import { AdmAddresAccount } from './AdmAddress';
import { AdmPhoneAccount } from './AdmPhone';
import { AdmDocumentAccount } from './AdmDocument';
import { AdmPerson } from './AdmPerson';

export class AdmBeneficiary {
    beneficiaryId: number;
    beneficiaryAccount: AdmBeneficiaryAccount;
    beneficiary: AdmPerson;
    createdBy: AdmCreatedBy;
    dateCreated = env.NOW;
    status: AdmTypology;
    kinship: AdmTypology;
    percent: number;
    age: number;

    constructor (){
        this.beneficiaryAccount = new AdmBeneficiaryAccount();
        this.beneficiary = new AdmPerson();
        this.createdBy = new AdmCreatedBy();
        this.createdBy = new AdmCreatedBy();
        // const createdBy =  new AdmCreatedBy();
        // this.createdBy.person.personKey =  createdBy.person.personKey;            
        this.status = new AdmTypology();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE;
        this.kinship = new AdmTypology();

    }

}

export class AdmBeneficiaryAccount {
    beneficiaryAccountId: number;
    dateCreated = env.NOW;

}