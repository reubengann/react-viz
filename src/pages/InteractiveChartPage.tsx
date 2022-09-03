import { extent, scaleLinear } from "d3";
import { useEffect, useState } from "react";
import { AxisBottom } from "../components/AxisBottom";
import { LinearAxisLeft } from "../components/LinearAxisLeft";
import { ScatterMarks } from "../components/ScatterMarks";
import { IIrisService, IrisDatum } from "../services/IIrisService";

type DropdownItem = {
    key: string;
    label: string;
}

function Dropdown(props: {
    data: DropdownItem[],
    id: string,
    selectedOption: string,
    selectedChanged: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <select id={props.id} onChange={
            e => props.selectedChanged(e.target.value)
        } value={props.selectedOption}>
            {
                props.data.map(x =>
                    <option value={x.key}>{x.label}</option>
                )
            }
        </select>
    )
}

type IrisProps = {
    irisService: IIrisService
}

const xOptions: DropdownItem[] = [
    { key: 'sepalLength', label: 'Sepal Length' },
    { key: 'sepalWidth', label: 'Sepal Width' },
    { key: 'petalLength', label: 'Petal Length' },
    { key: 'petalWidth', label: 'Petal Width' },
]

export default function InteractiveChartPage({ irisService }: IrisProps) {
    const [irisData, setIrisData] = useState(new Array<IrisDatum>)
    const [selectedXAttr, setselectedXAttr] = useState(xOptions[0].key)
    const [selectedYAttr, setselectedYAttr] = useState(xOptions[1].key)
    useEffect(() => {
        const data = irisService.getAllIrisData();
        setIrisData(data);
    }, []);

    const height = 500;
    const width = 800;
    const margin = { top: 20, left: 100, bottom: 60, right: 30 };

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = (d: IrisDatum) => getIrisAttr(selectedXAttr, d);
    const yValue = (d: IrisDatum) => getIrisAttr(selectedYAttr, d);
    const xAxisLabel = xOptions.find(x => x.key === selectedXAttr)?.label
    const yAxisLabel = xOptions.find(x => x.key === selectedYAttr)?.label

    const xScale = scaleLinear()
        .domain(extent(irisData, xValue) as [number, number])
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(irisData, yValue) as [number, number])
        .range([0, innerHeight])
        .nice()

    const xTickFormatter = (d: number) => `${d}`

    return (
        <div>
            <label htmlFor="x-select">X</label>
            <Dropdown data={xOptions} id="x-select" selectedOption={selectedXAttr} selectedChanged={setselectedXAttr} />
            <label htmlFor="y-select">Y</label>
            <Dropdown data={xOptions} id="y-select" selectedOption={selectedYAttr} selectedChanged={setselectedYAttr} />

            <div>
                <svg style={{ border: '1px red solid' }} width={width} height={height}>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xTickFormatter} />
                        <LinearAxisLeft yScale={yScale} innerWidth={innerWidth} />
                        <ScatterMarks xScale={xScale} yScale={yScale}
                            data={irisData.map((d) => ({ category: d.species, x: xValue(d), y: yValue(d) }))}
                        />
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
        </div>
    )
}
function getIrisAttr(selectedXAttr: string, d: IrisDatum): number {
    switch (selectedXAttr) {
        case 'sepalLength': return d.sepalLength;
        case 'sepalWidth': return d.sepalWidth;
        case 'petalLength': return d.petalLength;
        case 'petalWidth': return d.petalWidth;
    }
    return 0;
}

