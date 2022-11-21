import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import { Register } from './components/Register/Register';

function App() {
  return (
    <BrowserRouter>
    <div className="App overflow-hidden">
      <Switch>
        <Route exact path='/'>
        <NavBar />
        <Home />
        </Route>
        {/* <Route exact path='/' component={Home} /> */}
        <Route path="/signup" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
