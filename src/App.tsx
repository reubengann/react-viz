import { useEffect, useState } from 'react'
import './App.css'
import { IPopulationService, PopulationDatum } from './services/IPopulationService';
import { scaleBand, scaleLinear } from 'd3'

type AppProps = {
  populationService: IPopulationService
}

function App(props: AppProps) {

  const popService = props.populationService;
  const [popData, setPopData] = useState(new Array<PopulationDatum>)

  const height = 500;
  const width = 800;
  const margin = { top: 20, left: 200, bottom: 20, right: 20 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  useEffect(() => {
    const data = popService.getAllPopulationsForYear(2020);
    setPopData(data.slice(0, 10));
  }, []);

  const yScale = scaleBand()
    .domain(popData.map(d => d.country))
    .range([0, innerHeight])


  const xScale = scaleLinear()
    .domain([0, Math.max(...popData.map(x => x.pop))])
    .range([0, innerWidth])

  return (
    <div className="App" >
      <svg style={{ border: '1px red solid' }} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {xScale.ticks().map(v => (
            <g key={v} transform={`translate(${xScale(v)}, 0)`}>
              <line y2={innerHeight} stroke="#fff" />
              <text style={{ textAnchor: 'middle' }} fill='#fff' y={innerHeight + 3} dy=".71em">{v}</text>
            </g>))}
          {yScale.domain().map(v => (
            <text key={v} style={{ textAnchor: 'end' }} fill='#fff' y={(yScale(v) ?? 0) + yScale.bandwidth() / 2} dy=".31em" x={-3}>{v}</text>
          ))}
          {popData.map(d => <rect key={d.country}
            x={0} y={yScale(d.country)}
            width={xScale(d.pop)}
            height={yScale.bandwidth()} fill="#aaa"></rect>)
          }
        </g>
      </svg>
    </div>
  )
}

export default App
