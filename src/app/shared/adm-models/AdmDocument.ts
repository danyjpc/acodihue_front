import { environment  as env} from '../../../environments/environment';
import { AdmCreatedBy, AdmUser } from './AdmUser';
import { AdmTypology } from './AdmTypology';


export class AdmDocument {
    documentId: number;
    documentAccount: AdmDocumentAccount;
    path: string;
    createdBy: AdmCreatedBy;
    dateCreated = env.NOW;
    status: AdmTypology;
    leader: boolean;
    documentCreditType: AdmTypology;
    
    constructor (){
        this.documentAccount = new AdmDocumentAccount();
        this.createdBy = new AdmCreatedBy();
        this.status = new AdmTypology();
        this.documentCreditType = new AdmTypology();
        this.createdBy = new AdmCreatedBy();

    }

}

export class AdmDocumentAccount {
    documentAccountId: number;
    dateCreated = env.NOW;
}