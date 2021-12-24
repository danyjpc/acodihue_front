import { Injectable, enableProdMode } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { environment as env } from 'environments/environment';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { PersonsService } from '../../../../shared/services/person.service';
import { reject } from 'lodash';
import { AdmUser } from '../../../../shared/adm-models/AdmUser';



@Injectable({providedIn: 'root'})

export class UserService {

    OnUserChange: BehaviorSubject<any>;
    OnSingleUserChange: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onUserLoguedChanged: Subject<any>;
    onUsersListChange: BehaviorSubject<any>;
    onUserFilterListChange: BehaviorSubject<any>;

    


    constructor( 
        private api: ApiService, 
        private PersonService: PersonsService, 
        private _fuseProgressBarService: FuseProgressBarService) {
        this.OnUserChange        = new BehaviorSubject([]);   
        this.OnSingleUserChange  = new BehaviorSubject([]);   
        
        this.onUserLoguedChanged = new BehaviorSubject([]);
        this.onUserFilterListChange = new BehaviorSubject([]);
        this.onUsersListChange   = new BehaviorSubject([]); 
    }
     
    getAllUsers(): Promise <any> {
        const endpoint =   `/rest/users/v1`;
        return new Promise((resolve, reject) => {
            this.api.getMethod(endpoint).then(users => {
                this.onUsersListChange.next(users);
                resolve (users);
            }).catch(( error ) => {
                reject('Error al obtener la lista de usuarios ' + error.statusText);
            })
        });
    }


    saveUser(user:AdmUser): Promise<any> {
        this._fuseProgressBarService.show();
        const endpoint =  `/rest/users/v1`;
        return new Promise ((resolve, reject) => {
            this.api.postMethod(endpoint, user).then(( response ) => {
                resolve('Usuario Insertado');
                this._fuseProgressBarService.hide();

                //
                this.getAllUsers();
                
            }).catch(( error ) => {
                this._fuseProgressBarService.hide();
                reject('Error al guardar el nuevo usaurio' + error.statusText);
            })
        });
    }

    updateUser(user:AdmUser): Promise<any> {

        this._fuseProgressBarService.show();
        const endpoint =  `/rest/users/v1/${user.person.personKey}`;
        return new Promise ((resolve, reject) => {
            this.api.putMethod(endpoint, user).then(( response ) => {
                resolve('Datos Actualizados');
                this._fuseProgressBarService.hide();

                //
                this.getAllUsers();
                
            }).catch(( error ) => {
                this._fuseProgressBarService.hide();
                reject('Error al actualizar datos de nuevo usaurio' + error.statusText);
            })
        });
    }
}