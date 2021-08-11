import { useState } from 'react';
import { preparDataChart } from './Utils/ProcessInput';

import InputArea from './Components/InputArea';
import ChartPlot from './Components/Chart';
import { useAlert } from 'react-alert';

import './global.scss';

function App() {

  const [value, setValue] = useState('');
  const [categories, setCategories] = useState('');
  const [series, setSeries] = useState('');
  const alert = useAlert();

  function handleChange(event: any) {
    setValue(event.target.value);
  }

  function buttonClicked() {
    if (value === '') {
      alert.error('input is empty!');
    } else {
      let temp: any = preparDataChart(value);
      console.log(temp);
      if (temp !== false) {
        setCategories(temp.categories);
        setSeries(temp.series);
      }
    }
  }

  return (
    <div className="chart-plot-container">
      <div className="header-container">
        <legend >Janio Challenge</legend>
      </div>
      <InputArea value={value} handleChange={handleChange} />
      {categories !== '' && series !== '' ?
        <ChartPlot categories={categories} series={series} />
        : <div></div>
      }
      <div className="footer-container">
        <button className="generatechart-button" onClick={buttonClicked}>GENERATE CHART</button>
      </div>
    </div>
  );
}

export default App;
