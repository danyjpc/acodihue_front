import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pre-inscripciones',
  templateUrl: './pre-inscripciones.component.html',
  styleUrls: ['./pre-inscripciones.component.scss']
})
export class PreInscripcionesComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }


  bo_back(){
    this.location.back();
  }

}
