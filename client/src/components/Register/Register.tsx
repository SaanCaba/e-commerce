import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import { Error } from "../../interface/interface";


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
			<div >
				<div >
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" >
							Sing in
						</button>
					</Link>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
						/>
						{error && <div >{error}</div>}
						<button type="submit" >
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};