import {environment as env } from '../../../../../../environments/environment';
import {OrganizationAsociacion } from '../../../../../shared/adm-models/AdmOrganization';
import {ContactPerson} from '../../../../../shared/adm-models/AdmPerson';
import {AdmCreatedBy} from '../../../../../shared/adm-models/AdmUser';
import { TypologyId } from '../../../../../shared/adm-models/AdmTypology';



export class AdmAsociationsMember {
    associationResponsibleId: number = 0;
    organization: OrganizationAsociacion;
    person: ContactPerson;
    admissionDate: string = env.TODAY;
    dischargeDate: string = env.DEFAULT_DATE;
    annotation: string = 'S/D';
    createdBy: AdmCreatedBy;
    dateCreated: string = env.NOW;
    status: TypologyId;

    constructor() {
        this.organization = new OrganizationAsociacion();
        this.organization.organizationKey = env.DEFAULT_ASOCIATION_ACODIHUE;
        
        this.person = new ContactPerson();
        this.createdBy =  new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE
    }
}