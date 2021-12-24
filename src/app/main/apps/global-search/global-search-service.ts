import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../../core/services/api.service';
import {UtilsService} from '../../../core/services/utils.service';

import { FuseProgressBarService } from '../../../../@fuse/components/progress-bar/progress-bar.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalSearchService {
    OnRecordsResultChange: BehaviorSubject<any>;

    constructor(
        private router: Router,
        private _fuseprogresBar: FuseProgressBarService, 
        private api: ApiService,
        private utils: UtilsService
    ) 
    {
        this.OnRecordsResultChange  = new BehaviorSubject([]);
    }

    get_search_results(value): Promise<any>{
        return new Promise ((resolve, reject) => {
            this._fuseprogresBar.show();
            const url = `/rest/global-search?search=${value}`;
            this.api.getMethod(url)
                .then(data => {
                    this._fuseprogresBar.hide();
                    if (data['records']) {
                        //this.OnRecordsResultChange.next(data);
                        resolve(data)
    
                        const _url = `/search/value/${value}`
                        this.router.navigateByUrl(_url)
                    } else {
                        resolve(data)
                        this.utils.openSnackBar('no se encontraron Coincidencias intente con otro párametro')
                    }
    
    
                })
    
                .catch(error => {
                    this._fuseprogresBar.hide();
                    this.utils.openSnackBar('Error en la búsqueda General, no se encontraron registros')
                    reject(error)
                })
    
        })


    }
}