import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';


@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{

    constructor()
    {
        // this._fuseConfigService.config = {
        //     layout: {
        //         style    : 'horizontal-layout-1',
        //         navbar   : {
        //             hidden: false
        //         },
        //         toolbar  : {
        //             hidden: false
        //         },
        //         footer   : {
        //             hidden: true
        //         },
        //         sidepanel: {
        //             hidden: false
        //         }
        //     }
        // };
    }

}
