import {environment  as env } from '../../../../../environments/environment';
import {OrganizationAsociacion} from '../../../../shared/adm-models/AdmOrganization';
import { TypologyId } from '../../../../shared/adm-models/AdmTypology';
import { AdmCreatedBy } from '../../../../shared/adm-models/AdmUser';


export class AdmCreditLine {
    creditLineId: number =   env.DEFAULT_DESTINE_CREDIT_AGRICOLA;
    organization: OrganizationAsociacion;
    description: string;
    dateCreated: string = env.NOW;
    status: TypologyId;
    createdBy: AdmCreatedBy;
    
    constructor() {
        this.organization = new OrganizationAsociacion();
        this.organization.organizationKey = env.DEFAULT_AGENCY_CENTRAL;
        this.status = new TypologyId();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE;
        this.createdBy = new AdmCreatedBy();
    }
}

