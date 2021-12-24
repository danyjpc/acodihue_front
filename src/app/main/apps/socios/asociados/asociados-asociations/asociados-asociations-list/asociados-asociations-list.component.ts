import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsociadosAsociationsFormComponent } from '../asociados-asociations-form/asociados-asociations-form.component';
import {AdmAsociationsMember} from '../admAsociationsMember';
import { AssociatesService } from '../../../Associates.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-asociados-asociations-list',
  templateUrl: './asociados-asociations-list.component.html',
  styleUrls: ['./asociados-asociations-list.component.scss']
})
export class AsociadosAsociationsListComponent implements OnInit {
  asociacionesMembers: AdmAsociationsMember[]=[]
  displayedColumns: string[] = ['asociation', 'dateinit', 'rate', 'actions']

  personKey: string;
  $destroy: Subject<any>;

  constructor(
    private dialog: MatDialog,
    private asociateService: AssociatesService,
    private activateRoute: ActivatedRoute
  ) 
  { 
     this.personKey = (this.activateRoute.snapshot.params.personKey) ? this.activateRoute.snapshot.params.personKey  : 'null';
     this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.getAsociacitionsMember();
  }

  newAsociation(){
    
    const personKey = this.personKey
    const dialogRef = this.dialog.open(AsociadosAsociationsFormComponent, {
      width: '40%',
      data: {personKey}
    })

    dialogRef.afterClosed().subscribe((data: AdmAsociationsMember) => {
      if (!data) {
        return
      }
      //post
      this.asociateService.add_association_member(data)
      
    })
  }

  getAsociacitionsMember(){
    this.asociateService.getAsociacionesBysocio(this.personKey)

    this.asociateService.OnAsociationsMemberChange 
        .pipe(takeUntil(this.$destroy))
        .subscribe(data => {
          this.asociacionesMembers =  data;
        })
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.$destroy.next();
    this.$destroy.complete();
  }

}
