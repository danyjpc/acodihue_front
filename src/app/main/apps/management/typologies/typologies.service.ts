import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { AdmTypology } from '../../../../shared/adm-models/AdmTypology';
import { reject } from 'lodash';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
@Injectable({
  providedIn: 'root'
})
export class TypologiesService {

  onChangeTypologyChilds  :  BehaviorSubject<any>;
  onChangeParentTypology: BehaviorSubject<any>;
  onChangeTypologyParentList: BehaviorSubject<any>;
    constructor(private api : ApiService ,  private fuseprogresBar: FuseProgressBarService) { 
    this.onChangeTypologyChilds   = new BehaviorSubject( [] );
    this.onChangeParentTypology = new BehaviorSubject( [100] );
    this.onChangeTypologyParentList = new BehaviorSubject( [] );
  }


  getAllTypollogiesParent( typologyId?: number ): Promise<any> {
    
    const endpoint = ( typologyId )?  `/rest/typologies/${typologyId}`:`/rest/typologies`;
    return new Promise ((resolve, reject) => {
      this.api.getMethod(endpoint).then(( typologies: AdmTypology) => {
        if (typologyId){
        this.onChangeTypologyChilds.next( typologies.childTypologies );
        } else {
          this.onChangeTypologyParentList.next(typologies);
        }
        resolve(typologies);

      }).catch((error) => {
        reject('Error al obtener tipologias '+ error );
      });
    });
  }

  getOnlyOneParentTypology(parentTypologyId: number): Promise <any> {
    const endpoint = `/rest/typologies/${parentTypologyId}`;
    return new Promise (( resolve, reject ) => {
      this.api.getMethod( endpoint ).then ( response => {
        resolve( response );
        this.onChangeParentTypology.next( response );

      }).catch( error => {
        reject( 'Error al obtener la typologia padre' + error );
      })
    });
  }

  updateChild( child: AdmTypology ): Promise<any> {
    const endpoint = `/rest/typologies/${child.typologyId}`;
    
    return new Promise((resolve, reject) => {
      this.api.putMethod( endpoint, child ).then(( response ) => {
        const isGlobalTypology = ( child.parentTypology.typologyId === 100)? this.getAllTypollogiesParent(): this.getAllTypollogiesParent(child.parentTypology.typologyId);
        resolve( response );
      }).catch( error => {
        reject( 'Error al guardar el registro' + error );
      })
    })
  }
  

  newChildTypology( childTypology: AdmTypology ): Promise <any> {
    const endpoint =`/rest/typologies`;
    console.log(childTypology);
    return new Promise ((resolve, reject) => {
    this.api.postMethod( endpoint, childTypology ).then( response => {
      resolve( response );
      if (childTypology.parentTypology.typologyId !== 100){
        this.getAllTypollogiesParent(childTypology.parentTypology.typologyId);
        this.getAllTypollogiesParent();

      } else {
        this.getAllTypollogiesParent();
      }
    }).catch( error  => {
      reject( 'Error al persistir el registro ' + error );
    });
    });
  }


  getTypology(typologyId: number): Promise<any>{
    const endpoint = `/rest/typologies/${typologyId}`;
    return new Promise((resolve, reject) => {
        this.api.getMethod(endpoint).then(typology => {
            resolve(typology);
        }).catch(( error ) => {
            reject('Sucedion un error al obtener la tipologia' + error);
        });
    });
}
  
}
