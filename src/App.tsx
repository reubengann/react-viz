import { useEffect, useState } from 'react'
import './App.css'
import { IPopulationService, PopulationDatum } from './services/IPopulationService';

type AppProps = {
  populationService: IPopulationService
}

function App(props: AppProps) {

  const popService = props.populationService;
  const [popData, setPopData] = useState(new Array<PopulationDatum>)

  useEffect(() => {
    const data = popService.getAllPopulationsForYear(2020);
    setPopData(data);
  }, []);

  return (
    <div className="App">
      {popData.map((x, index) => {
        return <div key={index}>{x.country}</div>
      })}
    </div>
  )
}

export default App
