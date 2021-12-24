import { Injectable } from '@angular/core';
import { reject } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import {ApiService} from '../../../../core/services/api.service'
import { AdmAsociacion } from './AdmAsociacion';

@Injectable({
    providedIn: 'root'
})
export class AsociacionesService {

    base_url = '/rest/associations/v1';
    OnAsociacionesListaChange : BehaviorSubject<any>;
    OnAsociacionesFilterChange : BehaviorSubject<any>;

    constructor(
        private api : ApiService,
    )
    {
        this.OnAsociacionesListaChange = new BehaviorSubject([]);
        this.OnAsociacionesFilterChange = new BehaviorSubject([]);
    }

    listar_asociaciones(params?): Promise<any> {
        return new Promise((resolve, reject) =>{
            const url = this.base_url;

            this.api.getMethod(url)
                .then(asociaciones => { 
                    resolve (asociaciones);
                    this.OnAsociacionesListaChange.next(asociaciones);
                })
                .catch(error => {
                    console.log(error.statusText)
                    reject ('Error al obtener Asociaciones  el servidor respondió ' + error.statusText)
                })

            
        })
    }

    create_new_asociacion(_asociacion: AdmAsociacion): Promise<any> {

        return new Promise((resolve, reject) => {

            delete _asociacion.contact.personKey;
            const url = this.base_url;
            //remove organization key not need for new asociations
            delete _asociacion.association.organizationKey;

            this.api.postMethod(url, _asociacion).then(response => {
                resolve ('Nueva Asociación Creada');
                this.listar_asociaciones();
            })
            .catch(error => {
                console.log(error.statusText);
                reject ('Error al insertar una nueva Asociación  el servidor respondió ' + error.statusText)
            })

        })
    }

    update_asociacion(_asociacion: AdmAsociacion): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `${this.base_url}/${_asociacion.association.organizationKey}`;
            this.api.putMethod(url, _asociacion).then(response => {
                resolve ('Datos Actualizados');
                this.listar_asociaciones();
            })
            .catch(error => {
                console.log(error);
                reject ('Error al insertar una nueva Asociación  el servidor respondió ' + error.statusText)
            })
        })
    }
}