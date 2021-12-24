import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TypologiesService } from '../../typologies.service';
import { AdmTypology, TypologyId } from '../../../../../../shared/adm-models/AdmTypology';
import { Subject } from 'rxjs';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogFormComponent } from '../../dialog-form/dialog-form.component';
import { FuseProgressBarService } from '../../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';

interface flatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-typologies-parents-list',
  templateUrl: './typologies-parents-list.component.html',
  styleUrls: ['./typologies-parents-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TypologiesParentsListComponent implements OnInit, OnDestroy {
  typologies    : AdmTypology;
  filterTipologies: AdmTypology [] = [];
  typology      : AdmTypology;
  parentTypology: AdmTypology;
  _unsubscribe  : Subject<any>;
  searchInput   : FormControl;
  
  private _transformer = (node: AdmTypology, level: number) => {
    return {
      expandable: !!node.childTypologies || node.childTypologies.length > 0,
      name: node.description,
      level: level,
      typologyId: node.typologyId,

    };
  }

  treeControl = new FlatTreeControl<flatNode>(
                node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
                  this._transformer, node => node.level, node => node.expandable, node => node.childTypologies);
  
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  constructor(private typologyService: TypologiesService,
              private matDialogRef   : MatDialog,
              private progressBar    : FuseProgressBarService ) {
    this.typologies   = new AdmTypology();
    this.typology     = new AdmTypology();
    this._unsubscribe = new Subject();
    this.parentTypology = new AdmTypology();
    this.searchInput    = new FormControl('');
   }
   hasChild = (_: number, node: flatNode) => node.expandable;




  ngOnInit(): void {
    this.getAllTypology();  

    this.typologyService.onChangeParentTypology
          .pipe(takeUntil(this._unsubscribe))
          .subscribe(async (parentTypology : AdmTypology) => {
            if (parentTypology.typologyId) {
              this.parentTypology = await (parentTypology.parentTypology.typologyId === 100)? new AdmTypology: parentTypology;
            }
          });

  }
  
  
   async getAllTypology(){

    this.searchInput.valueChanges
    .pipe(
        takeUntil(this._unsubscribe),
        debounceTime(300),
        distinctUntilChanged()
    )
    .subscribe( async searchText => {
      if (!searchText) {
        this.typologies.childTypologies = await this.filterTipologies;    
        this.dataSource.data      = await this.typologies.childTypologies;    
      }
      else {
        this.typologies.childTypologies = await FuseUtils.filterArrayByString(this.filterTipologies, searchText);
        this.dataSource.data      = await this.typologies.childTypologies;     
      }
    });


    this.progressBar.show();
    this.typologyService.getAllTypollogiesParent();


    this.typologyService.onChangeTypologyParentList
    .pipe(takeUntil(this._unsubscribe))
    .subscribe(async response => {
          if (response[0]){
            this.typologies = await response[0] as AdmTypology;
            this.filterTipologies = [...this.typologies.childTypologies]
            this.dataSource.data = await this.filterTipologies as [];
            this.progressBar.hide();
          }
          
    });
    

  }

  getChildsTypology(typologyId: number){
    this.progressBar.show();
    this.typologyService.getAllTypollogiesParent(typologyId).then(response => {
      this.typologyService.getOnlyOneParentTypology(typologyId);
      this.progressBar.hide();
    }); 
  }

  ngOnDestroy(): void {
    this._unsubscribe.complete();
  }

  updateParentTypology(typology: AdmTypology, operation: string){
    this.matDialogRef.open(DialogFormComponent, {
      height: '300px',
      width: '400px',
      data: {
      typology: typology,
      operation: operation
      }
    });
  }



  addTypologyParent(typology:AdmTypology){
    console.log(typology);
    this.matDialogRef.open(DialogFormComponent, {
      height: '300px',
      width: '400px',
      data: {
      typology: typology
      }
    }); 
  }
}
