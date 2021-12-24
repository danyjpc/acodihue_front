import { Injectable } from '@angular/core';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UtilsService } from 'app/core/services/utils.service';
import { reject } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../../../../core/services/api.service'
import { AdmAgencias } from './AdmAgencia';


@Injectable({providedIn: 'root'})


export class AgenciasService {


    base_url = '/rest/agencies/v1';
    OnAgenciasListaChange : BehaviorSubject<any>;
    OnAgenciasFilterChange: BehaviorSubject<any>;

    constructor(
        private api : ApiService,
        private fuseProgresbar: FuseProgressBarService,
        private utils: UtilsService
    )
    {
        this.OnAgenciasListaChange = new BehaviorSubject([]);
        this.OnAgenciasFilterChange = new BehaviorSubject([]);

    }


    listar_agencias(params?): Promise<any> {
        return new Promise((resolve, reject) =>{
            this.fuseProgresbar.show()
            const url = this.base_url;

            this.api.getMethod(url)
                .then((agencias: AdmAgencias[]) => { 
                    this.fuseProgresbar.hide();
                    this.OnAgenciasListaChange.next(agencias);
                    resolve (agencias);
                })
                .catch(error => {
                    this.fuseProgresbar.hide();
                    console.log(error);
                    this.utils.openSnackBar('Error al obtener agenciass el servidor respondió ' + error.data.httpStatus)
                    reject ('Error al obtener Agencias el servidor respondió ' + error.data.httpStatus)
                })

            
        })
    }



    create_new_agencia(_agencia: AdmAgencias): Promise<any> {

        return new Promise((resolve, reject) => {
            const url = this.base_url;
            delete _agencia.organizationKey;
            this.api.postMethod(url, _agencia).then(response => {
                resolve ('Nueva Agencia Creada');
                this.listar_agencias();
            })
            .catch(error => {
                console.log(error)
                reject ('Error al insertar una nueva Agencia  el servidor respondió ' + error.httpStatus)
            })

        })
    }


    update_agencia(agencia: AdmAgencias): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `${this.base_url}/${agencia.organizationKey}`;
            this.api.putMethod(url, agencia).then(response => {
                resolve ('Datos Actualizados');
                this.listar_agencias();
            })
            .catch(error => {
                console.log(error);
                reject ('Error al insertar una nueva Agencia  el servidor respondió ' + error.statusText)
            })
        })
    }



}


