import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
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

jsonData = loadJSON('../../country_population_by_year.json');
const populationService = new JsonPopulationService(jsonData);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App populationService={populationService} />
  </React.StrictMode>
)
