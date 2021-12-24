import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmOrganization } from 'app/shared/adm-models/AdmOrganization';
import { AgenciasService } from '../../agencias/agencias.service';
import { AdmCreditLine } from '../AdmCreditLines';

@Component({
  selector: 'app-credit-lines-form',
  templateUrl: './credit-lines-form.component.html',
  styleUrls: ['./credit-lines-form.component.scss']
})
export class CreditLinesFormComponent implements OnInit {

  creditLine: AdmCreditLine;
  tittle: string;
  action: string;
  agencias: AdmOrganization[] = []

  constructor(
    public dialogRef: MatDialogRef<CreditLinesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private agenciesService: AgenciasService
  ) 
  { 
    this.creditLine = (data.creditLine) ?  data.creditLine : new AdmCreditLine();
    this.tittle = (data.creditLine) ?  "Editar" : "Nueva";
    this.action = (data.creditLine) ?  "edit" : "new";
  }

  ngOnInit(): void {

    this.agenciesService.listar_agencias()
        .then(agencies => {
          this.agencias = agencies as AdmOrganization[];
        })
        .catch(error => {
          this.agencias =  []
        })
  }

  saveForm() {
    this.dialogRef.close(this.creditLine);
  }

}
