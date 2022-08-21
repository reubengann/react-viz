import { IIrisService, IrisDatum } from './IIrisService';
export class JsonIrisService implements IIrisService {

    irisData: any

    constructor(jsonData: any) {
        this.irisData = jsonData;
    }

    getAllIrisData(): IrisDatum[] {
        return this.irisData;
    }

}