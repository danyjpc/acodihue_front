import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';
import { AsociadosPhonesFormComponent } from './asociados-phones-form/asociados-phones-form.component';
import { AsociadosPhonesService } from './asociados-phones.service';

@Component({
  selector: 'app-asociados-phones',
  templateUrl: './asociados-phones.component.html',
  styleUrls: ['./asociados-phones.component.scss']
})
export class AsociadosPhonesComponent implements OnInit {

  personKey = '00'

  constructor(
    private route: ActivatedRoute,
    private phonesService: AsociadosPhonesService,
    private utils: UtilsService,
    private matDialog: MatDialog

  )
  { 

  }


  ngOnInit(): void {
    this.getPhones();
  }

  getPhones(){
    const _personKey = this.route.snapshot.params.personKey
    this.personKey = (_personKey) ? _personKey  : 'null';
    this.phonesService.get_associate_phones(this.personKey)

  }

  new_phone() {

    const dialogRef = this.matDialog.open(AsociadosPhonesFormComponent, {
      width: '550px',
      data : {
        
      }
    })

    dialogRef.afterClosed().subscribe(phone => {
      if (!phone) {
        return 
      }
      this.phonesService.new_phone(phone, this.personKey)
          .then(res => this.utils.openSnackBar(res))
          .catch(error => this.utils.openSnackBar(error))
    })
  }

}
