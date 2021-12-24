import { environment as env } from '../../../../../../environments/environment';
import { TypologyId } from '../../../../../shared/adm-models/AdmTypology';

export class AdmCreditsIncomeExpenses{
    totalByMonth : number = 0;
    totalByYear : number = 0;
    accounts : Accounts [] = []
}

export class Accounts{
    creditIncomeExpenseId : number = 0
    amount : number = 0
    amountyear : number = (this.amount*12)
    account : TypologyId;

    constructor(){
        this.account = new TypologyId()
        this.account.typologyId = env.EMPTY_TYPOLOGY
        this.account.description = 'S/D'
    }
}