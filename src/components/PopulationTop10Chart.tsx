import { format, scaleBand, scaleLinear } from "d3";
import { PopulationLocDatum } from "../services/IPopulationService";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { BarMarks } from "./BarMarks";

type PopulationTop10ChartProps = {
    popData: PopulationLocDatum[]
}

export default function PopulationTop10Chart({ popData }: PopulationTop10ChartProps) {

    const height = 500;
    const width = 800;
    const margin = { top: 20, left: 200, bottom: 60, right: 30 };

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const yScale = scaleBand()
        .domain(popData.map(d => d.country))
        .range([0, innerHeight])
        .padding(0.1)


    const xScale = scaleLinear()
        .domain([0, Math.max(...popData.map(x => x.pop))])
        .range([0, innerWidth])

    const siFormat = format(".2s");
    function xTickFormatter(n: number) {
        return siFormat(n).replace('G', 'B');
    }

    return (
        <div>
            <svg style={{ border: '1px red solid' }} width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xTickFormatter} />
                    <AxisLeft yScale={yScale} />
                    <BarMarks xScale={xScale} yScale={yScale}
                        data={popData.map((x) => ({ category: x.country, value: x.pop }))}
                        tooltipFormat={xTickFormatter} />
                    <text className='axis-label' x={innerWidth / 2} y={innerHeight + 45} textAnchor='middle'>Population</text>
                </g>
            </svg>
        </div>
    )
}
