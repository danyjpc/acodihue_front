import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { TypologiesService } from 'app/main/apps/management/typologies/typologies.service';
import { AdmBeneficiary } from '../AdmBeneficiary';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-asociados-beneficiaries-form',
  templateUrl: './asociados-beneficiaries-form.component.html',
  styleUrls: ['./asociados-beneficiaries-form.component.scss']
})
export class AsociadosBeneficiariesFormComponent implements OnInit {

  beneficiary: AdmBeneficiary;
  dialogTitle: string; 
  action: string = 'new';
  parentezcosTypologies: AdmTypology;

  title: string; 

  constructor
  (
    public matDialogRef: MatDialogRef<AsociadosBeneficiariesFormComponent>,
    private typologyService: TypologiesService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private f_progressBar: FuseProgressBarService,
  )
  { 
    this.title = data.title;
    this.beneficiary  = (data.beneficiary) ? data.beneficiary :  new AdmBeneficiary();
    this.dialogTitle  = (data.beneficiary) ? `Editar datos de ${this.title}` : `Agregar Nuevo(a) ${this.title}` ;
    this.action       = (data.beneficiary) ? 'edit' :  'new';

    this.parentezcosTypologies =  new AdmTypology();

  }

  ngOnInit(): void {
    this.load_typologies();
  }

  closeDigalog(){
    this.matDialogRef.close(this.beneficiary);
  }

  async load_typologies(){
    this.parentezcosTypologies = await this.typologyService.getTypology(env.PARENTEZCOS_TYPOLOGY);
  }

}
