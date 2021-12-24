import {environment as env} from '../../../../../../environments/environment';
import * as moment from 'moment';
import {TypologyId} from '../../../../../shared/adm-models/AdmTypology';
import {PersonKey} from '../../../../../shared/adm-models/AdmPerson'
import { AdmCreatedBy } from '../../../../../shared/adm-models/AdmUser';
import { AdmAddress, contactAddress } from '../../../../../shared/adm-models/AdmAddress';

export class AdmCreditGuarantees {
    guaranteeId: number = 0;
    noYear: number = env.CURRENT_YEAR;
    noReference: number = 0;
    nameFarm: string;
    owner: string;
    documentType: TypologyId;
    testimony: number;
    ropeValue: number;
    areaMeters: number;
    msnm: number;
    topography: string;
    hydrography: string;
    soilQuality: string;
    planCover: string;
    cultivateDetail: string;
    farmNeighbor: string;
    riskClassForm: string;
    irrigationExtension: string;
    buildingDetail: string;
    annotation: string;
    northOrigin: string;
    southOrigin: string;
    orientOrigin: string;
    westOrigin: string;
    communicationRoutes: string;
    state: number;
    city: number;
    toCity: string;
    evaluator: PersonKey;
    dateCreated: string =  env.NOW;
    createdBy: AdmCreatedBy;
    status: TypologyId;
    address: GuaranteeAddress;
    ownershipRights : string;
    noRope : number;
    noHectares : number;
    costPerSquareMeter : number;
    heightAboveSeaLevel : number;
    valueOfPermanentCrops : number;
    valueOfBuildings : number;
    annotation2 : string;


    constructor() {
        this.documentType = new TypologyId();
        
        this.createdBy = new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE;
        this.address =  new GuaranteeAddress();
        this.evaluator = new PersonKey();

    }
}



export class GuaranteeAddress {
    addressId = 0;
    addressLine: string = '';
    state: TypologyId;
    city: TypologyId;
    leader = true;
    noFarm = 0;
    noFolder = 0;
    extension = 0;
    noPublic = 'S/D';
    noBook = 'S/D';

    constructor() {
        this.state = new TypologyId();
        this.state.typologyId = env.DEFAULT_DEPARTAMENTO_TYPOLOGY;
        this.city = new TypologyId();
        this.city.typologyId = env.DEFAULT_MUNICIPIO_TYPOLOGY;

    }
}









