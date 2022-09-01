import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { JsonIrisService } from './services/JsonIrisService'
import { JsonPopulationService } from './services/JsonPopulationService'

// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath: string, mimeType: string) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
    return xmlhttp.responseText;
  }
  else {
    // TODO Throw exception
    return null;
  }
}

function loadJSON(filePath: string) {
  // Load json file;
  var json = loadTextFileAjaxSync(filePath, "application/json");
  // Parse json
  if (json)
    return JSON.parse(json);
  throw Error("could not read file.")
}

let jsonData: any;
let jsonData2: any;

jsonData = loadJSON('../../country_population_by_year.json')
jsonData2 = loadJSON('../../country_population_by_nation.json');
const populationService = new JsonPopulationService(jsonData, jsonData2);

jsonData = loadJSON('../../iris.json')
const irisService = new JsonIrisService(jsonData)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App
      populationService={populationService}
      irisService={irisService} />
  </React.StrictMode>
)
