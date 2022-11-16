import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
    <div className="App overflow-hidden">
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
