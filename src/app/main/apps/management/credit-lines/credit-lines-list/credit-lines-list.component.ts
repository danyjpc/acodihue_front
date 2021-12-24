import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdmCreditLine } from '../AdmCreditLines';
import { CreditLinesFormComponent } from '../credit-lines-form/credit-lines-form.component';
import {CreditLineService} from '../credit-lines.service';
import { environment as env } from 'environments/environment';
import { UtilsService } from 'app/core/services/utils.service';

@Component({
  selector: 'app-credit-lines-list',
  templateUrl: './credit-lines-list.component.html',
  styleUrls: ['./credit-lines-list.component.scss']
})
export class CreditLinesListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'line', 'organization', 'actions'];
  $destroy: Subject<any>;
  dataSource = new MatTableDataSource<AdmCreditLine>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private creditlinesService: CreditLineService,
    private dialog: MatDialog,
    private utils: UtilsService

  ) { 
    this.$destroy = new Subject();
  }

  ngOnInit(): void {
    this.creditlinesService.get_credit_lines();
    this.loadData();
  }

  loadData(){
    this.creditlinesService.onCreditLinesChange
        .pipe(takeUntil(this.$destroy))
        .subscribe(data => {
          this.dataSource.data = data as AdmCreditLine[];
          this.dataSource.paginator =  this.paginator;
        });
  }


  edit_line(creditLine: AdmCreditLine) {
    const dialogRef =  this.dialog.open(CreditLinesFormComponent, {
      data: {creditLine},
      width: '50%"'
    });

    dialogRef.afterClosed().subscribe(creditLine => {
      if(!creditLine) {
        return;
      }
      this.creditlinesService.update_credit_lines(creditLine)
    });
  }


  delete_credit_line(credit_line: AdmCreditLine) {

    this.utils.openConfirDialogService()
        .subscribe(option => {
          if (!option) {
            return;
          }
          credit_line.status.typologyId =  env.DEFAULT_STATUS_INACTIVE;
          this.creditlinesService.update_credit_lines(credit_line);
        });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
