import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UtilsService } from 'app/core/services/utils.service';
import { AdmAddress } from 'app/shared/adm-models/AdmAddress';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsociadosAddressFormComponent } from '../asociados-address-form/asociados-address-form.component';
import { AsociadosAddressesService } from '../asociados-address.service';

@Component({
  selector: 'app-asociados-address-list',
  templateUrl: './asociados-address-list.component.html',
  styleUrls: ['./asociados-address-list.component.scss']
})
export class AsociadosAddressListComponent implements OnInit {
  @Input()creditEnabled;

  displayedColumns: string[] = ['leader', 'direccion', 'departamento', 'municipio', 'actions'];

  beneficiaryAddreses: AdmAddress[] =[];
  $destroy: Subject<any>;

  personKey = '00'

  constructor(
    private addressService: AsociadosAddressesService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private utils: UtilsService
  ) 
  { 
    this.$destroy = new Subject();
    this.personKey = (this.route.snapshot.params.personKey) ? this.route.snapshot.params.personKey  : 'null';

  }

  ngOnInit(): void {


    this.addressService.OnAsociateAddressesChange
        .pipe(takeUntil(this.$destroy))
        .subscribe(address => {
          this.beneficiaryAddreses = (address[0]) ? address : [];
        })
  }

  editAddress(address: AdmAddress) {
    const dialogRef = this.matDialog.open(AsociadosAddressFormComponent, {
        width: '650px',
        data: {
          address
        }
    });
    
    dialogRef.afterClosed().subscribe(_address=> {
      if (!_address) {
        return
      }
      //update Addres
      this.update_address(_address, this.creditEnabled);
    })
            
  }

  update_address(address: AdmAddress, creditEnable){
    const entityKey = (creditEnable) ? this.route.snapshot.params.creditKey : this.route.snapshot.params.personKey;
    this.addressService.update_address(address, entityKey, this.creditEnabled)
        .then(res => this.utils.openSnackBar(res))
        .catch(error => this.utils.openSnackBar(error));
  }                     


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next()
    this.$destroy.complete();
  }

}
