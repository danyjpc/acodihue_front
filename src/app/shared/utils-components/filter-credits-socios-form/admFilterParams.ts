import * as moment from 'moment';

export class FilterParams  {
    date_ini: string = moment( new Date()).startOf('year').format('YYYY-MM-DD');
    date_end: string = moment (new Date()).endOf('month').format('YYYY-MM-DD');
    agency? : number;
    //credits
    status_operated?: number;
}
