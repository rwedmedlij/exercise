import "./App.css";
import React, { useEffect, useState } from "react";
import Home from './components/Home'
import Admin from './components/Admin'
import Stats from './components/Stats'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { Button } from "bootstrap";

function App() {
  const [counter, setCounter] = useState(1);
  const [users, setusers] = useState([]);
  const [products, setprudocts] = useState([]);

  
  
  
  



  return (
    <div className="App">
      <div>
        <Router>
          <div>
           
            <Switch>
              <Route path="/home">
                 <Home />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route path="/Admin">
                <Admin />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
