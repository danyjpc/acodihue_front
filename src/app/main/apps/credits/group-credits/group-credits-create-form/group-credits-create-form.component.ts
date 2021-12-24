import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-credits-create-form',
  templateUrl: './group-credits-create-form.component.html',
  styleUrls: ['./group-credits-create-form.component.scss']
})
export class GroupCreditsCreateFormComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<GroupCreditsCreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
  }

}
