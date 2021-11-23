import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from "./components/Home";

// //lo primero que hago es crear el browserRoute que me envuelve toda la app
//tener en cuenta que la version nueva ya no toma switch, reemplazar routes
//tambien cambiar components con element, y poner </>
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route exact path = "/" element = {<LandingPage/>}/>
      <Route path = "/home" element = {<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;