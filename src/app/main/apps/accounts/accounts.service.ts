import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { UtilsService } from '../../../core/services/utils.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AdmAccount, AdmAccountBalanceDetail, AdmBalanceAccount} from './AdmAccounts';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {AdmtransactionsAccount} from './AdmAccounts';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    BaseUrl = `/rest/associate/v1`;

    OnAccountDetailsChange: BehaviorSubject<any>;
    OnAccountSingleChange: BehaviorSubject<any>;

    constructor(
        private api: ApiService,
        private utils: UtilsService,
        private f_progressBar: FuseProgressBarService
    
    )
    {
        this.OnAccountDetailsChange = new BehaviorSubject([]);
        this.OnAccountSingleChange = new BehaviorSubject([]);
    }

    get_asociate_accounts(personKey): Promise<any>{

        this.f_progressBar.show();
        const url = `${this.BaseUrl}/${personKey}/account`;
        return new Promise((resolve, reject) => {

            this.api.getMethod(url).then( balanceAccounts => {
                const accounts = <AdmAccount[]> balanceAccounts;
                this.f_progressBar.hide();
                resolve(accounts)
            })

            .catch(error => {
                this.f_progressBar.hide();
                this.utils.openSnackBar('ocurrió un problema al obtener las cuentas del associado  error: ' +  error.statusText);
                reject(error);
            })


        })

    }


    get_account_details(personKey:string, accountId: number) {

        this.f_progressBar.show();
        const url = `/rest/associate/v1/${personKey}/account/${accountId}/movements`;
        this.api.getMethod(url) 
            .then(data => {
                this.f_progressBar.hide();
                const account_details = (data[0]) ? data as AdmAccountBalanceDetail[] : [];
                this.OnAccountDetailsChange.next(account_details);
            })
            .catch(error => {
                this.f_progressBar.hide();
                this.utils.openSnackBar('ocurrió un problema al obtener detalle de cuenta associado  error: ' +  error.statusText);
                this.OnAccountDetailsChange.next([]);
            });

    }

    get_account_movements(activateRoute: ActivatedRoute, params?, _personKey?, _accountId?) {

        const personKey = activateRoute.snapshot.paramMap.get('personKey');
        const accountId = activateRoute.snapshot.paramMap.get('accountId');

        if (accountId) {
            this.f_progressBar.show();
            const url = `/rest/associate/v1/${personKey}/account/${accountId}/movements`;
    
            this.api.getMethod(url, params) 
                .then(data => {
                    this.f_progressBar.hide();
                    const account_details = (data[0]) ? data as AdmAccountBalanceDetail[] : [];
                    this.OnAccountDetailsChange.next(account_details);
                })
                .catch(error => {
                    this.f_progressBar.hide();
                    this.utils.openSnackBar('ocurrió un problema al obtener detalle de cuenta associado  error: ' +  error.statusText);
                    this.OnAccountDetailsChange.next([]);
                });
        }
        


    }    

    get_account_movements_report(activateRoute: ActivatedRoute, range?, _type?) {
        

        if (range.value.start  !== null && range.value.edn !== null) {
            const startDate =  moment(range.value.start).format('YYYY-MM-DD');
            const endDate = moment(range.value.end).format('YYYY-MM-DD');
            const personKey = activateRoute.snapshot.paramMap.get('personKey');
            const accountId = activateRoute.snapshot.paramMap.get('accountId');
            const type =  (_type) ? _type : 'xlsx';
    
            const params = {startDate, endDate, type};

            
            const url = `rest/associate/v1/${personKey}/account/${accountId}/movements`;
            this.utils.exportFile(url, params, 'xlsx', 'balance_de_cuentas' + personKey);
                
        }
        else {
            this.utils.openSnackBar('Debe Seleccionar un rango de fechas');
        }

    }

    get_single_account_detail(ativateRoute: ActivatedRoute): Promise <any> {
        return new Promise ((resolve, reject) => {
            this.f_progressBar.show();
            const personKey = ativateRoute.snapshot.paramMap.get('personKey');
            const accountId = ativateRoute.snapshot.paramMap.get('accountId');

            if (personKey && accountId) {
                const url = `/rest/associate/v1/${personKey}/account/${accountId}`;
                this.api.getMethod(url) 
                    .then(data => {
                        this.f_progressBar.hide();
                        const account_details = data['personAccount'] as AdmAccount
                        resolve(account_details)
                    })
                    .catch(error => {
                        this.f_progressBar.hide();
                        this.utils.openSnackBar('ocurrió un problema al obtener detalle de cuenta associado  error: ' +  error.statusText);
                    });
            }
        })

    }

    operate_transaction_account(transaction: AdmtransactionsAccount, personkey?, accountId?):  Promise <any> {
        return new Promise ((resolve, reject) => {
            delete transaction.account_id;
            delete transaction.account_balance_id;
            delete transaction.transaction_no
            delete transaction.date_created;

            const url = `/rest/associate/v1/${personkey}/account/${accountId}/movements`;
            this.f_progressBar.show();
            this.api.postMethod(url, transaction) 
                .then(response => {
                    this.f_progressBar.hide();
                    //update
                    this.utils.openSnackBar('Operacion Aplicada Satisfactoriamente')
                    this.api.getMethod(url).then(data => {
                        const account_details = (data[0]) ? data as AdmAccountBalanceDetail[] : [];
                        this.OnAccountDetailsChange.next(account_details);
                    })
                    
                })
                .catch(error => {
                    this.f_progressBar.hide();
                    this.utils.openSnackBar('Ocurrio Un Problema al aplicar el Movimeinto Por favor intente más tarde  - El Servidor respondió '  + error.statusText )
                })


        })
    }
}