import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import React from 'react'
import { Error } from "../../interface/interface";
import '../styles/Login.css'



function Login() {
    const [data, setData] = useState({
		email: "",
		password: "",
	});
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


  return (
    <div className="vh-100  row">
        <div className="text-light bg-success cont-1-log col-3 d-flex align-items-center justify-content-center">
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
                            className="m-1"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
                            className="m-1"
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
                    
				</div>
                </div>
            </div>

        </div>

        <div className="col bg-danger cont-2-login">
        </div>

    </div>
  )
}

export default Login