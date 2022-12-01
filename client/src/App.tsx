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
import { UserInfo } from './interface/interface';
import swal from 'sweetalert';
import Pago from './components/Stripe/Pago';


function App() {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const userRedux = useSelector((state: UserInfo) => state.user)
  const getUserLoc = JSON.parse(localStorage.getItem('userLog') as string)
  const getValidate = localStorage.getItem('validateG')


  const getUser = async () => {
    // log con google
		try {
			const url = `http://deploy-back-production.up.railway.app/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
    await  localStorage.setItem('validateG', 'no')
     await localStorage.setItem('token', data.token)
      console.log(getUserLoc)
      localStorage.setItem('userLog', JSON.stringify(data.user._json.name))
      window.location.reload()
    return;
		} catch (err) {
			console.log(err);
      localStorage.removeItem('token')
      localStorage.removeItem('userLog')
		}
	};
  

	useEffect(  () => {
    if(getValidate === 'yes'){
    getUser()
    }
	}, []);
  

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
