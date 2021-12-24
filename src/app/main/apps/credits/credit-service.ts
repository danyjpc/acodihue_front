import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {UtilsService} from '../../../core/services/utils.service';
import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {AdmCredit} from './AdmCredit';
import { timeStamp } from 'console';
import { Router } from '@angular/router';
import { AdmCheckList, PathDocument } from './credit-details/credits-check-list/AdmCreditCheckList';
import { FilterCreditsSociosService } from 'app/shared/utils-components/filter-credits-socios-form/filter-credit-socios-service';



@Injectable({
    providedIn: 'root'
})
export class CreditService {

    constructor(
        private api: ApiService, 
        private utils: UtilsService,
        private fuseprogressBar: FuseProgressBarService,
        private route: Router,
        private filterCreditsSociosService: FilterCreditsSociosService
    ) 
    {
        
    }

    create_new_credit(credit: AdmCredit, personkey?): Promise<any> {
        delete credit.creditKey;
        delete credit.calculator.person;
        delete credit.calculator.applicationDate;
        delete credit.calculator.noPeriod;
        delete credit.calculator.noPayments;
        delete credit.calculator.interestRate;
        delete credit.calculator.createdBy;
        delete credit.calculator.credit;
        delete credit.calculator.creditLine; 
        delete credit.calculator.interestFinal;

        const url = `/rest/credits/v1/`;
        return new Promise((resolve, reject) => {
            this.fuseprogressBar.show();
            this.api.postMethod(url, credit).then(res => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Credito Registrado Satisfactoriamente');

                //redirect
                if (personkey) {
                    const redirect_url =  `/associate/profile/${personkey}/creditos`;
                    this.route.navigateByUrl(redirect_url);
                }


                resolve(true);
            })
            .catch(error => {
                console.log(error);
                this.fuseprogressBar.hide();
                const erroMsg = `Error al crear nueva solicitud de crédito ${error}`;
                this.utils.openSnackBar(erroMsg);
                reject(erroMsg)
            });
        });

    }


    list_credits(personKey?: string): Promise<any>{

        this.fuseprogressBar.show();
        return new Promise((resolve, reject) => {
            const url =  (personKey !== 'null' ) ? `/rest/credits/v1/associates/${personKey}` : `/rest/credits/v1/`;
            this.api.getMethod(url)
                .then((credits: AdmCredit[]) => {
                    const _credits = credits;
                    
                    this.filterCreditsSociosService.OnListadoCreditsChange.next(_credits);
                    this.fuseprogressBar.hide();
                    resolve(credits);
                })
                .catch(error => {
                    this.fuseprogressBar.hide();
                    this.filterCreditsSociosService.OnListadoCreditsChange.next([]);
                    this.utils.openSnackBar('Error al Obtener listado de creditos, por favor intente más tarde')
                    reject(error);
                });
        });

    }

    get_single_credit(creditKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fuseprogressBar.show();
            const url = `/rest/credits/v1/${creditKey}`;
            this.api.getMethod(url).then(response => {
                this.fuseprogressBar.hide();

                resolve(response as AdmCredit)
            })
            .catch(error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al obtener detalle de credito')
                reject (error)
            })
        })
    }

    updateCreditInfo(credit: AdmCredit){
        this.fuseprogressBar.show();
        const url = `/rest/credits/v1/${credit.creditKey}`;
        this.api.putMethod(url, credit).then(response => {
            this.fuseprogressBar.hide();
        })
        .catch(error => {
            this.fuseprogressBar.hide();
            this.utils.openSnackBar('Error al Acutalizar detalle de credito')
           
        });
    }

    getCreditRessume(creditKey: string): Promise <any> {
        return new Promise ((resolve, reject) => {
            const url = `/rest/credits/v1/${creditKey}/requirements`;
            this.fuseprogressBar.show();

            this.api.getMethod(url).then(data => {
                this.fuseprogressBar.hide();
                const details = data as  AdmCheckList[];
                resolve(details);
            })
            .catch(Error => {
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al Obtener resumen de credito ' + Error.error.msg);
                reject(true);
            });

        });
    }

    //Obtener los paths y nombre de los documentos de creditos
    getPathDocs():Promise<any>{
        return new Promise ((resolve, reject)=>{
            const url =`/rest/credit/v1/files/path_doc`;
            this.fuseprogressBar.show();
            this.api.getMethod(url).then(data=>{
                this.fuseprogressBar.hide();
                const listPaths = data as PathDocument [];
                resolve(listPaths);
            }).catch(error=>{
                this.fuseprogressBar.hide();
                this.utils.openSnackBar('Error al obtener el listado de dirrecciones de los documentos');
                reject('Error al obtener el listado de dirrecciones de los documentos');
            })
        })
    }
    
}   

