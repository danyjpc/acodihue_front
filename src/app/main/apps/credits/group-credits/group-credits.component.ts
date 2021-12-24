import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GroupCreditsCreateFormComponent } from './group-credits-create-form/group-credits-create-form.component'

@Component({
  selector: 'app-group-credits',
  templateUrl: './group-credits.component.html',
  styleUrls: ['./group-credits.component.scss']
})
export class GroupCreditsComponent implements OnInit {

  constructor(
    private location: Location,
    public dialog: MatDialog
  )
  { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(GroupCreditsCreateFormComponent,{
      width :'350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  bo_back(){
    this.location.back();
  }

}
