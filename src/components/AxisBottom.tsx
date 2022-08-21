import { ScaleLinear } from 'd3';

type AxisBottomProps = {
    xScale: ScaleLinear<number, number, never>;
    innerHeight: number;
    tickFormat: (n: number) => string
};


export function AxisBottom({ xScale, innerHeight, tickFormat }: AxisBottomProps) {
    return <>{xScale.ticks().map(v => (
        <g className='axis-bottom-tick' key={v} transform={`translate(${xScale(v)}, 0)`}>
            <line y2={innerHeight} />
            <text style={{ textAnchor: 'middle' }} y={innerHeight + 3} dy=".71em">{tickFormat(v)}</text>
        </g>))}</>;
}
