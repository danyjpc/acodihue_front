import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmBeneficiary } from '../AdmBeneficiary';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsociadosBeneficiariesFormComponent } from '../asociados-beneficiaries-form/asociados-beneficiaries-form.component';
import {BeneficiariesService} from '../beneficiaries-service';
import { CreditService } from 'app/main/apps/credits/credit-service';

@Component({
  selector: 'app-asociados-beneficiaries-list',
  templateUrl: './asociados-beneficiaries-list.component.html',
  styleUrls: ['./asociados-beneficiaries-list.component.scss']
})
export class AsociadosBeneficiariesListComponent implements OnInit {

  @Input()creditEneable = false;

  displayedColumns: string[] = ['name', 'phone', 'parentezco', 'actions'];
  beficiaries= []=[]
  personKey: string
  $destroy: Subject <any>;

  


  //creditKey
  creditKey: string; 
  title: string = '';

  constructor(
    private beneficiariesService: BeneficiariesService,
    private route:  ActivatedRoute,
    private matDialog : MatDialog,
    private f_progressBar: FuseProgressBarService,
    private utils: UtilsService,
    private creditsService: CreditService
    
  ) 
  {
    const _personKey = this.route.snapshot.params.personKey;
    this.personKey = (_personKey) ? _personKey  : 'null';
    this.$destroy = new Subject();

    
  }

  ngOnInit(): void {
    this.title =  (this.creditEneable) ? 'Referencia' :  'Beneficiario';
    this.get_beneficiaries_by_type();
  }


  get_beneficiaries_by_type(){ 
    if (this.creditEneable) {
      // get fiadores by credit
      this.creditKey = (this.creditEneable) ? this.route.snapshot.params.creditKey : 'null';

      this.beneficiariesService.list_beneficiaries(this.creditKey, this.creditEneable);
    }
    else {
      // get fiadores by socio
      this.beneficiariesService.list_beneficiaries(this.personKey);
    }

    this.beneficiariesService.OnBeneficiariesChange
        .pipe(takeUntil(this.$destroy))
        .subscribe( beneficiaries => {
          this.beficiaries =  beneficiaries;
    })
  }




  open_edit_modal(beneficiary: AdmBeneficiary){ 

    const title  = this.title;

    const dialogRef =  this.matDialog.open(AsociadosBeneficiariesFormComponent, {
      width:  "45%",
      data: {beneficiary, title
      }
      
    });


    dialogRef.afterClosed()
              .subscribe(beneficiairio => {
                if (!beneficiairio) {
                  return 
                }

                //update Beneficiairy
                this.editar_beneficiario(beneficiairio, this.creditEneable)

              })
  }


  async editar_beneficiario(beneficiary: AdmBeneficiary, creditEnable){

    const objectKey = creditEnable ? this.creditKey :  this.personKey;
    this.f_progressBar.show();
    try {
      const response =  await this.beneficiariesService.update_beneficiary(beneficiary, objectKey, creditEnable)  
      this.utils.openSnackBar(response);
      this.f_progressBar.hide()
    } catch (error) {
      this.f_progressBar.hide()
      this.utils.openSnackBar(error);
    }
    

  }

  async crear_beneficiario(beneficiary: AdmBeneficiary, creditEnable){

    const objectKey = creditEnable ? this.creditKey :  this.personKey;
    this.f_progressBar.show();
    try {
      const response =  await this.beneficiariesService.create_beneficiary(beneficiary, objectKey, creditEnable)  
      this.utils.openSnackBar(response);
      this.f_progressBar.hide()
    } catch (error) {
      this.f_progressBar.hide()
      this.utils.openSnackBar(error);
    }
  }


  newBeneficiary(){
    const title = this.title;
    const dialogRef =  this.matDialog.open(AsociadosBeneficiariesFormComponent, {
      width:  "45%",
      data: {
        title
      }
    })

    dialogRef.afterClosed()
    .subscribe(beneficiairio => {
      if (!beneficiairio) {
        return 
      }

      //update Beneficiairy
      this.crear_beneficiario(beneficiairio, this.creditEneable)

    })


  }

}
