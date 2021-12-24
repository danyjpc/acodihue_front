import {contactPhone} from '../../../shared/adm-models/AdmPhone';
import { TypologyId } from '../../../shared/adm-models/AdmTypology';
import {environment  as env } from '../../../../environments/environment';
import { AdmCreatedBy } from '../../../shared/adm-models/AdmUser';
import {organizationAgency} from '../../../shared/adm-models/AdmOrganization'
import { AdmPerson } from '../../../shared/adm-models/AdmPerson';

export class AdmPreescription {

    partner: AdmAssociateContact;
    createdBy: AdmCreatedBy;
    organization: organizationAgency;
    beneficiary: AdmBeneficiary;
    associate: AdmPerson;
    extraContribution: number =0;

    constructor(){
        this.partner = new AdmAssociateContact();
        this.createdBy = new AdmCreatedBy();
        this.beneficiary = new AdmBeneficiary();
        this.associate =  new AdmPerson();
        this.organization = new organizationAgency();
    }
}


class AdmAssociateContact { 
    nameComplete: String = 'S/D';
    phones: contactPhone[]=[];
    status: TypologyId;

    constructor() {
        const _contactphone = new contactPhone();
        const _contactphone2 = new contactPhone();
        this.phones.push(_contactphone);
        this.phones.push(_contactphone2);
        this.status = new TypologyId();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE;
    
    }

}

class AdmBeneficiary {
    person: AdmAssociateContact; 
    kinship: TypologyId;

    constructor () {
        this.person = new AdmAssociateContact();
        this.kinship =  new TypologyId();
        this.kinship.typologyId = env.DEFAULT_PARENTEZCO__FAMILIAR_TYPOLOGY;

    }

}
