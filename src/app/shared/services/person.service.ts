import { Injectable } from '@angular/core';
import { reject } from 'lodash';
import { ApiService } from '../../core/services/api.service';
import { AdmPerson } from '../adm-models/AdmPerson';
import {AdmPhone} from '../adm-models/AdmPhone';
import { AdmAddress } from '../adm-models/AdmAddress';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AssociateManagerService } from 'app/main/apps/socios/asociados/AssociateManagerService';


@Injectable({providedIn: 'root'})
export class PersonsService {
    OnPersonChange: BehaviorSubject<any>;
    OnListaPersonsChange: BehaviorSubject<any>;
    constructor( 
        private api: ApiService,
        private f_progressBar: FuseProgressBarService,
        private asociadosManager: AssociateManagerService
        ) { 
        this.OnPersonChange = new BehaviorSubject([]);
        this.OnListaPersonsChange = new BehaviorSubject([]);

    }
    
    getPersons(params?): Promise<any>{
        const url = `/rest/persons`;
        return new Promise((resolve, reject) => {
            this.api.getMethod(url, params).then(res => {
                let persons = res as AdmPerson[];
                this.OnListaPersonsChange.next(persons);
                resolve(persons);
            }).
            catch(error => {
                
                this.OnListaPersonsChange.next([]);
                reject('error al obtener listado de pacientes');
            });
        });
    }   

    CreatePerson(person: AdmPerson): Promise<any> {

        const url = `/rest/persons`;
        return new Promise((resolve,  reject) => {
            this.api.postMethod(url, person).then (res => {
                resolve(res);
            })
            .catch(error => {
                reject('Error al insertar persona el servidor respondió ' + error.error.message);
            });
        });
    }

    CreatePhones(phone: AdmPhone): Promise<any> {
        const url = `/rest/phones`;
        return new Promise((resolve,  reject) => {
            this.api.postMethod(url, phone).then (res => {
                resolve(res);
            })
            .catch(error =>{
                reject('Error al insertar telefono de contacto el servidor respondió ' + error.error.message);
            });
        });
    }


    CreateAddress(address: AdmAddress): Promise<any> {
        const url = `/rest/addresses`;
        return new Promise((resolve,  reject) => {
            this.api.postMethod(url, address).then (res => {
                resolve(res);
            })
            .catch(error =>{
                reject('Error al insertar direcciones de contacto el servidor respondió ' + error.error.message);
            });
        });
    }

    getPerson(personKey: string): Promise<any>{
        const url = `/rest/persons/v1/${personKey}`;
        return new Promise((resolve, reject) => {
            this.api.getMethod(url).then(res => {
                let person = res as AdmPerson;
                person.birthday =  moment(person.birthday).format('YYYY-MM-DD');
                this.OnPersonChange.next(person);
                resolve(person);
            }).
            catch(error => {
                const person = new AdmPerson();
                this.OnPersonChange.next(person);
                reject('error al obtener datos de persona');
            });
        });
    }    

    updatePerson(persona: AdmPerson): Promise<any> {
        // persona.birthday =  moment(persona.birthday).format('YYYY-MM-DD');
        this.f_progressBar.show();
        const url = `/rest/persons/v1/${persona.personKey}`;
        return new Promise((resolve, reject) => {
            this.api.putMethod(url, persona).then(res => {
                //this.getPerson(persona.personKey);
                this.asociadosManager.get_associate_single(persona.personKey)
                this.f_progressBar.hide();
                resolve('Datos Actualizados');
            }).
            catch(error => {
                this.f_progressBar.hide();
                reject('error al actualizar a la persona datos de persona.');
            });
        });
    }

}
