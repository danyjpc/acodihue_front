import {environment as env } from '../../../../../../environments/environment';
import { AdmCreatedBy } from '../../../../../shared/adm-models/AdmUser';
import { TypologyId } from '../../../../../shared/adm-models/AdmTypology';

export class AdmDocuments {
    documentId: number = 0;
    createdBy: AdmCreatedBy;
    leader: boolean = false;
    path: string = '';
    status: TypologyId
    type: TypologyId;
    dateCreated: string = env.NOW;
    documentName:string;
    relativePath: string;

    constructor() {
        this.createdBy = new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE;
        
        this.type = new TypologyId();
        this.type.typologyId = env.DEFAULT_DOCUMENT_TYPE_DPI

    }
}


export class DocumentParams { 
    name: string;
    type: number;
    created_by: string;

    constructor() {
        const _createdby = new AdmCreatedBy();
        this.type =  env.DEFAULT_DOCUMENT_TYPE_DPI;
        this.created_by = _createdby.personKey
    }
}