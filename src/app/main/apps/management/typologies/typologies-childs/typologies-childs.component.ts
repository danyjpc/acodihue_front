import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-typologies-childs',
  templateUrl: './typologies-childs.component.html',
  styleUrls: ['./typologies-childs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class TypologiesChilds implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
