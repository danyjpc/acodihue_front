import {environment as env} from '../../../environments/environment';
import { AdmTypology, TypologyId } from './AdmTypology';
import { AdmPhoneAccount, contactPhone } from './AdmPhone';
import { AdmDocumentAccount } from './AdmDocument';
import { AdmAddresAccount, contactAddress } from './AdmAddress';
import { AdmCreatedBy, AdmUser } from './AdmUser';
import { AdmBeneficiaryAccount } from './AdmBeneficiary';

export class AdmPerson {
    personId = 0;
    phoneAccount: AdmPhoneAccount;
    documentAccount: AdmDocumentAccount;
    addressAccount: AdmAddresAccount;
    beneficiaryAccount: AdmBeneficiaryAccount;
    firstName: string = '';
    middleName: string = 'S/D';
    lastName: string = '';
    partnerName: string = 'S/D';
    marriedName: string = '';
    birthday: string = env.DEFAULT_DATE;
    email: string = 'S/D';
    maritalStatus: TypologyId;
    profession: TypologyId;
    cui: number = 0;
    documentType: TypologyId;
    documentOrder: TypologyId;
    orderNumber: number = 0;
    nit: string = 'S/D';
    countryOfBirth: TypologyId;
    stateOfBirth: TypologyId;
    cityOfBirth: TypologyId;
    immigrationCondition: TypologyId;
    genre: TypologyId;
    passport: string = '';
    ownAccount: boolean;
    ownAccountDescription: boolean;
    mayanPeople: TypologyId;
    role: TypologyId;
    status: TypologyId;
    // createdBy: AdmCreatedBy;
    dateCreated = env.NOW;
    isPartner: boolean = false;
    isBeneficiary: boolean = false;
    membershipNumber: number;
    personKey: string;
    nameComplete: string;
    linguisticCommunity: TypologyId;

    address: contactAddress;
    phones: contactPhone []=[];

    constructor(){
        this.phoneAccount = new AdmPhoneAccount();
        this.documentAccount = new AdmDocumentAccount();
        this.addressAccount = new AdmAddresAccount();
        this.beneficiaryAccount = new AdmBeneficiaryAccount();
        this.maritalStatus = new TypologyId();
        this.maritalStatus.typologyId = 160053; // soltero
        this.documentType = new TypologyId();
        this.documentOrder = new TypologyId();
        this.countryOfBirth = new TypologyId();
        this.stateOfBirth = new TypologyId();
        this.cityOfBirth = new TypologyId();
        this.immigrationCondition = new TypologyId();
        this.genre = new TypologyId();
        this.genre.typologyId = 160023; // hombre
        this.mayanPeople = new TypologyId();
        this.role = new TypologyId();
        this.status = new TypologyId();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE;
        this.mayanPeople.typologyId =  env.DEFAULT_MAYAN_PEOPLE_TYPOLOGY;
        this.profession = new  TypologyId();
        this.profession.typologyId =  env.DEFAULT_PROFESION_COMERCIANTE_TYPOLOGY;
        
        this.linguisticCommunity = new TypologyId();
        this.linguisticCommunity.typologyId =  env.DEFAULT_COMUNIDAD_LINGUISTICA_ESPAÑOL;
        this.address = new contactAddress();
        

        //phones
    
        this.phones.push(new contactPhone(),new contactPhone())



        // this.createdBy = new AdmCreatedBy();
        // const createdBy =  new AdmCreatedBy();
        // this.createdBy.person.personKey =  createdBy.person.personKey;      

        
    
    }

}

export class PersonId {
    firstName = 0;
    lastName: string;
    personId: number;
}

export class PersonKey {
    personKey:string = '0';
    email: string = 'fo@bar.com';
}

export class ContactPerson {
    nameComplete: string;
    firstName = '';
    lastName: string;
    personKey:string = '0';
    birthday:  string  = env.DEFAULT_DATE;
    email : string = 'S/D';
    cui : number = 0;
    maritalStatus: TypologyId;
    profession: TypologyId;
}