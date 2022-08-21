import { IIrisService } from "../services/IIrisService";

type IrisProps = {
    irisService: IIrisService
}

export function Iris({ irisService }: IrisProps) {
    return (<div>{irisService.getAllIrisData().map(d => <div>{d.species}</div>)}</div>);
}
