import { useEffect, useState } from "react";
import PopulationTop10Chart from "../components/PopulationTop10Chart";
import { IPopulationService, PopulationLocDatum, PopulationTimeDatum } from "../services/IPopulationService";
import { PopulationTimeChart } from "../components/PopulationTimeChart";

type PopulationPageProps = {
    populationService: IPopulationService
}

export function PopulationPage(props: PopulationPageProps) {

    const popService = props.populationService;
    const [popLocData, setPopLocData] = useState(new Array<PopulationLocDatum>())
    const [popTimeData, setPopTimeData] = useState(new Array<PopulationTimeDatum>())

    useEffect(() => {
        const data = popService.getAllPopulationsForYear(2020);
        setPopLocData(data.slice(0, 10).map(x => ({ ...x, pop: x.pop * 1000 })));
        setPopTimeData(popService.getAllPopulationsForCountry("China"));
    }, []);

    return (
        <div className="App" >
            <PopulationTimeChart popdata={popTimeData} />
            <PopulationTop10Chart popData={popLocData} />
        </div>
    )
}

