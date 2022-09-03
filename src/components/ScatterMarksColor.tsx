import { ScaleLinear, ScaleOrdinal, ScaleTime } from 'd3';

type XYDatum = {
    category?: string
    x: number | Date
    y: number
}

type ScatterMarksProps = {
    xScale: ScaleLinear<number, number, never> | ScaleTime<number, number, never>
    yScale: ScaleLinear<number, number, never>;
    colorScale: ScaleOrdinal<string, string, never>;
    data: XYDatum[];
};

export function ScatterMarksColor({ xScale, yScale, data, colorScale }: ScatterMarksProps) {
    return (
        <>
            {data.map((d, i) => (<circle
                key={i}
                fill={colorScale(d.category ?? '')}
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                r={7} />))}
        </>
    );
}
