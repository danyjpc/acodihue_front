import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-add-existing-partner-form',
  templateUrl: './add-existing-partner-form.component.html',
  styleUrls: ['./add-existing-partner-form.component.scss']
})
export class AddExistingPartnerFormComponent implements OnInit {

  displayedColumns: string[] = ['group', 'actions'];
  dataSource = edata;
  
  constructor(
    public matDialogRef: MatDialogRef<AddExistingPartnerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
  }

}

export interface ListGroup {
  id: number;
  name: string;
}

const edata : ListGroup[] = [
  {id:526, name :'la union'},
  {id:530, name :'Abc'},
]