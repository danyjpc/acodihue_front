import { Component, OnInit } from '@angular/core';
import { AdmTypology, TypologyId } from '../../../../../shared/adm-models/AdmTypology';
import { MatTableDataSource } from '@angular/material/table';
import { BankAccountsService } from '../bank-accounts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BankAccountsFormComponent } from '../bank-accounts-form/bank-accounts-form.component';
import { AssignOperationFormComponent } from '../assign-operation-form/assign-operation-form.component';
import { environment as env } from 'environments/environment';


@Component({
  selector: 'app-bank-accounts-list',
  templateUrl: './bank-accounts-list.component.html',
  styleUrls: ['./bank-accounts-list.component.scss']
})
export class BankAccountsListComponent implements OnInit {

  displayedColumns: string[] = [ 'description', 'value1','value3', 'actions'];
  typologyData : AdmTypology[] = [];

  operacionDebe = env.DEFAULT_OPERATIONS_TYPOLOGY_DEBE;
  operacionHaber = env.DEFAULT_OPERATIONS_TYPOLOGY_HABER;

  $destroy: Subject<any>;
  constructor(
    private accountService : BankAccountsService,
    private dialog: MatDialog,
  )
  {
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.getListTypolies();
    //subcribe for list change 
    this.accountService.onchangeTypology
    .pipe(takeUntil(this.$destroy))
    .subscribe(typologies => {
        this.typologyData = typologies
        //console.log(this.typologyData)
      }
    )
  }

  async getListTypolies(){
    this.typologyData = await this.accountService.getAccountTypes() as AdmTypology[];
    //console.log(this.typologyData)
  }

  openEditForm(typology : AdmTypology){
    const dialogReg = this.dialog.open(BankAccountsFormComponent, {
      width:'350px',
      data :{
        typology
      }
    })
    dialogReg.afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(async(typology: AdmTypology)=>{
        if(typology){
          this.accountService.updateTypology(typology);
        }
      })
  }

  assingOperation(typology, IdOperation){
    const dialog = this.dialog.open(AssignOperationFormComponent,{
      width:'500px',
      data : {
        typology,
        IdOperation
      }
    })
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    
  }
}
