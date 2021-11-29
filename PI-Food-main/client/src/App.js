import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from "./components/Home";
import RecipeCreate from './components/RecipeCreate';
import Detail from './components/Detail';


// //lo primero que hago es crear el browserRoute que me envuelve toda la app
//tener en cuenta que la version nueva ya no toma switch, reemplazar routes
//tambien cambiar components con element, y poner </>
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route path='/recipe' component={RecipeCreate} />
          <Route path='/recipes/:id' component={Detail} />
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;