import { format, scaleBand, scaleLinear } from "d3";
import { useEffect, useState } from "react";
import { AxisBottom } from "../components/AxisBottom";
import { AxisLeft } from "../components/AxisLeft";
import { BarMarks } from "../components/BarMarks";
import { IPopulationService, PopulationDatum } from "../services/IPopulationService";

type PopulationChartProps = {
    populationService: IPopulationService
}

export function PopulationChart(props: PopulationChartProps) {

    const popService = props.populationService;
    const [popData, setPopData] = useState(new Array<PopulationDatum>)

    const height = 500;
    const width = 800;
    const margin = { top: 20, left: 200, bottom: 60, right: 30 };

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    useEffect(() => {
        const data = popService.getAllPopulationsForYear(2020);
        setPopData(data.slice(0, 10).map(x => ({ ...x, pop: x.pop * 1000 })));
    }, []);

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
        <div className="App" >
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
