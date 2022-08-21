import { ScaleBand } from 'd3';

type AxisLeftProps = {
    yScale: ScaleBand<string>;
};

export function AxisLeft({ yScale }: AxisLeftProps) {
    return (<>
        {yScale.domain().map(v => (
            <text className='axis-left-text' key={v} style={{ textAnchor: 'end' }} y={(yScale(v) ?? 0) + yScale.bandwidth() / 2} dy=".31em" x={-3}>{v}</text>
        ))}
    </>);
}
