import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmTypology } from '../../../../../shared/adm-models/AdmTypology';
import { BankAccountsService } from '../bank-accounts.service';
import { environment as env } from 'environments/environment.prod';
import { AdmBankAccount } from '../AdmBankAccount';

@Component({
  selector: 'app-assign-operation-form',
  templateUrl: './assign-operation-form.component.html',
  styleUrls: ['./assign-operation-form.component.scss']
})
export class AssignOperationFormComponent implements OnInit {
  accountType : AdmTypology;
  idTypologyOperation : number;

  //Para cargar todas las operaciones
  operaciones : AdmTypology []= [];
  //Para cargar las operaciones que ya estan assignadas
  oAssigned : AdmTypology []= [];
  //Para mostrar las asignadas y las que no han sido asignadas
  allShow : AdmBankAccount []= [];
  message : string ="";


  constructor(
    public matDialogRef: MatDialogRef<AssignOperationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private accountService : BankAccountsService
  ) { 
    this.accountType = data.typology
    this.idTypologyOperation = data.IdOperation
  }

  ngOnInit(): void {
    if(this.idTypologyOperation == env.DEFAULT_OPERATIONS_TYPOLOGY_DEBE){this.message="debe"}else{this.message ="haber"};
    this.getOperation(this.accountType.typologyId);
    
  }

  async getOperation(idAccountType){
    this.operaciones = await this.accountService.getParentTypology2(this.idTypologyOperation) as AdmTypology[];
    this.oAssigned= await this.accountService.getAssignedTypologies(idAccountType, this.idTypologyOperation) as AdmTypology[];
    this.comparison()
  }

  comparison(){
    this.operaciones.forEach(oper => {
      if(this.checkSome(this.oAssigned, oper)){
        this.initial(true, oper, this.allShow)
      } else{
        this.initial(false, oper, this.allShow)
      }
    });
  }

  //Compara si existe una coencidencia en el array de todas las typologias con las typologias assignadas
  checkSome(arr, val) {
    return arr.some(arrVal =>val.typologyId==arrVal.typologyId)
  }

  //Crea un nuevo array para mostrar en la vista
  initial(bool,arrOperation, arrResult){
    let initial = new AdmBankAccount()
    initial.typologyId = arrOperation.typologyId;
    initial.description = arrOperation.description;
    initial.assigned =bool;
    arrResult.push(initial);
  }

  guardar(){
    let arr =this.allShow.filter(filt=> filt.assigned===true);

    this.accountService.saveTransaction(this.accountType.typologyId, this.idTypologyOperation, arr);

    this.matDialogRef.close()
  }
}
