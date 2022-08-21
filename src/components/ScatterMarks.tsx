import { ScaleLinear } from 'd3';

export type XYDatum = {
    category: string
    x: number
    y: number
}

type ScatterMarksProps = {
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    data: XYDatum[];
    tooltipFormat: (n: number) => string;
};

export function ScatterMarks({ xScale, yScale, data, tooltipFormat }: ScatterMarksProps) {
    return (
        <>
            {data.map((d, i) => (<circle className='marks-1'
                key={i}
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                r={7} />))}
        </>
    );
}
