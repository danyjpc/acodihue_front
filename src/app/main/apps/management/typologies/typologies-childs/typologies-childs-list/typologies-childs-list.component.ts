import { Component, OnInit, ViewChild, ViewEncapsulation, Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { AdmTypology } from '../../../../../../shared/adm-models/AdmTypology';
import { TypologiesService } from '../../typologies.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogFormComponent } from '../../dialog-form/dialog-form.component';
import { FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
 

@Component({
  selector: 'app-typologies-childs-list',
  templateUrl: './typologies-childs-list.component.html',
  styleUrls: ['./typologies-childs-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations

})
export class TypologiesChildsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchInput: FormControl;
  typologyChilds: AdmTypology [] = [];
  filterTypologyChilds: AdmTypology [] = [];
  _usubscribe   : Subject<any>;
  dataSource    = new MatTableDataSource();
  displayedColumns: string[] = ['Id', 'Descripcion', 'Opciones'];
  parentTypologyToShow: AdmTypology;

  
  constructor(private typologyService: TypologiesService,
              public dialog          : MatDialog ) { 
    this._usubscribe          = new Subject();
    this.parentTypologyToShow = new AdmTypology();
    this.searchInput = new FormControl('');
  }

  ngOnInit(): void {
    this.onChangeTypologyChildsDetect();
    
  }

    
    
  onChangeTypologyChildsDetect(){
    this.typologyService.onChangeParentTypology
    .pipe(takeUntil(this._usubscribe))
    .subscribe( parentTypology => {
      if (parentTypology){
        this.parentTypologyToShow = parentTypology;
      }
    });


    this.searchInput.valueChanges
    .pipe(
        takeUntil(this._usubscribe),
        debounceTime(300),
        distinctUntilChanged()
    )
    .subscribe(searchText => {
      if (!searchText) {
        this.typologyChilds = this.filterTypologyChilds;    
        this.dataSource.data      = this.typologyChilds;    
      }
      else {
        this.typologyChilds = FuseUtils.filterArrayByString(this.filterTypologyChilds, searchText);
        this.dataSource.data      = this.typologyChilds;     
      }
    });

    this.typologyService.onChangeTypologyChilds
    .pipe(takeUntil(this._usubscribe))
    .subscribe( typologyChilds => {
        if (typologyChilds){         
         
            this.typologyChilds = typologyChilds as AdmTypology [];
            this.filterTypologyChilds = [...this.typologyChilds];
            this.dataSource.data      = this.filterTypologyChilds;
            this.dataSource.paginator = this.paginator;
        }
    });
  }

  editTypology(typology, operation?: string){
   this.dialog.open(DialogFormComponent, {
    height: '300px',
    width: '400px',
    data: {
          typology: typology,
          operation: operation
    }
  });
  }

  getChildsTypology(typology: AdmTypology) {
    this.typologyService.getAllTypollogiesParent(typology.typologyId);
    this.typologyService.getOnlyOneParentTypology(typology.typologyId);
  }

  addNewTypologyChild(parentTypology){
    console.log(parentTypology);
    this.dialog.open(DialogFormComponent, {
     height: '300px',
     width: '400px',
     data: {
       typology: parentTypology
     }
    });
  }



}
