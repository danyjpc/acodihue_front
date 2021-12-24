import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../../../../../core/services/api.service';
import { AdmConyugue, ConyugueAsFiador } from './AdmConyugues';
import * as moment from 'moment';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UtilsService } from 'app/core/services/utils.service';

@Injectable({
    providedIn: 'root'
})
export class ConyuguesService {

    BaseUrl = `/rest/associate/v1`;
    OnConyuguesChanged: BehaviorSubject<any>;

    constructor(
        private api: ApiService,
        private progresBar: FuseProgressBarService,
        private utils: UtilsService,
    )
    {
        this.OnConyuguesChanged = new BehaviorSubject([])
    }

    get_conyugues_list(entityKey: string, creditEneable, observableFill = true): Promise<any> {


        return new Promise((resolve,reject) => {
            const url = (!creditEneable) ? 
                        `${this.BaseUrl}/${entityKey}/partner` :
                        `/rest/credits/v1/${entityKey}/partners`;
            this.api.getMethod(url) 
                .then(conyugues => {
                    if (observableFill) {
                        this.OnConyuguesChanged.next(conyugues as AdmConyugue[]);
                    }
                    resolve (conyugues as AdmConyugue[]);
                })
                .catch(error => {
                    reject('error al obtener coyugues ' + error.error.msg);
                })
        })
    }


    update_conyugue(conyugue: AdmConyugue, entityKey: string, creditEnable = false): Promise<any> {
        
        conyugue.person.birthday = moment(conyugue.person.birthday).format('YYYY-MM-DD');
        return new Promise((resolve,reject) => {
            this.progresBar.show()
            const url = (!creditEnable) ? 
                        `${this.BaseUrl}/${entityKey}/partner/${conyugue.partnerId}` :
                        `/rest/credits/v1/${entityKey}/partners/${conyugue.partnerId}`;

            conyugue.person.nameComplete = `${conyugue.person.firstName}, ${conyugue.person.lastName}`
            

            this.api.putMethod(url, conyugue) 
                .then(res => {
                    this.get_conyugues_list(entityKey, creditEnable);
                    this.progresBar.hide();
                    resolve ('Datos de conyugues/fiadores Actualizados');
                })
                .catch(error => {
                    this.progresBar.hide()
                    reject('error al actualizar datos del conyugues/fiadores ' + error.error.msg)
                })
        })
    }


    create_conyugue(conyugue: AdmConyugue, entityKey: string, creditEnable = false): Promise<any> {

        delete conyugue.dateCreated;
        delete conyugue.person.personKey;
        delete conyugue.partnerId;

        conyugue.person.birthday = moment(conyugue.person.birthday).format('YYYY-MM-DD');
        conyugue.person.nameComplete = `${conyugue.person.firstName}, ${conyugue.person.lastName}`

        return new Promise((resolve,reject) => {
            const url = (!creditEnable) ? 
                        `${this.BaseUrl}/${entityKey}/partner` :
                        `/rest/credits/v1/${entityKey}/partners/new`;

            this.progresBar.show();
            this.api.postMethod(url, conyugue) 
                .then(res => {
                    this.get_conyugues_list(entityKey, creditEnable);
                    this.progresBar.hide();
                    resolve ('Datos de conyugue o fiador Ingresados');
                })
                .catch(error => {
                    this.progresBar.hide()
                    reject('error al ingresar datos del conyugue o fiador ' + error.error.msg)
                })
        })
    }


    create_conyugue_as_fiador(newFiador: ConyugueAsFiador, creditKey) {
        this.progresBar.show();
        const url = `/rest/credits/v1/${creditKey}/partners`;
        this.api.postMethod(url, newFiador)
            .then(res => {
                this.progresBar.hide();
                this.get_conyugues_list(creditKey, true);
                this.utils.openSnackBar('Datos Insertados Corretamente')
                
            })

            .catch(error => {
                this.progresBar.hide();
                this.utils.openSnackBar('Error al Insertar el Cónyugue como fiador' + error.error.msg);
            });

    }
}