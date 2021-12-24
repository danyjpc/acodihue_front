export class AdmCheckList {
    internalCode: string = "CD-123"
    details: itemDetail[] =[];
}


export class itemDetail  {
    number = 0;
    percentageComplete = 0;
    nameDocument = "";
    download: boolean = false;
    pathDownload = "";
    subRequirements: subRequirements[]=[];   
}



export class subRequirements {
    description: string;
    percentageRepresented: number = 0;
    complete = false;
}
export class PathDocument{
    nameDocument = "";
    pathDownload = "";
}