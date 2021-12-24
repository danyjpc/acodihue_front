import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { TypologiesService } from 'app/main/apps/management/typologies/typologies.service';
import { AdmPhone } from 'app/shared/adm-models/AdmPhone';
import { AdmTypology } from 'app/shared/adm-models/AdmTypology';
import { environment as env } from 'environments/environment';


@Component({
  selector: 'app-asociados-phones-form',
  templateUrl: './asociados-phones-form.component.html',
  styleUrls: ['./asociados-phones-form.component.scss']
})
export class AsociadosPhonesFormComponent implements OnInit {

  phone: AdmPhone;
  dialogTitle: string; 
  action: string = 'new';
  phonesTypesTypology: AdmTypology;

  constructor
  (
    public matDialogRef: MatDialogRef<AsociadosPhonesFormComponent>,
    private typologyService: TypologiesService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private f_progressBar: FuseProgressBarService,
  )
  { 
    this.phone  = (_data.phone) ? _data.phone :  new AdmPhone();
    this.dialogTitle  = (_data.phone) ? 'Editar Telefono' : 'Agregr Nueva Telefono' ;
    this.action       = (_data.phone) ? 'edit' :  'new';

    this.phonesTypesTypology =  new AdmTypology();

  }

  ngOnInit(): void {
    this.load_typologies();
  }

  closeDigalog(){
    this.matDialogRef.close(this.phone);
  }

  async load_typologies(){
    this.phonesTypesTypology = await this.typologyService.getTypology(env.DEFATULT_PHONES_TYPE_TYPOLOGY);
    
  }
}
