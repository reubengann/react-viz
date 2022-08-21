import { ScaleBand, ScaleLinear } from 'd3';

export type CategoricalDatum = {
    category: string
    value: number
}

type MarksProps = {
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleBand<string>;
    data: CategoricalDatum[];
    tooltipFormat: (n: number) => string;
};

export function Marks({ xScale, yScale, data, tooltipFormat }: MarksProps) {
    return (
        <>
            {data.map(d => <rect className='marks-1' key={d.category}
                x={0} y={yScale(d.category)}
                width={xScale(d.value)}
                height={yScale.bandwidth()} >
                <title>{tooltipFormat(d.value)}</title>

            </rect>)}
        </>
    );
}
