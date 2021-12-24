import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  title: string = "";

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  
  ) { 
    this.title = (data.question) ?  data.question :  "Realmente Quiere continuar con esta Operación"
  
  }

  ngOnInit(): void {
  }


  dimiss(option: boolean) {
    this.dialogRef.close(option);
  }

}
