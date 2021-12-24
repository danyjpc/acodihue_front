import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmUser } from 'app/shared/adm-models/AdmUser';
import { AdmTypology } from '../../../../../shared/adm-models/AdmTypology';
import { UserService } from '../user.service';
import { FuseProgressBarService } from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { environment as env } from 'environments/environment';
import { TypologiesService } from '../../typologies/typologies.service';

@Component({
  selector: 'app-users-dialog-form',
  templateUrl: './users-dialog-form.component.html',
  styleUrls: ['./users-dialog-form.component.scss']
})
export class UsersDialogFormComponent implements OnInit {
  rolesTypology: AdmTypology;
  statusTypology: AdmTypology;
  form: FormGroup;
  user: AdmUser;
  action:  string;
  dialogTittle: string;
  constructor(
              private typologyService                : TypologiesService,
              public matDialogRef                 : MatDialogRef<UsersDialogFormComponent>,
              public usersService                 : UserService,
              public progresBar: FuseProgressBarService,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) 
              { 
                this.rolesTypology  = new AdmTypology();
                this.statusTypology = new AdmTypology();
                
                this.user = (data.user) ? data.user as AdmUser : new AdmUser();
                this.action = (data.user)? 'edit' : 'new';
                this.dialogTittle = (data.user) ? 'Editar Datos de Usuario' : 'Agregar nuevo Usuario';
                
              }

  ngOnInit(): void {
    // this.buildForm();
    this.getRoles();
    this.getStatus();
  }
  

  async getRoles(){
    this.rolesTypology = await this.typologyService.getTypology(env.ROLES_TYPOLOGY)
  }
  async getStatus(){
    this.statusTypology = await this.typologyService.getTypology(env.STATUS_TYPOLOGY)
  }

  saveUser(){    
    // send data to dialog_close subscriber
    this.matDialogRef.close(this.user)

  }
 
}
