import { ScaleTime } from 'd3';

type AxisBottomProps = {
    xScale: ScaleTime<number, number, never>;
    innerHeight: number;
    tickFormat: (d: Date) => string
};


export function AxisBottomTime({ xScale, innerHeight, tickFormat }: AxisBottomProps) {
    return <>{xScale.ticks().map(v => (
        <g className='axis-bottom-tick' key={v.toString()} transform={`translate(${xScale(v)}, 0)`}>
            <line y2={innerHeight} />
            <text style={{ textAnchor: 'middle' }} y={innerHeight + 3} dy=".71em">{tickFormat(v)}</text>
        </g>))}</>;
}
