import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Months, UtilsService } from 'app/core/services/utils.service';
import { PersonKey } from 'app/shared/adm-models/AdmPerson';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountsService } from '../../../accounts.service';
import { AdmAccountBalanceDetail } from '../../../AdmAccounts';
import * as moment from 'moment';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {
  @Input() currentMont: boolean;
  accountDetails: AdmAccountBalanceDetail[] = [];
  $destroy: Subject<any>;
  dataSource = new MatTableDataSource<AdmAccountBalanceDetail>();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['details', 'debit', 'credit', 'balance'];
  Monts: Months[] = [];
  currenMont: number;

  constructor(
    private accountService: AccountsService,
    private activateRoute:  ActivatedRoute,
    private router: Router,
    private utils: UtilsService
  ) 
  { 
    
    this.$destroy = new Subject();
    this.Monts =  this.utils.get_months("current");
  }

  ngOnInit(): void {
    //this.listar_detalle_cuentas();
    this.loadMovementesByMont();
    this.listar_detalle_cuentas();
    
  
  }

  listar_detalle_cuentas(){
    this.accountService.OnAccountDetailsChange
    .pipe(takeUntil(this.$destroy))
    .subscribe( data => {
        if (data) {
          this.accountDetails = data;

          this.dataSource.data = data as AdmAccountBalanceDetail[];        
          this.dataSource.paginator = this.paginator;
        }

      

    });
  }

  loadMovementesByMont(_mes?) {
    const mes = (_mes) ? _mes : (moment().month()  + 1);
    this.currenMont =  mes;
    const año = moment().year();
    const params = { año, mes };
    this.accountService.get_account_movements(this.activateRoute, params);
    
  }

  downloadMovementsReport() {

      // console.log(this.range.value.start)

      this.accountService.get_account_movements_report(this.activateRoute, this.range);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    
    
  }


  

}
