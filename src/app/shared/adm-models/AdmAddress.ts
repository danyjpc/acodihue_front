import { TypologyId, AdmTypology } from './AdmTypology';
import { environment  as env} from '../../../environments/environment';
import { AdmDocumentAccount } from './AdmDocument';
import { AdmCreatedBy, AdmUser } from './AdmUser';



export class AdmAddress {
    addressId: number = 0;
    addressAccount: AdmAddresAccount;
    addressLine: string = '';
    addressLine2: string = '';
    country: TypologyId;
    state: TypologyId;
    city: TypologyId;
    zone: TypologyId;
    status: TypologyId;
    type: TypologyId;
    createdBy: AdmCreatedBy;
    dateCreated = env.NOW;
    leader: boolean = false;
    noFarm: number;
    noFolder: number;
    extension: number;
    noPublic: string;
    documentAcount: AdmDocumentAccount;
    village: TypologyId;

    constructor() {
        this.addressAccount = new AdmAddresAccount();
        this.country = new TypologyId();
        this.state = new TypologyId();
        this.city = new TypologyId();
        this.zone = new TypologyId();
        this.status = new TypologyId();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE;
        this.type = new TypologyId();
        this.village = new TypologyId();
        this.documentAcount = new AdmDocumentAccount();


        // defaults
        this.country.typologyId =  env.DEFAULT_PAIS_TYPOLOGY;
        this.state.typologyId =  env.DEFAULT_DEPARTAMENTO_TYPOLOGY;
        this.city.typologyId = env.DEFAULT_MUNICIPIO_TYPOLOGY;
        this.zone.typologyId =  env.DEFAULT_ZONA_TYPLOGY;
        this.createdBy =  new AdmCreatedBy();

        //const createdBy =  new AdmCreatedBy();
        // this.createdBy.person.personKey =  createdBy.person.personKey;

    }   
    

}



export class AdmAddresAccount {
    addressAccountId: number;
    dateCreated = env.NOW;

}

export class contactAddress {
    addressLine: string = '';
    state: TypologyId;
    city: TypologyId;
    zone: TypologyId;
    type: TypologyId;

    constructor() {
        this.state = new TypologyId();
        this.state.typologyId = env.DEFAULT_DEPARTAMENTO_TYPOLOGY;
        this.city = new TypologyId();
        this.city.typologyId = env.DEFAULT_MUNICIPIO_TYPOLOGY;
        this.zone = new TypologyId();
        this.zone.typologyId = env.EMPTY_TYPOLOGY;
        this.type = new TypologyId();
        this.type.typologyId = env.EMPTY_TYPOLOGY;
    }
}

