export type IrisDatum = {
    sepalLength: number;
    sepalWidth: number;
    petalLength: number;
    petalWidth: number;
    species: string;
}

export interface IIrisService {
    getAllIrisData(): IrisDatum[]
}