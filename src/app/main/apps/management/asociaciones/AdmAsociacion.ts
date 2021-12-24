import { AdmAddress, contactAddress } from "../../../../shared/adm-models/AdmAddress";
import { AdmOrganization, OrganizationAsociacion } from "../../../../shared/adm-models/AdmOrganization";
import { AdmPerson, ContactPerson } from "../../../../shared/adm-models/AdmPerson";
import { AdmPhone, contactPhone } from "../../../../shared/adm-models/AdmPhone";
import { TypologyId } from "../../../../shared/adm-models/AdmTypology";
import { AdmCreatedBy } from "../../../../shared/adm-models/AdmUser";
import {environment as env} from 'environments/environment'

export class AdmAsociacion {
    association: OrganizationAsociacion;
    contact: ContactPerson;
    contactPhone: contactPhone;
    contactAddress: contactAddress;
    status: TypologyId;
    createdBy: AdmCreatedBy;
    constructor(){

        this.association = new OrganizationAsociacion();
        this.contact = new ContactPerson();
        this.contactPhone = new contactPhone();
        this.contactAddress = new contactAddress();
        this.status = new TypologyId()
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE

        this.createdBy = new AdmCreatedBy();
    }
}





