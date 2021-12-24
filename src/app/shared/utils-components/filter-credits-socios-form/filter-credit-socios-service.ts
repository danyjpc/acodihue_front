import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../../../core/services/api.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {UtilsService} from '../../../core/services/utils.service';
import { FilterParams } from './admFilterParams';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class FilterCreditsSociosService {


    OnListadoSociosChange: BehaviorSubject<any>;
    OnListadoCreditsChange: BehaviorSubject<any>;

    constructor(
        private api: ApiService,
        private f_progressBar: FuseProgressBarService,
        private utils: UtilsService
    )
    {
        this.OnListadoCreditsChange =  new BehaviorSubject([]);
        this.OnListadoSociosChange =  new BehaviorSubject([]);
    }


    async filter_data(params: FilterParams, type){
        // format data
        params.date_ini = moment(params.date_ini).format('YYYY-MM-DD');
        params.date_end = moment(params.date_end).format('YYYY-MM-DD');

        this.f_progressBar.show();
        const url = (type && type == 'credits') ? `/rest/credits/v1` : `/rest/preinscripciones`;
        try {
            this.f_progressBar.hide();
            const data =  await this.api.getMethod(url, params);

            if (type && type == 'credits') {
                this.OnListadoCreditsChange.next(data)
            }
            else {
                this.OnListadoSociosChange.next(data)
            }
        } catch (error) {
            this.f_progressBar.hide();
            this.utils.openSnackBar('Error al filtrar datos, por favor intente más tarde');
        }

        
    }
}