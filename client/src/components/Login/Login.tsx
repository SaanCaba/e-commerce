import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import React from 'react'
import { Error } from "../../interface/interface";
import linkedinLogo from './images/linkedin.png'
import gitHubLogo from './images/github.png'
import portfolio from './images/portfoliopic.jpg'
import '../styles/Login.css'
import { addUser } from "../../redux/actions";
import { useDispatch } from "react-redux";



function Login() {
    const [data, setData] = useState({
		email: "",
		password: "",
	});
    const dispatch = useDispatch()
	const [error, setError] = useState("");
    const handleChange = (e: React.FormEvent<HTMLInputElement> ) => {
		setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
	};
    const history = useHistory()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			// el token del back, para el usuario
            localStorage.setItem("token", res.data)
            // window.location.href = "/"
            history.push('/')
		} catch (error) {
            const typedError = error as Error
                if (
                    typedError.response &&
                    typedError.response.status >= 400 &&
                    typedError.response.status <= 500
                ) {
                    setError(typedError.response.data.message);
                }
		}
	};

    const googleAuth = async () => {
		window.open(
			`http://localhost:8080/auth/google/callback`,
			"_self"
		);
        const url = `http://localhost:8080/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
      dispatch(addUser(data))
      console.log(data.token)
      localStorage.setItem('token', data.token)
	};

  return (
    <div className="vh-100  row">
        <div className="text-light  cont-1-log col-3 d-flex align-items-center justify-content-center">
            <div className="div-back">

            <div className="d-flex flex-column blur-back">
            <form onSubmit={handleSubmit}>
            <h2 className="title-log">Login into your account</h2>
            <div className="d-flex justify-content-center">
            <div className="d-flex flex-column ">
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
                            className="m-1 inp-login"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
                            className="m-1 inp-login"
						/>
						{error && <div>{error}</div>}
                        <div className="d-flex justify-content-center mt-3">
						<button type="submit" className="border-0 btn-signin"  >
							Sing In
						</button>
                        </div>
                    </div>
            </div>

            </form>
            <div className="text-light">
                <h2 className="text-center title-log mt-4 h2">You don't have account?</h2>
                <div className="d-flex justify-content-center">
					<Link to="/signup">
						<button type="button" className="border-0 btn-signup">  
							Sing up
						</button>
					</Link>
                </div>
                <div className="d-flex justify-content-center">
                <button onClick={googleAuth}>
						<img src="" alt="google icon" />
						<span>Sing in with Google</span>
					</button>
                </div>

				</div>
                
                </div>
            </div>

        </div>

        <div className="col cont-2-login">
            <div className="reg-cont-aboutme">
               <div className="d-flex justify-content-center align-items-center h-100 w-100 cont-ani">
                <div>
                    <div className="d-flex justify-content-center">
                    <span className="text-light h2" >By: Santiago Caballero</span>
                    </div>
                    <div className="d-flex justify-content-around mt-3">
                        <a href="https://www.linkedin.com/in/santiago-caballero-82aa241a1/" target='_blank'>
                        <img style={{width:'50px'}} src={linkedinLogo} />
                        </a>
                        <a href="https://github.com/SaanCaba" target='_blank'>
                        <img style={{width:'50px'}} src={gitHubLogo} />
                        </a>
                    </div>
                    <div className="mt-4 d-flex flex-column">
                <span className="h2 text-light text-center">Portfolio</span>
                <a href="https://new-portfolio-chi-one.vercel.app/" target='_blank'>
                    <img className="img-portfolio" style={{width:'580px', height:'320px'}} src={portfolio} />
                </a>
                </div>
                </div>
                
               </div>
               
            </div>
            
        </div>

    </div>
  )
}

export default Login