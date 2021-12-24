import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmPhone } from 'app/shared/adm-models/AdmPhone';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsociadosPhonesFormComponent } from '../asociados-phones-form/asociados-phones-form.component';
import {AsociadosPhonesService} from '../asociados-phones.service';

@Component({
  selector: 'app-asociados-phones-list',
  templateUrl: './asociados-phones-list.component.html',
  styleUrls: ['./asociados-phones-list.component.scss']
})
export class AsociadosPhonesListComponent implements OnInit {
  displayedColumns: string[] = ['leader', 'numero', 'type', 'actions'];
  asociatePhones: AdmPhone[] =[]
  $destroy: Subject<any>;
  personKey:string ='00'

  constructor(
    private phonesService: AsociadosPhonesService,
    private matDialog : MatDialog,
    private route: ActivatedRoute,
    private utils: UtilsService,
  ) 
  { 
    this.$destroy = new Subject();
    this.personKey = (this.route.snapshot.params.personKey) ? this.route.snapshot.params.personKey  : 'null';
  }

  ngOnInit(): void {
    this.phonesService.OnAsociatePhonesChange
        .pipe(takeUntil(this.$destroy))
        .subscribe(phones => {
          this.asociatePhones = (phones[0]) ? phones : [];
        })
  }

  editphone(phone: AdmPhone) {
    const dialogRef = this.matDialog.open(AsociadosPhonesFormComponent, {
        width: '650px',
        data: {
          phone
        }
    });
    
    dialogRef.afterClosed().subscribe(phone=> {
      if (!phone) {
        return
      }
      //update Addres
      this.update_phone(phone)
    })
            
  }

  update_phone(phone: AdmPhone){

    this.phonesService.update_phone(phone, this.personKey)
        .then(res => this.utils.openSnackBar(res))
        .catch(error => this.utils.openSnackBar(error))
  }   

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next()
    this.$destroy.complete()
  }

}
