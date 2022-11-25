import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import Home from './components/Home';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import { Register } from './components/Register/Register';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/actions'
import { useSelector } from 'react-redux';


function App() {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const userRedux = useSelector((state:any) => state.user)
  

  // const getUser = async () => {
	// 	try {
	// 		const url = `http://localhost:8080/auth/login/success`;
	// 		const { data } = await axios.get(url, { withCredentials: true });
	// 		setUser(data.user._json);
  //     dispatch(addUser(data))
  //     console.log(data.token)
  //     localStorage.setItem('token', data.token)
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };
  
	// useEffect(() => {
  //   if(user === null){
  //     getUser()
  //   }
    
	// }, []);
  

  return (
    <BrowserRouter>
    <div className="App overflow-hidden">
      <Switch>
        <Route exact path='/'>
        <NavBar />
        <Home userDetails={userRedux !== null ? userRedux : null} />
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
