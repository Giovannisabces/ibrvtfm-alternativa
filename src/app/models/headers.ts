export class Headers{
    "Access-Control-Allow-Headers": string="";
    "Access-Control-Allow-Methods": string='*';
    "Access-Control-Allow-Origin": string='*';
    constructor(headers:string, methods:string, origin:string ){
        this["Access-Control-Allow-Headers"]=headers;
        this["Access-Control-Allow-Methods"]=methods;
        this["Access-Control-Allow-Origin"]=origin;
    }
}