import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { UtilsService }  from '../../../../../core/services/utils.service';
import { FuseProgressBarService } from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import { AdmCreditGuarantees } from './AdmCreditGuarantees';




@Injectable({
    providedIn: 'root'
})
export class CreditGuaranteesService {
    constructor(
        private api: ApiService,
        private utils: UtilsService,
        private fuseprogressBar: FuseProgressBarService
    )
    {
    
    }

    create_new_guarantee(creditKey: string,  guarantee: AdmCreditGuarantees):  Promise <any> {
        return new Promise ((resolve, reject) => {
            delete guarantee.guaranteeId;

            const url = `/rest/credits/v1/${creditKey}/guarantee`;
            this.fuseprogressBar.show()
            this.api.postMethod(url, guarantee)
                .then(response => {
                    this.fuseprogressBar.hide();
                    this.utils.openSnackBar('Registro Insertado')
                    resolve (true)
                })
                .catch(error => {
                    this.fuseprogressBar.hide();
                    this.utils.openSnackBar('Error Al ingresar datos '  +  error.error.msg)
                    reject(true)
                })
        })
    }

    update_new_guarantee(creditKey: string,  guarantee: AdmCreditGuarantees):  Promise <any> {
        return new Promise ((resolve, reject) => {
            const url = `/rest/credits/v1/${creditKey}/guarantee/${guarantee.guaranteeId}`;
            this.fuseprogressBar.show()
            this.api.putMethod(url, guarantee)
                .then(response => {
                    this.fuseprogressBar.hide();
                    this.utils.openSnackBar('Registro Actualizado')
                    resolve (true)
                })
                .catch(error => {
                    this.fuseprogressBar.hide();
                    this.utils.openSnackBar('Error Al actualizar datos '  +  error.error.msg);
                    reject(true);
                });
        });
    }
    
    get_credit_guarantees(creditKey: string):  Promise <any> {
        return new Promise ((resolve, reject) => {
            const url = `/rest/credits/v1/${creditKey}/guarantee`;
            this.fuseprogressBar.show()
            this.api.getMethod(url)
                .then(response => {
                    this.fuseprogressBar.hide();
                    const guarantess =  response as AdmCreditGuarantees[];
                    resolve (guarantess)
                })
                .catch(error => {
                    this.fuseprogressBar.hide();
                    this.utils.openSnackBar('Error Al obtener garantias del crédito '  +  error.error.msg)
                    reject(true);
                })
        })
    }
}