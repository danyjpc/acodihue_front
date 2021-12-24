import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {AssociateManagerService} from '../AssociateManagerService';
import { AsociadosFormComponent } from './asociados-form/asociados-form.component';
import {Location} from '@angular/common'

@Component({
  selector: 'app-asociados-profile',
  templateUrl: './asociados-profile.component.html',
  styleUrls: ['./asociados-profile.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class AsociadosProfileComponent implements OnInit {
  _unsubscribe: Subject<any>;
  dummyComponent = AsociadosFormComponent;
  personKey: string;

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private asociadosManagerService: AssociateManagerService,
    private _routerActivate: ActivatedRoute,
    private location: Location


  ) 
  {
    this._unsubscribe = new Subject();
    this.personKey = (this._routerActivate.snapshot.params.personKey) ? this._routerActivate.snapshot.params.personKey  : 'null';
  }

  ngOnInit(): void {
    this.componentManager();

    this.asociadosManagerService.get_associate_single(this.personKey);
  }
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  componentManager(){
    
    this.asociadosManagerService.ListenchangeComponet(this._routerActivate);

    this.asociadosManagerService.OnComponentChange
        .pipe(takeUntil(this._unsubscribe))
        .subscribe( component => {
          this.dummyComponent =  component;
        });
  }

  go_back(){
    this.location.back();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }


}
