export type PopulationDatum = {
    country: string
    pop: number
}

export interface IPopulationService {
    getAllPopulationsForYear(year: number): PopulationDatum[]
}
