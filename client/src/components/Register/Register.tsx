import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Error } from "../../interface/interface";
import '../styles/Register.css'

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
			const url = "http://localhost:8080/api/users";
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
		<div>
			<div className="cont-register vh-100 " >
				<div className="cont-bk d-flex justify-content-center align-items-center" >
                    <div className="d-flex flex-column">


				
				<div>
					<form onSubmit={handleSubmit}>
						<h1 className="text-center title-reg">Create Account</h1>
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
							Sing Up
						</button>
                        </div>
					</form>
				</div>
				<div className="d-flex justify-content-center">

<Link to="/login">
	<button className="border-0 btn-signin-reg bg-transparent mb-3" type="button" >
		Sign in
	</button>
	
</Link>
</div>
			</div>
            </div>
            </div>
		</div>
	);
};