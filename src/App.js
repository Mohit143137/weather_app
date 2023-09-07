import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import imgCard from "./img/weatherIcon.png";
import imgWind from "./img/humidity1.jpeg";
import imghumid from "./img/wind1.jpeg";
import imgtemp from "./img/temp.png";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const apiKey = "bd5b67263d986426a899375f0c5b7338";
  const [data, setData] = useState({});
  const [city, setCity] = useState("");

  function handleData(cityName) {
    if (!cityName) return;
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      " &appid=" +
      apiKey;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log("response", res.data);

        setData(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  // we use this function for input city name
  function handleInput(e) {
    setCity(e.target.value);
    // console.log("value", e.target.value);
  }

  //  we use this function for press button to take output
  function handleSearch(e) {
    handleData(city);
  }

  //Api ko call krne ke liye useEffect ka use kr rhe h

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="col-md-12">
      <div className="whether">
        <h1 className="text-white ">Whether App</h1>
        <div className="d-grid mt-4 gap-4 col-4">
          <input
            type="text"
            value={city}
            className="form-control"
            onChange={handleInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            search
          </button>
        </div>
      </div>
      <div className="col-md-12 text-center mt-5">
        <div className="box shadow rounded ">
          <div className="">
            <img src={imgCard} className="icon" alt="" />
            <h2 className="city"> {data?.name}</h2>
          </div>
          <div className="data d-flex direction justify-content-around pt-5">
            <div className="temp ">
              <h3 className="font">
                <img src={imgtemp} alt="" className="tempIcon" />
                <br />
                {(data?.main?.temp - 273.15).toFixed(2)}℃
              </h3>
            </div>
            <div className="wind">
              <h3 className="font">
                <img src={imghumid} alt="" className="windIcon " />
                <br />
                {data?.wind?.speed}mph
              </h3>
            </div>
            <div className="humidity">
              <h3 className="font">
                <img src={imgWind} alt="" className="humidIcon" />
                <br />
                {data?.main?.humidity}%
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
