import {PersonId, AdmPerson, ContactPerson} from '../../../../../shared/adm-models/AdmPerson';
import {AdmCreatedBy} from '../../../../../shared/adm-models/AdmUser';
import {AdmTypology, TypologyId} from '../../../../../shared/adm-models/AdmTypology';
import {environment  as env} from '../../../../../../environments/environment';
import { contactPhone } from '../../../../../shared/adm-models/AdmPhone';


export class AdmBeneficiary {
    beneficiaryId: number =0;
    referenceId: number =0;
    person: ContactPerson;
    createdBy: AdmCreatedBy;
    dateCreated: string = env.NOW;
    status: TypologyId;
    phone: contactPhone;
    kinship: TypologyId;
    percent: number= 100;
    age: number;
    

    constructor() {
        this.person = new ContactPerson();
        this.createdBy =  new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE
        this.phone = new contactPhone();
        this.kinship = new TypologyId();
        this.kinship.typologyId =  env.DEFAULT_PARENTEZCO__FAMILIAR_TYPOLOGY
    }
}