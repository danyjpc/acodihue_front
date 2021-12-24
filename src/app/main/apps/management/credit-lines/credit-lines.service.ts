import { Injectable } from '@angular/core';
import { AdmCreditLine } from './AdmCreditLines';
import {ApiService} from '../../../../core/services/api.service';
import {UtilsService} from '../../../../core/services/utils.service';
import { FuseProgressBarService } from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import { environment as env  } from '../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CreditLineService {
    
    baseUrl: string = `/rest/creditLines/v1`;
    onCreditLinesChange: BehaviorSubject<any>;

    constructor(
        private api: ApiService,
        private fuseProgresBar: FuseProgressBarService,
        private utils: UtilsService
    ){
        this.onCreditLinesChange = new BehaviorSubject([]);
    }
    create_new_credit_line(creditLine: AdmCreditLine): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.fuseProgresBar.show();
            const url = `${this.baseUrl}`;
            this.api.postMethod(url, creditLine)
                .then(res => { 
                    this.fuseProgresBar.hide();
                    this.utils.openSnackBar('Registo Almacenado');
                    this.get_credit_lines();
                    resolve (true)
                })
                .catch(error => {
                    this.fuseProgresBar.hide()
                    this.utils.openSnackBar('Error al guardar en la base de datos, intente más tarde')
                    reject(true)

                })
        })
    }
    
 
    get_credit_lines(params?): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fuseProgresBar.show();

            const url = this.baseUrl;
            const _params = (params) ? params : {status: env.DEFAULT_STATUS_ACTIVE} 
            
            this.api.getMethod(url)
                    .then(data => {
                        this.fuseProgresBar.hide();
                        const creditLines =  data as AdmCreditLine[];
                        this.onCreditLinesChange.next(creditLines);
                        resolve(creditLines);
                    })
                    .catch(error => {
                        this.fuseProgresBar.hide()
                        this.utils.openSnackBar('Error al Obtener Lineas de Crédito')
                        reject([]);
                    });
        });
    }

    update_credit_lines(creditLine: AdmCreditLine, params?): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fuseProgresBar.show();

            const url = `${this.baseUrl}/${creditLine.creditLineId}`;
             
            
            this.api.putMethod(url, creditLine)
                    .then(response => {
                        this.fuseProgresBar.hide();
                        this.get_credit_lines();
                        this.utils.openSnackBar('Información Actualizada')
                        resolve(true);
                    })
                    .catch(error => {
                        this.fuseProgresBar.hide();
                        this.utils.openSnackBar('Error al Actualizar Lineas de Crédito')
                        reject(true);
                    });
        });
    }
}
