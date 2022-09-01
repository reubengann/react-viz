import { IPopulationService, PopulationLocDatum, PopulationTimeDatum } from './IPopulationService';
export class JsonPopulationService implements IPopulationService {

    data_by_year: any;
    data_by_country: any;

    constructor(jsonData: any, jsonData2: any) {
        this.data_by_year = jsonData
        this.data_by_country = {}
        for (let [key, value] of Object.entries(jsonData2)) {
            this.data_by_country[key] = (value as Array<any>).map((x: any) => ({
                year: new Date(x.year, 0, 0), pop: x.pop * 1000
            }))
        }
    }

    getAllPopulationsForCountry(country: string): PopulationTimeDatum[] {
        return this.data_by_country[country];
    }

    getAllPopulationsForYear(year: number): PopulationLocDatum[] {
        return this.data_by_year[year];
    }

}