import { Pipe, PipeTransform } from '@angular/core';
import { subRequirements } from '../../main/apps/credits/credit-details/credits-check-list/AdmCreditCheckList';

@Pipe({
  name: 'fullRequirementsPipe'
})
export class FullRequirementsPipePipe implements PipeTransform  {

    transform(subRequirements: subRequirements[], args?: unknown): unknown {
       
        const names = subRequirements.map( item => {
            return item.description;
        }).join(', ');
  
        return names.toString();
      }
}