import { Route } from 'react-router-dom';
import './App.css';
import Countries from './components/Countries';
import CreationActivity from './components/CreationActivity';
import DetailCountry from './components/DetailCountry';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      
        
      <Route exact path="/"><LandingPage></LandingPage></Route>
      <Route exact path="/home" component={Home}></Route>      
      <Route exact path="/countries"><Countries></Countries></Route>
      <Route exact path = "/countries/:id" component={DetailCountry}></Route>
      <Route exact path = "/createActivity" component={CreationActivity}></Route>
      

      
      

    </div>
  );
}

export default App;
