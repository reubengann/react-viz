import { line, ScaleLinear, ScaleTime } from 'd3';

export type XYDatum = {
    category?: string
    x: number | Date
    y: number
}

type LineMarksProps = {
    xScale: ScaleLinear<number, number, never> | ScaleTime<number, number, never>
    yScale: ScaleLinear<number, number, never>;
    data: XYDatum[];
};

export function LineMarks({ xScale, yScale, data }: LineMarksProps) {
    return (
        <>
            <path d={line<XYDatum>()
                .x((d: XYDatum) => xScale(d.x))
                .y((d: XYDatum) => yScale(d.y))(data) ?? ''}
                className="line-mark"
            />
        </>
    );
}
