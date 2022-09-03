import './App.css'
import { IPopulationService } from './services/IPopulationService';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { PopulationPage } from './pages/PopulationChart';
import { Iris } from './pages/Iris';
import { IIrisService } from './services/IIrisService';
import InteractiveChartPage from './pages/InteractiveChartPage';

type AppProps = {
  populationService: IPopulationService;
  irisService: IIrisService
}


const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Interactive</Link>
          </li>
          <li>
            <Link to="/population">Population</Link>
          </li>
          <li>
            <Link to="/iris">Iris</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

function App(props: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InteractiveChartPage irisService={props.irisService} />} />
          <Route path="population" element={<PopulationPage populationService={props.populationService} />} />
          <Route path="iris" element={<Iris irisService={props.irisService} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
