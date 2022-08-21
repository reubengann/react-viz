import { extent, scaleLinear } from "d3";
import { useEffect, useState } from "react";
import { AxisBottom } from "../components/AxisBottom";
import { LinearAxisLeft } from "../components/LinearAxisLeft";
import { ScatterMarks } from "../components/ScatterMarks";
import { IIrisService, IrisDatum } from "../services/IIrisService";

type IrisProps = {
    irisService: IIrisService
}

const xValue = (d: IrisDatum) => d.sepalLength;
const yValue = (d: IrisDatum) => d.sepalWidth;
const xAxisLabel = 'Sepal Length'
const yAxisLabel = 'Sepal Width'

export function Iris({ irisService }: IrisProps) {
    const [irisData, setIrisData] = useState(new Array<IrisDatum>)


    const height = 500;
    const width = 800;
    const margin = { top: 20, left: 100, bottom: 60, right: 30 };

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    useEffect(() => {
        const data = irisService.getAllIrisData();
        setIrisData(data);
    }, []);

    const xScale = scaleLinear()
        .domain(extent(irisData, xValue) as [number, number])
        .range([0, innerWidth]);

    const yScale = scaleLinear()
        .domain(extent(irisData, yValue) as [number, number])
        .range([0, innerHeight])

    const xTickFormatter = (d: number) => `${d}`

    return (
        <div className="App" >
            <svg style={{ border: '1px red solid' }} width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xTickFormatter} />
                    <LinearAxisLeft yScale={yScale} innerWidth={innerWidth} />
                    <ScatterMarks xScale={xScale} yScale={yScale}
                        data={irisData.map((d) => ({ category: d.species, x: xValue(d), y: yValue(d) }))}
                        tooltipFormat={xTickFormatter} />
                    <text className='axis-label'
                        x={innerWidth / 2}
                        y={innerHeight + 45}
                        textAnchor='middle'>{xAxisLabel}</text>
                    <text className='axis-label'
                        transform={`translate(${-50},${innerHeight / 2}) rotate(-90)`}
                        textAnchor='middle'>{yAxisLabel}</text>
                </g>
            </svg>
        </div>
    )
}
