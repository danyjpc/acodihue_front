import { TypologyId } from "../../../../shared/adm-models/AdmTypology";
import { AdmAddress } from "../../../../shared/adm-models/AdmAddress";
import { AdmPhone } from "../../../../shared/adm-models/AdmPhone";
import { AdmCreatedBy } from "../../../../shared/adm-models/AdmUser";
import {environment as env} from '../../../../../environments/environment';


export class AdmAgencias {
    organizationKey: string ='';
    entryContribution: number = 50;
    entryFee: number = 50;
    organizationName: string ='';
    status: TypologyId;
    agencyAddress: AdmAddress;
    agencyPhone: AdmPhone;
    createdBy: AdmCreatedBy;

    constructor(){

        this.status = new TypologyId()
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE
        this.agencyAddress = new AdmAddress();
        this.agencyPhone = new AdmPhone();
        this.createdBy = new AdmCreatedBy();
        
    }


}