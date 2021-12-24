import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { CreditLinesFormComponent } from './credit-lines-form/credit-lines-form.component';
import { Location } from '@angular/common'
import { CreditLinesListComponent } from './credit-lines-list/credit-lines-list.component';
import { CreditLineService } from './credit-lines.service';



@Component({
  selector: 'app-credit-lines',
  templateUrl: './credit-lines.component.html',
  styleUrls: ['./credit-lines.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CreditLinesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private location: Location,
    private creditLineService: CreditLineService
  ) { }

  ngOnInit(): void {
  }

  go_back(){
    this.location.back();
  }

  newCreditLine(){

    const dialogRef = this.dialog.open(CreditLinesFormComponent, {
      width: '50%',
      data:  {}
    })

    dialogRef.afterClosed().subscribe(creditLine => {
        if (!creditLine) {
          return
        }
        
        this.creditLineService.create_new_credit_line(creditLine);
        
    })
  }

}
