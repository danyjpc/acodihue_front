import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../../../core/services/api.service';
import {UtilsService} from '../../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { CredisListComponent } from './credis-list/credis-list.component';
import { CreditsCheckListComponent } from './credit-details/credits-check-list/credits-check-list.component';
import { CreditsAsociateDetailsComponent } from './credit-details/credits-asociate-details/credits-asociate-details.component';
import { CreditsFiadoresComponent } from './credit-details/credits-fiadores/credits-fiadores.component';
import { CreditsReferencesComponent } from './credit-details/credits-references/credits-references.component';
import { CreditsAddressComponent } from './credit-details/credits-address/credits-address.component';
import { CreditsDocumentsComponent } from './credit-details/credits-documents/credits-documents.component';
import { CreditActivitiesListComponent } from './credit-details/credit-activities/credit-activities-list/credit-activities-list.component';
import { CreditGarantiasListComponent } from './credit-details/credits-garantias/credit-garantias-list/credit-garantias-list.component';
import { CreditsPatrimonialStatusComponent } from './credit-details/credits-patrimonial-status/credits-patrimonial-status.component';
import { CreditsIncomeExpensesComponent } from './credit-details/credits-income-expenses/credits-income-expenses.component';

@Injectable({
    providedIn: 'root'
})
export class CreditManagerService {

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
                    case 'check-list':
                        this.OnComponentChange.next(CreditsCheckListComponent);
                        break;
                    case 'associate-info':
                        this.OnComponentChange.next(CreditsAsociateDetailsComponent);
                        break;
                    case 'fiadores':
                        this.OnComponentChange.next(CreditsFiadoresComponent);
                        break;
                    case 'references':
                        this.OnComponentChange.next(CreditsReferencesComponent);
                        break;     
                    case 'address':
                        this.OnComponentChange.next(CreditsAddressComponent);
                        break;   
                    case 'documents':
                        this.OnComponentChange.next(CreditsDocumentsComponent);
                        break;
                    case 'activities':
                        this.OnComponentChange.next(CreditActivitiesListComponent);
                        break;  
                    case 'guarantees':
                        this.OnComponentChange.next(CreditGarantiasListComponent);
                        break;
                    case 'patrimonial-status':
                        this.OnComponentChange.next(CreditsPatrimonialStatusComponent);
                        break;
                    case 'income-expenses':
                        this.OnComponentChange.next(CreditsIncomeExpensesComponent);
                        break;                        
                    default:
                        this.OnComponentChange.next([]);
                        break;

                }
            }

        });

   
        
    }
}