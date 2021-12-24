import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { UtilsService }  from '../../../../../core/services/utils.service';
import { FuseProgressBarService } from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import { AdmCreditsIncomeExpenses } from './AdmCreditsIncomeExpenses';


@Injectable({
    providedIn: 'root'
})

export class CreditsIncomeExpensesService{
    constructor(
        private api: ApiService,
        private utils: UtilsService,
        private fuseprogressBar: FuseProgressBarService
    ){

    }

    getPatrimonialStatus(creditKey: string, typeIE : string): Promise<any>{
        const enpoint = `/rest/credits/v1/${creditKey}/credit_income_expense/${typeIE}`;
        return new Promise((resolve, reject) =>{
            this.fuseprogressBar.show()
            this.api.getMethod(enpoint)
                .then(res =>{
                    this.fuseprogressBar.hide()
                    const icomeExpenses = res
                    resolve(icomeExpenses)
                }).catch(error=>{
                    this.fuseprogressBar.hide()
                    this.utils.openSnackBar('Error al cargar la información')
                    reject(error)
                })
        })
    }
    savePatrimonialStatus(creditKey: string, data):Promise<any>{
        const enpoint = `/rest/credits/v1/${creditKey}/credit_income_expense/`;
        return new Promise((resolve, reject) =>{
            this.fuseprogressBar.show()
            this.api.postMethod(enpoint, data)
                .then(res =>{
                    this.fuseprogressBar.hide()
                    this.utils.openSnackBar('Registro guardado')                   
                    resolve(res)
                }).catch(error=>{
                    this.fuseprogressBar.hide()
                    this.utils.openSnackBar('Error al guardar registro')
                    reject(error)
                })
        })
    }
}