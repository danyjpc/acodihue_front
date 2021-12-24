import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseUtils } from '@fuse/utils';
import { AdmAsociacion } from 'app/main/apps/management/asociaciones/AdmAsociacion';
import { AsociacionesService } from 'app/main/apps/management/asociaciones/asociaciones.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AdmAsociationsMember } from '../admAsociationsMember';

@Component({
  selector: 'app-asociados-asociations-form',
  templateUrl: './asociados-asociations-form.component.html',
  styleUrls: ['./asociados-asociations-form.component.scss']
})
export class AsociadosAsociationsFormComponent implements OnInit {
  asociationMember: AdmAsociationsMember;
  action: string;

  myControl = new FormControl();
  asociaciones: AdmAsociacion[] = []
  filteredOptions: Observable<AdmAsociacion[]>;


  constructor
  (
    public dialogRef: MatDialogRef<AsociadosAsociationsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private asociacionesService:  AsociacionesService,
    private activateRoute: ActivatedRoute,
  )
  { 
    this.asociationMember = (data.asociationMember) ? data.asociationMember : new AdmAsociationsMember();
    this.action = (data.asociationMember) ? 'edit' : 'new';
  }

  ngOnInit(): void {

    this.get_asociations();

    this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filter(name) : this.asociaciones.slice())
            );


  }

  get_asociations(){
    this.asociacionesService.listar_asociaciones()
        .then(data => {
          this.asociaciones = data as AdmAsociacion[];
        })
  }

  saveForm() {
    this.asociationMember.person.personKey = this.data.personKey
    this.dialogRef.close(this.asociationMember)
  }

  getTitle(organizationKey) {
    if (organizationKey) {
      console.log(organizationKey);
      this.asociationMember.organization.organizationKey = organizationKey;
      return this.asociaciones.find(item => item.association.organizationKey === organizationKey).association.organizationName;
    }
  }


  private _filter(value: string): AdmAsociacion[] {
    const filterValue = value;
    return FuseUtils.filterArrayByString(this.asociaciones, filterValue)
  }

}
