import {environment as env} from 'environments/environment';
export class AdmTypology {
    typologyId: number = 0;
    interno_id: number = 0;
    description = '';
    value1    = '';
    value2   = '%';
    value3: number = 0;
    available: boolean = true;
    editable: boolean = false;
    childTypologies: AdmTypology[]; 
    parentTypology: TypologyId;
    
    constructor() {
        this.parentTypology = new TypologyId();
        this.parentTypology.typologyId = env.PARENT_DEFAULT;
    }
}

export class TypologyId {
    typologyId = env.EMPTY_TYPOLOGY;
    description = '';
    value1?: string;
    value2?: string;
    value1_?: string;
    value_2?: string;
}
