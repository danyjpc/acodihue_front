import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {AsociadosFormComponent} from './asociados-profile/asociados-form/asociados-form.component';
import {AsociadosAddressComponent} from './asociados-address/asociados-address.component';
import {AsociadosPhonesComponent} from './asociados-phones/asociados-phones.component';
import {AsociadosBeneficiariesComponent} from './asociados-beneficiaries/asociados-beneficiaries.component';
import { AsociadosConyuguesListComponent } from './asociados-conyugues/asociados-conyugues-list/asociados-conyugues-list.component';
import { ApiService } from 'app/core/services/api.service';
import { AdmPerson } from 'app/shared/adm-models/AdmPerson';
import { AsociadosDocumentsListComponent } from './asociados-documents/asociados-documents-list/asociados-documents-list.component';
import { UtilsService } from 'app/core/services/utils.service';
import { AsociadosAccountsListComponent } from './asociados-accounts-list/asociados-accounts-list.component';
import { CotizationsListComponent } from '../../operations/cotizations-list/cotizations-list.component';
import { AsociadosAsociationsListComponent } from './asociados-asociations/asociados-asociations-list/asociados-asociations-list.component';
import { CredisListComponent } from '../../credits/credis-list/credis-list.component';
import { CreditsListBySocioComponent } from '../../credits/credits-list-by-socio/credits-list-by-socio.component';


@Injectable({
    providedIn: 'root'
})



export class AssociateManagerService {

    OnComponentChange:  BehaviorSubject<any>;
    OnAssociateChange:  BehaviorSubject<any>;

    constructor
    (
        private api: ApiService,
        private utils: UtilsService
    ) 
    {
        this.OnComponentChange = new BehaviorSubject([]);
        this.OnAssociateChange = new BehaviorSubject([]);
    }


    ListenchangeComponet(router: ActivatedRoute){

        router.params.subscribe( params => {

            if (params['view']) {
                const path =  params['view'];
                switch (path) {
                    case 'personal-info':
                        this.OnComponentChange.next(AsociadosFormComponent);
                        break;
                    case 'address':
                        this.OnComponentChange.next(AsociadosAddressComponent);
                        break;
                    case 'phones':
                        this.OnComponentChange.next(AsociadosPhonesComponent);
                        break;  
                    case 'conyugues':
                        this.OnComponentChange.next(AsociadosConyuguesListComponent);
                        break;
                    case 'beneficiarios':
                        this.OnComponentChange.next(AsociadosBeneficiariesComponent);
                        break;
                    case 'documentos':
                        this.OnComponentChange.next(AsociadosDocumentsListComponent);
                        break;   
                    case 'creditos':
                        this.OnComponentChange.next(CreditsListBySocioComponent);
                        break;                 
                    case 'cuentas':
                        this.OnComponentChange.next(AsociadosAccountsListComponent);
                        break; 
                    case 'cotizaciones':
                        this.OnComponentChange.next(CotizationsListComponent);
                        break;
                    case 'asociaciones':
                        this.OnComponentChange.next(AsociadosAsociationsListComponent);
                        break;                
                    default:
                        this.OnComponentChange.next([]);
                        break;

                }
            }

        });

   
        
    }

    get_associate_single(personKey): Promise<any>{
        const url = `/rest/persons/v1/${personKey}`
        return new Promise((resolve, reject) => {
            this.api.getMethod(url)
                .then(person => { 
                    delete person['createdBy'];
                    
                    this.OnAssociateChange.next(person);
                    resolve (person as AdmPerson)
                })
                .catch(error => {
                    this.utils.openSnackBar('error al obtener datos de asociado ' + error.statusText);
                    reject ('error al obtener datos de asociado ' + error.statusText)
                })
        })
    }
    
}


