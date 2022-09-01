import { extent, format, scaleLinear, scaleTime } from "d3";
import { PopulationTimeDatum } from "../services/IPopulationService";
import { AxisBottomTime } from "./AxisBottomTime";
import { LinearAxisLeft } from "./LinearAxisLeft";
import { LineMarks } from "./LineMarks";
import { ScatterMarks } from "./ScatterMarks";

type PopulationTimeChartProps = {
    popdata: PopulationTimeDatum[]
}

const xValue = (d: PopulationTimeDatum) => d.year;
const yValue = (d: PopulationTimeDatum) => d.pop;
const xAxisLabel = 'Time'
const yAxisLabel = 'Population of China'

export function PopulationTimeChart({ popdata }: PopulationTimeChartProps) {

    const height = 500;
    const width = 800;
    const margin = { top: 20, left: 110, bottom: 60, right: 30 };

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = scaleTime()
        .domain(extent(popdata, xValue) as [Date, Date])
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(popdata, yValue) as [number, number])
        .range([innerHeight, 0])
        .nice()

    const xTickFormatter = (d: Date) => `${d.getFullYear()}`
    const siFormat = format(".2s");
    function yTickFormatter(n: number) {
        return siFormat(n).replace('G', 'B');
    }
    return (
        <div className="App" >
            <svg style={{ border: '1px red solid' }} width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottomTime xScale={xScale} innerHeight={innerHeight} tickFormat={xTickFormatter} />
                    <LinearAxisLeft yScale={yScale} innerWidth={innerWidth} yTickFormatter={yTickFormatter} />
                    <LineMarks xScale={xScale} yScale={yScale}
                        data={popdata.map((d) => ({ x: xValue(d), y: yValue(d) }))}
                    />
                    <text className='axis-label'
                        x={innerWidth / 2}
                        y={innerHeight + 45}
                        textAnchor='middle'>{xAxisLabel}</text>
                    <text className='axis-label'
                        transform={`translate(${-60},${innerHeight / 2}) rotate(-90)`}
                        textAnchor='middle'>{yAxisLabel}</text>
                </g>
            </svg>
        </div>
    )
}
