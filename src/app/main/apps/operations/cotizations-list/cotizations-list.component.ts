import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmCredit } from '../../credits/AdmCredit';
import { CreditCreateFormComponent } from '../../credits/credit-create-form/credit-create-form.component';
import { CreditService } from '../../credits/credit-service';
import { AmortizationParams } from '../credit-calucalator-interface';
import { OperationsService } from '../operationsService';

@Component({
  selector: 'app-cotizations-list',
  templateUrl: './cotizations-list.component.html',
  styleUrls: ['./cotizations-list.component.scss']
})
export class CotizationsListComponent implements OnInit {

  personKey: string = null;
  cotizations: AmortizationParams[] = [];

  displayedColumns: string[] = ['monto', 'date', 'plazo', 'cuotas', 'actions'];

  constructor(
    private activateRoute: ActivatedRoute,
    private operationsService: OperationsService,
    private route: Router,
    private matDialog: MatDialog,
    private creditService: CreditService
  ) { 
    this.personKey =  (this.activateRoute.snapshot.params.personKey) ? this.activateRoute.snapshot.params.personKey : null;
  }

  ngOnInit(): void {
  
    this.load_cotizations_by_associate(this.personKey);
  }


  load_cotizations_by_associate(_personKey: string){

    this.operationsService.getCotizationsByClient(_personKey)
        .then((cotizations: AmortizationParams[]) => {
          this.cotizations = cotizations;
        })
        .catch(error => {
          this.cotizations = [];
        });
  }

  ViewCotization(cotization: AmortizationParams) {
    const url = `/operations/credit-calculator/associate/${this.personKey}/request-calculator/${cotization.calculatorId}`;
    this.route.navigateByUrl(url);
  }
  newCotization(){
    const url = `/operations/credit-calculator/associate/${this.personKey}`;
    this.route.navigateByUrl(url);
  }

  printCotization(cotization: AmortizationParams) {
    
    this.operationsService.printAmorizations(cotization, this.personKey);

  }

  createExpediente(cotizacion: AmortizationParams){
    
    const calculatorParams = cotizacion;
    const dialogRef =  this.matDialog.open(CreditCreateFormComponent, {
      width: '50%',
      data: {
        calculatorParams
      }
    });

    dialogRef.afterClosed().subscribe((credit: AdmCredit) => {
        if (!credit) { 
          return 
        }
        
        // save credit
        this.creditService.create_new_credit(credit, this.personKey);
    })
  }


}
