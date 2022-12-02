import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Error } from "../../interface/interface";
import '../styles/Register.css'
import {IoMdArrowRoundBack} from 'react-icons/io'

export const Register = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const history = useHistory()

	const handleChange = (e : React.FormEvent<HTMLInputElement>) => {
		setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const url = "https://deploy-back-production.up.railway.app/api/users";
			const { data: res } = await axios.post(url, data);
			history.push("/login");
			console.log(res.message);
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
		<div className="w-100 cont-main-register">
			<div className="cont-register vh-100 " >
				<div className="cont-bk d-flex justify-content-center align-items-center" >
                    <div className="d-flex flex-column">


				
				<div>
				<div className="d-flex justify-content-start">
				<Link to="/login" className="text-decoration-none">
					<IoMdArrowRoundBack color="#3ef068" size={30} />
					<span className="text-light h5">Volver</span>
				</Link>
				</div>
					<form onSubmit={handleSubmit}>
						<h1 className="text-center title-reg">Crea tu cuenta!</h1>
						<div className="d-flex flex-column">
                        <input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
                            className="inp-register bg-transparent"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
                            className="inp-register bg-transparent"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
                            className="inp-register bg-transparent"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
                            className="inp-register bg-transparent"
						/>
						{error && <div >{error}</div>}
						<button type="submit" className="btn-reg" >
							Registrate
						</button>
                        </div>
					</form>
				</div>

			</div>
            </div>
            </div>
		</div>
	);
};