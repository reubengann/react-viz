import { ScaleBand, ScaleLinear } from 'd3';

export type CategoricalDatum = {
    category: string
    value: number
}

type MarksProps = {
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleBand<string>;
    data: CategoricalDatum[];
};

export function Marks({ xScale, yScale, data }: MarksProps) {
    return (
        <>
            {data.map(d => <rect key={d.category}
                x={0} y={yScale(d.category)}
                width={xScale(d.value)}
                height={yScale.bandwidth()} fill="#8dd3c7"></rect>)}
        </>
    );
}
