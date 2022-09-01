export type PopulationLocDatum = {
    country: string
    pop: number
}
export type PopulationTimeDatum = {
    year: Date
    pop: number
}

export interface IPopulationService {
    getAllPopulationsForYear(year: number): PopulationLocDatum[]
    getAllPopulationsForCountry(country: string): PopulationTimeDatum[]
}
