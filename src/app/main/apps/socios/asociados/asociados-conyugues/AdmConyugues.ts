import {PersonId, AdmPerson, ContactPerson, PersonKey} from '../../../../../shared/adm-models/AdmPerson';
import {AdmCreatedBy} from '../../../../../shared/adm-models/AdmUser';
import {AdmTypology, TypologyId} from '../../../../../shared/adm-models/AdmTypology';
import {environment  as env} from '../../../../../../environments/environment';
import { contactPhone } from 'app/shared/adm-models/AdmPhone';

export class AdmConyugue {
    partnerId: number =0
    person: ContactPerson;
    createdBy: AdmCreatedBy;
    dateCreated: string = env.NOW;
    status: TypologyId;
    phone: contactPhone
    noBoys: number = 0;
    noGirls: number =0;
    isLeader: boolean = true;
    age: number;

    constructor() {
        this.person = new ContactPerson();
        this.createdBy =  new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE;
        this.phone = new contactPhone();
    }
}

export class ConyugueAsFiador {
    person: PersonKey;
    status : TypologyId;
    createdBy: AdmCreatedBy;

    constructor(){
        this.person =  new PersonKey();
        this.status = new TypologyId();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE;
        this.createdBy = new AdmCreatedBy();
    }

}