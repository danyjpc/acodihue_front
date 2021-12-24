import { environment  as env} from '../../../environments/environment';
import { AdmCreatedBy, AdmUser } from './AdmUser';
import { AdmTypology } from './AdmTypology';
import { AdmAddresAccount } from './AdmAddress';
import { AdmPhoneAccount } from './AdmPhone';
import { AdmDocumentAccount } from './AdmDocument';
import { AdmPerson, ContactPerson } from './AdmPerson';

export class AdmOrganization {
    organizationId: number;
    organizationName: string ='';
    organizationCommercial: string;
    addressAccount: AdmAddresAccount;
    phoneAccount: AdmPhoneAccount;
    documentAccount: AdmDocumentAccount;
    sector: AdmTypology;
    category: AdmTypology;
    dateCreated = env.NOW;
    organizationKey: string;
    taxCode: string;
    isAgency: boolean;
    isSociety: boolean;
    isOrganization: boolean;
    status: AdmTypology;
    entryContribution: number;
    entryFee: number;
    interestRate: number = 19;
    isAssociation: boolean;
    parent: number;
    createdBy: AdmCreatedBy;

    constructor() {
        this.addressAccount  = new AdmAddresAccount();
        this.phoneAccount = new AdmPhoneAccount();
        this.documentAccount = new AdmDocumentAccount();
        this.sector = new AdmTypology();
        this.category = new AdmTypology();
        this.status = new AdmTypology();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE;
        this.createdBy = new AdmCreatedBy();
    }

}


export class AdmOrganizationResponsible {
    organizationResponsibleId: number;
    organization: OrganizationAsociacion;
    person: ContactPerson;
    dateCreated = env.NOW;

    constructor (){
        this.organization = new OrganizationAsociacion();
        this.person = new ContactPerson();
    }
}

export class OrganizationAsociacion{
    organizationKey: string ='';
    organizationName: string ='';
    interestRate:  number = 19;
    organizationCommercial? :string;
}

export class organizationAgency{
    organizationKey: string ='';
    organizationName: string ='';
    entryFee:  number = 50;
    entryContribution: number = 50
}