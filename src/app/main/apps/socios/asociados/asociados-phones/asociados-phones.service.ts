import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../../../../../core/services/api.service';
import {environment as env } from '../../../../../../environments/environment';
import { AdmPhone } from '../../../../../shared/adm-models/AdmPhone';

@Injectable({
    providedIn: 'root'
})
export class AsociadosPhonesService {

    baseUrl= `/rest/associate/v1`;
    OnAsociatePhonesChange: BehaviorSubject<any>;
    phonesURL= `/rest/phones`;

    constructor( 
        private api: ApiService
    ) 
    {
        this.OnAsociatePhonesChange = new BehaviorSubject([])
    }

    get_associate_phones(personKey: string, status?): Promise<any>  { 

        return new Promise((resolve, reject) => {
            const url = `${this.baseUrl}/${personKey}/phone`;
            const estad_telefono = (status) ?  status :  env.DEFAULT_STATUS_ACTIVE;
            const params = {estad_telefono}
    
            this.api.getMethod(url, params)
                    .then(phones => {
                        resolve (phones  as AdmPhone[])
                        this.OnAsociatePhonesChange.next(phones);
                    })
                    .catch(error => {
                        reject ('error al obtener direcciones, ' + error.statusText);
                    })
        });

    }


    new_phone(phone: AdmPhone, personKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `${this.baseUrl}/${personKey}/phone`;
            this.api.postMethod(url, phone)
            .then(res => {
                resolve('Teléfono Agregado');
                this.get_associate_phones(personKey)
            })
            .catch(error => {
                reject('error al insertar teléfono el servidor respondió ' + error.statusText)
            })
        })
    }

    update_phone(phone: AdmPhone, personKey?: string): Promise<any> {
        
        return new Promise((resolve, reject) => {
            const url = `${this.baseUrl}/${personKey}/phone/${phone.phoneId}`;
            this.api.putMethod(url, phone)
                    .then(res => {
                        resolve('Teléfono Actualizado');
                        this.get_associate_phones(personKey)
                    })
                    .catch(error => {
                        reject('error al actualizar teléfono el servidor respondió ' + error.statusText)
                    })
        })

    }

}