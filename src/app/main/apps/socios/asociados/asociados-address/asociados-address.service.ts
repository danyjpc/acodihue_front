import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../../../../../core/services/api.service';
import {environment as env } from '../../../../../../environments/environment';
import {AdmAddress} from '../../../../../shared/adm-models/AdmAddress';
import { ADDRGETNETWORKPARAMS } from 'dns';

@Injectable({
    providedIn: 'root'
})
export class AsociadosAddressesService {

    baseUrl= `/rest/associate/v1`;
    addressURL= `/rest/addresses`;
    OnAsociateAddressesChange: BehaviorSubject<any>;

    constructor( 
        private api: ApiService
    ) 
    {
        this.OnAsociateAddressesChange = new BehaviorSubject([])
    }

    get_associate_addresses(entityKey: string, status = env.DEFAULT_STATUS_ACTIVE, creditEnable ): Promise<any>  { 

        return new Promise((resolve, reject) => {
            const url = (!creditEnable) ?
                        `${this.baseUrl}/${entityKey}/address` :
                        `/rest/credits/v1/${entityKey}/addresses`;

            const estado_direccion = (status) ?  status :  env.DEFAULT_STATUS_ACTIVE;
            const params = {estado_direccion};
    
            this.api.getMethod(url, params)
                    .then(addresses => {
                        resolve (addresses  as AdmAddress[])
                        this.OnAsociateAddressesChange.next(addresses);
                    })
                    .catch(error => {
                        reject ('error al obtener direcciones, ' + error.statusText);
                    });
        });

    }

    update_address(address: AdmAddress, entityKey: string, creditEnable): Promise<any> {
        
        return new Promise((resolve, reject) => {
            const url = (!creditEnable) ? 
                        `${this.baseUrl}/${entityKey}/address/${address.addressId}` : 
                        `/rest/credits/v1/${entityKey}/addresses/${address.addressId}`;

            this.api.putMethod(url, address)
                    .then(res => {
                        resolve('Dirección Actualizada');
                        this.get_associate_addresses(entityKey, env.DEFAULT_STATUS_ACTIVE, creditEnable)
                    })
                    .catch(error => {
                        reject('error al actualizar direccion el servidor respondió ' + error.statusText)
                    })
        })

    }

    new_address(address: AdmAddress, entityKey: string, creditEnable): Promise<any> {
        //
        delete address.addressAccount;
        delete address.addressLine2;
        delete address.country;
        delete address.documentAcount;
        delete address.type;

        return new Promise((resolve, reject) => {
            const url = (!creditEnable) ? 
                        `${this.baseUrl}/${entityKey}/address` :
                        `/rest/credits/v1/${entityKey}/addresses/new`;
            this.api.postMethod(url, address)
                    .then(res => {
                        resolve('Dirección Agregada');
                        this.get_associate_addresses(entityKey, env.DEFAULT_STATUS_ACTIVE, creditEnable);
                    })
                    .catch(error => {
                        reject('error al insertar direccion el servidor respondió ' + error.error.msg);
                    });
        })

    }
}