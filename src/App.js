import React,{useState,useEffect} from "react";
import Axios from 'axios';
import './App.css';

function App() {


  const [city,setCity]=useState('');
  const [flag,setFlag]=useState(false);
  const [cityObj,setCityObj] = useState({
    name : '',
    description :'',
    temp:0,
    mintemp:0,
    maxtemp:0,
    humidity:0,
    country:''
  })


  const search = ()=>{
      Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`).then((response)=>{
        setCityObj({name: response.data.name,description: response.data.weather[0].description,temp: response.data.main.temp,mintemp:response.data.main.temp_min,maxtemp:response.data.main.temp_max,humidity: response.data.main.humidity,country: response.data.sys.country});
        console.log(response.data);
        
        setFlag(true);
      }).catch((error)=>{
        setFlag(false);
        console.log(process.env);
        alert('Please enter valid City name');
      })
  }

  


  return (
    <div className="App">
        <div className="header">
              <h1>Weather Forecast</h1>
              <hr></hr>
        </div>

        <div className="f-container">
              <input type="text" onChange={(event)=>{
                setCity(event.target.value);
              }}></input>
              <br></br>
              <button onClick={search}> Search</button>
        </div>


      {flag ? (<div className="box">        
        <table className="tab">
          <tbody>
            <tr className="row">
              <td>City</td>
              <td>{cityObj.name}</td>
            </tr>
            <tr className="row">
              <td>Description</td>
              <td>{cityObj.description}</td>
            </tr>
            <tr className="row">
              <td>Temperature</td>
              <td>{(cityObj.temp-273.15).toPrecision(4)}°C</td>
            </tr>
            <tr className="row">
              <td>Min Temp</td>
              <td>{(cityObj.mintemp-273.15).toPrecision(4)}°C</td>
            </tr>
            <tr className="row">
              <td>Max Temp</td>
              <td>{(cityObj.maxtemp-273.15).toPrecision(4)}°C</td>
            </tr>
            <tr className="row">
              <td>Humidity</td>
              <td>{cityObj.humidity}</td>
            </tr>
            <tr className="row">
              <td>Country</td>
              <td>{cityObj.country}</td>
            </tr>
          </tbody>
        
        </table>
      
   </div>): <h1></h1>}


    
    </div>

  );
}

export default App;
