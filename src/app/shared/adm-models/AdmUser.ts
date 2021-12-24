import { AdmTypology, TypologyId } from './AdmTypology';
import { AdmPerson, PersonKey } from './AdmPerson';
import { environment as env } from '../../../environments/environment';

export class  AdmUser{
    
    person: AdmPerson;
    dateCreated = env.NOW;
    password: string ='';
    role: TypologyId;
    status: TypologyId;
    createdBy: AdmCreatedBy;
    
    constructor(){ 
        this.person = new AdmPerson();  
        this.role =  new TypologyId();
        this.role.typologyId =  env.DEFAULT_ROLE_USER;
        this.status =  new TypologyId();           
        this.createdBy = new AdmCreatedBy();
    }

}

export class AdmBasicDescription{
    password: string = '';
    role: AdmTypology;
    status: AdmTypology;

    constructor (){
        this.role = new AdmTypology();
        this.status = new AdmTypology();
        this.role.typologyId =  env.DEFAULT_ROLE_AMINISTRATOR;
        this.status = new AdmTypology();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE;
    }
}


// export class AdmCreatedBy {
//     person: PersonKey;
//     constructor(){
//         this.person = new PersonKey();
//         const session = JSON.parse(sessionStorage.getItem('user'));
//         this.person.personKey = session['person_key'];
//         this.person.email = (session['email']) ? session['email'] : session['upn'];
       
//     }
// }


export class AdmCreatedBy {
    personKey : string;
    email: string;
    constructor() {
        const session = JSON.parse(sessionStorage.getItem('user'));
        this.personKey = session['person_key'];
        this.email = (session['email']) ? session['email'] : session['upn'];
    }
}

export class AdmUserLogued {
    email: string = '' ;
    person_key: number = 0 ;
    id_rol: number = 0;
    nombre_rol: string = '';
    role: string = '';
}



