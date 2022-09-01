import { ScaleLinear, ScaleTime } from 'd3';

export type XYDatum = {
    category?: string
    x: number | Date
    y: number
}

type ScatterMarksProps = {
    xScale: ScaleLinear<number, number, never> | ScaleTime<number, number, never>
    yScale: ScaleLinear<number, number, never>;
    data: XYDatum[];
};

export function ScatterMarks({ xScale, yScale, data }: ScatterMarksProps) {
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
