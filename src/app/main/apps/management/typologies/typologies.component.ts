import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-typologies',
  templateUrl: './typologies.component.html',
  styleUrls: ['./typologies.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class TypologiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
