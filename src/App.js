import React, { createContext, useState } from 'react';
import Heading from './components/Heading/Heading';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const loginContext = createContext();
const App = () => {
  const [userName, setUserName] = useState({})
  const [amount, setAmount] = useState({})
  //to set the amount of selected car
  const handleCategory = (car) => {
    setAmount(car)
  }
  return (
    <loginContext.Provider value={[userName, setUserName]}>
      <Router className="background">
        <Heading />
        <Switch>
          <Route path="/home">
            <HomePage handleCategory={handleCategory} />
          </Route>
          <Route path="/destination">
            <Destination car={amount} />
          </Route>
          <Route path="/blog">
            <h1 style={{ textAlign: 'center' }}>No blog available right now!</h1>
          </Route>
          <Route path="/contact">
            <h1 style={{ textAlign: 'center' }}>Email at: thetravelhorse@yahoo.com</h1>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <HomePage handleCategory={handleCategory} />
          </Route>
          <Route path="*">
            <h1 style={{ textAlign: 'center', color: 'tomato' }}>404 error! page not found</h1>
          </Route>
        </Switch>
      </Router>
    </loginContext.Provider>
  );
};

export default App;