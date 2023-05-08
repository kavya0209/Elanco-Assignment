/**
 * owner : Hitachi
 * author : Manish from Affine
 */
import React, { useEffect, useState } from 'react'
import EmailLogo from '../assets/images/username_icon.svg';
import PasswordLogo from '../assets/images/password_icon.svg';
import infoIcon from '../../src/assets/images/info_icon.svg';
import { useHistory } from 'react-router-dom';
import infoData from '../assets/data/info.json';
import './Login.scss';
import { Tooltip } from '../../node_modules/bootstrap/dist/js/bootstrap.esm.min.js';


function Login() {

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new Tooltip(tooltipTriggerEl)
	});
	
	// TODO: Clear session storage below can be avoided once logout functionality is implemented.
	
	useEffect(()=>{
		// loginService.logout();
	})

	const history = useHistory();

	const [data, setData] = useState({
		username: "",
		password: ""
	});

	const [userNameError, setUserNameError] = useState({});
	const [errorHighlight, setErrorHighlight] = useState(false);
	const { username, password } = data;

	const changeHandler = e => {
		setData({ ...data, [e.target.name]: [e.target.value] });
	}

	const submitHandler = e => {
		history.push("/application");
	}

	return (
		<div>
			<div className="login-view">

				<div className="row no-gutter bg-image">

					{/* <div className="col-6 d-none d-md-flex"></div> */}

					<div className="col-12 login-container">
						<div className="login div-wrapper d-flex justify-content-center align-items-center">

							<div className="logincard">
								<h2 className="logintext mb-3">Login</h2>
								<form onSubmit={submitHandler} autoComplete="off">
									<small className="inputheader">
										Username
										<img
											src={infoIcon}
											className="info-icon-style login-icon-style cursor-pointer"
											alt='Username'
											title={infoData.login.username}
											data-bs-toggle="tooltip" data-bs-placement="top"
										/>
									</small>
									<div className="row mb-3">
										<div className="form-group col-md-12 input-cls">
											<input type="text" name="username" value={username} onChange={changeHandler} className={errorHighlight ? 'form-control usernameWarning' : 'form-control'} placeholder="Enter your username" />
											<img className="icon-cls" src={EmailLogo} alt="image not found" />
										</div>

										{Object.keys(userNameError).map((key) => {
											return <span className='errortext col-md-12'>{userNameError[key]}</span>
										})}
									</div>

									<small className="inputheader">
										Password
										<img src={infoIcon} className="info-icon-style login-icon-style cursor-pointer" alt='Password' title={infoData.login.password}
											data-bs-toggle="tooltip" data-bs-placement="top"
										/>
									</small>

									<div className="row  mb-3">
										<div className="form-group col-md-12 input-cls">
											<input type="password" name="password" value={password} onChange={changeHandler} className="form-control" placeholder="Enter your password" />

											<img className="icon-cls" src={PasswordLogo} alt="image not found" />
										</div>
									</div>

									<span className="mt-1 forgot-cls opacity-50">
										{/* <a className="forgot-cls disabled" disabled>Forgot Password?</a> */}
										Forgot Password?
									</span>

									<div className="row">
										<div className="form-group col-md-12">
											<button
												type="submit"
												className="btn btn-primary login-btn mt-1"
												disabled={!data.username[0] || !data.password[0]}
											>
												<span>Login</span>
											</button>

										</div>

									</div>

									<br />

								</form>

							</div>

						</div>
					</div>

				</div>
			</div>
		</div>

	);

}

export default Login;
