import {TypologyId} from '../../../../../shared/adm-models/AdmTypology';
import { AdmCreatedBy  } from '../../../../../shared/adm-models/AdmUser';
import { environment as env  } from '../../../../../../environments/environment';


export class AdmCreditActivity {
    activityId: number = 0;
    destiny: TypologyId;
    activityEconomic: TypologyId;
    isApparel: boolean = true;
    isFiduciary: boolean = false;
    unitMeasure: TypologyId;
    earnings: number = 0;
    area: number; 
    price: number = 0;
    createdBy: AdmCreatedBy;
    status:  TypologyId;
    quantity: number = 0;
    annotation: string = '';


    constructor() {
        this.destiny = new TypologyId();
        this.destiny.typologyId =  env.DEFAULT_CREDIT_DESTINE_AGRICOLA;

        this.unitMeasure = new TypologyId();
        this.unitMeasure.typologyId =  env.DEFAULT_UNIT_MEASURE_QUINTAL_TYPOLOGY

        this.activityEconomic =  new TypologyId();
        this.activityEconomic.typologyId =  env.DEFAULT_ECONOMIC_ACTIVITY_TYPOLOGY_PRODUCTION_CAFE;

        this.status = new TypologyId();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE;

        this.createdBy =  new AdmCreatedBy();


    }





}