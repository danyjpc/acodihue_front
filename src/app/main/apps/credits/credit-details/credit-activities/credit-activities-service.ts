import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { UtilsService } from '../../../../../core/services/utils.service';
import { FuseProgressBarService } from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import { AdmCreditActivity } from './AdmCreditActivities';
import { resolve } from 'dns';


@Injectable({
    providedIn: 'root'
})
export class CreaditActivitiesService {

    constructor(
        private api: ApiService,
        private utilsService: UtilsService,
        private fuseprogressBar: FuseProgressBarService
    ) {

    }

    get_credit_activities(creditKey: string): Promise <any>{

        return new Promise((resolve, reject) => {
            this.fuseprogressBar.show();
            const url = `/rest/credits/v1/${creditKey}/activity`;
            this.api.getMethod(url)
                .then(response => {
                    this.fuseprogressBar.hide();
                    const _data = response as AdmCreditActivity[];
                    resolve(_data);
                })

                .catch(error => {
                    this.fuseprogressBar.hide();
                    this.utilsService.openSnackBar('Error al obtener actividades de credito ' + error.error.msg)
                    reject([])
                })
    
        })

    }

    create_credit_activity(creditKey: string,  creditActivity:  AdmCreditActivity) : Promise <any> {
        delete creditActivity.activityId;
        
        return new Promise((resolve, reject) => {
            this.fuseprogressBar.show();
            const url = `/rest/credits/v1/${creditKey}/activity`;
            this.api.postMethod(url, creditActivity)
                .then(response => {
                    this.fuseprogressBar.hide();
                    this.utilsService.openSnackBar('Datos Ingresados');
                    resolve(true);
                })

                .catch(error => {
                    this.fuseprogressBar.hide();
                    this.utilsService.openSnackBar('Error al crear  actividades de credito ' + error.error.msg)
                    reject(true)
                })
        })
    }

    update_credit_activity(creditKey: string,  creditActivity:  AdmCreditActivity) : Promise <any> {
        return new Promise((resolve, reject) => {
            this.fuseprogressBar.show();
            const url = `/rest/credits/v1/${creditKey}/activity/${creditActivity.activityId}`;
            this.api.putMethod(url, creditActivity)
                .then(response => {
                    this.utilsService.openSnackBar('Datos Actualizados');
                    this.fuseprogressBar.hide();
                    resolve(true);
                })

                .catch(error => {
                    this.fuseprogressBar.hide();
                    this.utilsService.openSnackBar('Error al Actualizar  actividades de credito ' + error.error.msg)
                    reject(true)
                })
        })
    }



    
}

