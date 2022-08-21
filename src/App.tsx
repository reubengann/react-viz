import './App.css'
import { IPopulationService, PopulationDatum } from './services/IPopulationService';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { PopulationChart } from './pages/PopulationChart';

type AppProps = {
  populationService: IPopulationService
}


const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Population</Link>
          </li>
          <li>
            <Link to="/sepal">Sepal</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

function Sepal() {
  return (<div>sepal</div>)
}

function App(props: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PopulationChart populationService={props.populationService} />} />
          <Route path="sepal" element={<Sepal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );


}

export default App
