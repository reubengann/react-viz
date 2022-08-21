import { ScaleLinear } from 'd3';

type LinearAxisLeftProps = {
    yScale: ScaleLinear<number, number, never>;
    innerWidth: number
};

export function LinearAxisLeft({ yScale, innerWidth }: LinearAxisLeftProps) {
    return (<>
        {yScale.ticks().map((v, i) => (
            <g className='axis-bottom-tick' key={i} transform={`translate(0, ${yScale(v)})`}>
                <line x2={innerWidth} />

                <text style={{ textAnchor: 'end' }} dy=".31em" x={-3}>{v}</text>
            </g>
        ))}
    </>);
}
