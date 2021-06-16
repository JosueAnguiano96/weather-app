import React, {useState} from 'react';
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


const App = () => {

  const [temperature, setTemperature] = useState(undefined)
  const [city, setCity] = useState(undefined)
  const [country, setCountry] = useState(undefined)
  const [humidity, setHumidity] = useState(undefined)
  const [description, setDescription] = useState(undefined)
  const [error, setError] = useState(undefined)

  const API_KEY = "283b74014745a6bfcb348a31b6e3f136";

  const getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.city.value
    const country = e.target.country.value
    const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
    const data = await apiCall.json()
    if(city && country){
      setTemperature(data.main.temp)
      setCity(data.name)
      setCountry(data.sys.country)
      setHumidity(data.main.humidity)
      setDescription(data.weather[0].description)
      setError()
    } else {
      setTemperature(undefined)
      setCity(undefined)
      setCountry(undefined)
      setHumidity(undefined)
      setDescription(undefined)
      setError("Error please enter the values...")
    }
  }

  return ( 
    <div>
      <div className="wrapper">
        <div className="main">
          <Container>
            <Row>
              <Col md={5} xs={12} className="title-container">
                <Title />
              </Col>
              <Col md={7} xs={12} className="form-container">
                <Form getWeather={getWeather}/>
                <Weather 
                  temperature={temperature}
                  city={city}
                  country={country}
                  humidity={humidity}
                  description={description}
                  error={error}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
   );
}

      
 
export default App;