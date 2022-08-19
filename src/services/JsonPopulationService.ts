import { IPopulationService, PopulationDatum } from './IPopulationService';
export class JsonPopulationService implements IPopulationService {

    data_by_year: any;

    constructor(jsonData: any) {
        this.data_by_year = jsonData
    }

    getAllPopulationsForYear(year: number): PopulationDatum[] {
        return this.data_by_year[year];
    }

}