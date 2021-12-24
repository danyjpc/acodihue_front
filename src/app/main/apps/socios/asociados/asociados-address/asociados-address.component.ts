import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';
import { AsociadosAddressFormComponent } from './asociados-address-form/asociados-address-form.component';
import {AsociadosAddressesService} from './asociados-address.service';
import { environment as env } from 'environments/environment';

@Component({
  selector: 'app-asociados-address',
  templateUrl: './asociados-address.component.html',
  styleUrls: ['./asociados-address.component.scss']
})
export class AsociadosAddressComponent implements OnInit {
  @Input()creditEnabled = false;

  entityKey: string = '000'
  creditKey: string;
  constructor(
    private route:  ActivatedRoute,
    private addressService: AsociadosAddressesService,
    private utils: UtilsService,
    private matDialog: MatDialog
    ) 
    { 

    }

  ngOnInit(): void {
    this.getAddress();
  }


  new_address() {

    const dialogRef = this.matDialog.open(AsociadosAddressFormComponent, {
      width: '550px',
      data : {
        
      }
    })

    dialogRef.afterClosed().subscribe(address => {
      if (!address) {
        return 
      }

      const _entityKey = (this.creditEnabled) ? this.route.snapshot.params.creditKey : this.route.snapshot.params.personKey;
      this.addressService.new_address(address, _entityKey, this.creditEnabled)
          .then(res => this.utils.openSnackBar(res))
          .catch(error => this.utils.openSnackBar(error));
    })
  }
  getAddress(){
    
    const _entityKey = (this.creditEnabled) ? this.route.snapshot.params.creditKey : this.route.snapshot.params.personKey;
    this.entityKey = (_entityKey) ? _entityKey  : 'null';
    this.addressService.get_associate_addresses(_entityKey, env.DEFAULT_STATUS_ACTIVE, this.creditEnabled);


  }

}
