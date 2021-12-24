import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmTypology } from '../../../../../shared/adm-models/AdmTypology';

@Component({
  selector: 'app-bank-accounts-form',
  templateUrl: './bank-accounts-form.component.html',
  styleUrls: ['./bank-accounts-form.component.scss']
})
export class BankAccountsFormComponent implements OnInit {
  title: string;
  accountType : AdmTypology;

  constructor(
    public matDialogRef: MatDialogRef<BankAccountsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) 
  { 
    this.title = (data && data.typology) ? 'Editar' : 'Agregar';
    this.accountType = (data && data.typology) ? data.typology : new AdmTypology();
  }

  ngOnInit(): void {
  }

}
