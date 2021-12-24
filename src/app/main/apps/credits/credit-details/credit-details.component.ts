import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsociadosFormComponent } from '../../socios/asociados/asociados-profile/asociados-form/asociados-form.component';
import { AssociateManagerService } from '../../socios/asociados/AssociateManagerService';
import { Location } from '@angular/common';
import {CreditManagerService} from '../credit-manager.service';
import { CreditLinesComponent } from '../../management/credit-lines/credit-lines.component';
import { CreditsCheckListComponent } from './credits-check-list/credits-check-list.component';

@Component({
  selector: 'app-credit-details',
  templateUrl: './credit-details.component.html',
  styleUrls: ['./credit-details.component.scss']
})
export class CreditDetailsComponent implements OnInit {

  _unsubscribe: Subject<any>;
  dummyComponent = CreditsCheckListComponent;
  creditKey: string;

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private asociadosManagerService: AssociateManagerService,
    private _routerActivate: ActivatedRoute,
    private location: Location,
    private creditManagerService: CreditManagerService


  ) 
  {
    this._unsubscribe = new Subject();
    this.creditKey = (this._routerActivate.snapshot.params.personKey) ? this._routerActivate.snapshot.params.personKey  : 'null';
  }

  ngOnInit(): void {
    this.componentManager();

    // this.creditManagerService.get_associate_single(this.creditKey);
  }
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  componentManager(){
    
    this.creditManagerService.ListenchangeComponet(this._routerActivate);

    this.creditManagerService.OnComponentChange
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
