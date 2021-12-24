import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {AdmAmortizations, AdmAmortizationsTable, AmortizationParams} from '../credit-calucalator-interface';
import { AdmCreditLine } from '../../management/credit-lines/AdmCreditLines';
import { CreditLineService } from '../../management/credit-lines/credit-lines.service';
import { ActivatedRoute, Router } from '@angular/router';
import {OperationsService} from '../operationsService';
import { PersonsService } from 'app/shared/services/person.service';
import { AdmPerson } from 'app/shared/adm-models/AdmPerson';
import { truncate } from 'fs';
import { UtilsService } from 'app/core/services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { CreditCreateFormComponent } from '../../credits/credit-create-form/credit-create-form.component';
import { AdmCredit } from '../../credits/AdmCredit';
import {CreditService} from '../../credits/credit-service';


@Component({
  selector: 'app-credit-calculator',
  templateUrl: './credit-calculator.component.html',
  styleUrls: ['./credit-calculator.component.scss']
})
export class CreditCalculatorComponent implements OnInit {
  personKey: string  = null;
  AmortizationDetails: AdmAmortizations[] = [];
  displayedColumns: string[] = ['no', 'date', 'pago', 'capital','pagocapital', 'rate', 'rate_buy','saldo'];
  creditLines: AdmCreditLine[] = [];
  calculatorParams: AmortizationParams;

  AmortizationCalculations: AdmAmortizations[] = [];
  disabledInputs = false;
  calculatorId = 0;

  constructor(
    private location: Location,
    private creditLineService: CreditLineService,
    private activateRoute: ActivatedRoute,
    private operationsService: OperationsService,
    private personService: PersonsService,
    private utils: UtilsService,
    private matDialog: MatDialog,
    private creditService: CreditService,
    private router: Router
  ) { 

    this.personKey = (this.activateRoute.snapshot.params.personKey) ? this.activateRoute.snapshot.params.personKey  :  null;
    this.calculatorId = (this.activateRoute.snapshot.params.calculatorId) ? this.activateRoute.snapshot.params.calculatorId  : 0;
    this.calculatorParams = new AmortizationParams();
  }

  ngOnInit(): void {
    this.load_credit_lines();
    this.loadAsociateDetails();

    //
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    
  }


  go_back(){
    this.location.back();
  }

  load_Typologies(){
    
  }

  load_credit_lines() {
    this.creditLineService.get_credit_lines()
        .then(creditLines => {
          this.creditLines =  creditLines as AdmCreditLine[];
        })
        .catch(error => {
          //
        });
  }

  calculateAmortizationsTable(save?: boolean){
    const params = (save === true) ? {save: true} : null;
    this.operationsService.calculateAmorizations(this.calculatorParams, this.personKey, params)
        .then( (response: AdmAmortizationsTable) => {
          this.AmortizationDetails = response.calculations;
          //this.calculatorParams = response.header;

          if (save) {
              this.redirect_to_cotizaciones_view(this.personKey);
          }

          
        })
        .catch(error =>{
          console.log(error);
        });
  }

  loadAsociateDetails(){

    if (this.personKey !== null && this.calculatorId !== 0) {
      
      
      this.disabledInputs = true; 
      this.operationsService.getAmortizationtableCotizationSingle(this.personKey, this.calculatorId)
        .then((response: AdmAmortizationsTable) => {
          this.calculatorParams =  response.header;
          this.AmortizationDetails =  response.calculations;
          this.calculatorParams.person.firstName =  `${this.calculatorParams.person.firstName} ${this.calculatorParams.person.lastName}`;
        })
        .catch(error => {
          
        });

      
    } 
    else if (this.personKey !== null) {
      this.disabledInputs = false;              
      this.personService.getPerson(this.personKey)
          .then(person => {
            this.calculatorParams.person.personKey  = this.personKey;
            this.calculatorParams.person.firstName = `${person.firstName} ${person.middleName} ${person.lastName} ${person.partnerName} ${person.marriedName}`;
          })
          .catch(error =>{
            this.calculatorParams = new AmortizationParams();
          });

    }
    else {
      this.disabledInputs = false;
      this.calculatorParams = new AmortizationParams();
    }
  }

  updateCotization(){

    this.calculatorParams.calculatorId = this.calculatorId;
    this.operationsService.updateCotizationTable(this.calculatorParams)
        .then( (response: AdmAmortizationsTable) => {
          this.AmortizationDetails = response.calculations;
        })
        .catch(error =>{
          console.log(error);
        });
  }

  printAmortization(){

    this.operationsService.printAmorizations(this.calculatorParams, this.personKey);

  }

  redirect_to_cotizaciones_view(personKey){
    const url = `/associate/profile/${personKey}/cotizaciones`;
    this.router.navigateByUrl(url);
  }

  createCredit(){
    const calculatorParams = this.calculatorParams;
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

  calculateCuotes(){
    this.calculatorParams.noPayments = this.calculatorParams.noPeriod * 12;
  }
}
