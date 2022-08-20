import { ScaleLinear } from 'd3';

type AxisBottomProps = {
    xScale: ScaleLinear<number, number, never>;
    innerHeight: number;
};

export function AxisBottom({ xScale, innerHeight }: AxisBottomProps) {
    return <>{xScale.ticks().map(v => (
        <g key={v} transform={`translate(${xScale(v)}, 0)`}>
            <line y2={innerHeight} stroke="#fff" />
            <text style={{ textAnchor: 'middle' }} fill='#fff' y={innerHeight + 3} dy=".71em">{v}</text>
        </g>))}</>;
}
