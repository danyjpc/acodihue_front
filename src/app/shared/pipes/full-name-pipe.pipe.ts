import { Pipe, PipeTransform } from '@angular/core';
import { AdmPerson } from '../adm-models/AdmPerson';

@Pipe({
  name: 'fullNamePipe'
})
export class FullNamePipePipe implements PipeTransform {

  transform(person: AdmPerson, args?: unknown): unknown {
    const nombre1 = (person.firstName) ? person.firstName : '';
    const nombre2 = (person.middleName) ? person.middleName : '';
    const ape1 = (person.lastName) ? person.lastName : '';
    const ape2 = (person.partnerName) ? person.partnerName : '';
    const apecasada = (person.marriedName) ? person.marriedName : '';


    const names = `${nombre1} ${nombre2}`;
    const appelidos = `${ape1} ${ape2} ${apecasada}`;
    const fullName = `${names}, ${appelidos}`;
    return fullName;
  }

}
