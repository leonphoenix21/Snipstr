import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import { BsDot } from 'react-icons/bs'
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);


    if (sessionUser) return <Redirect to="/" />;



    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const login = () => {
        history.push('/login')
    }

    return (
        <div className="signUpBody">
            <div className="form">
                <form onSubmit={handleSubmit} id="signupform">
                    <div className='signupLogoDots' >
                        <BsDot className='redDot' />
                        <BsDot className='blueDot' />
                    </div>
                    <div className='errors'>
                        {errors.map((error, ind) => (
                            <div key={ind} className='eachError'>{error}</div>
                        ))}
                    </div>
                    <h6 id='title-su'>Sign Up For Snipstr</h6>
                    <input
                        placeholder="email"
                        id='email-su'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        placeholder="username"
                        id='username-su'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        id='password-su'
                        placeholder='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        placeholder="confirm Password"
                        id='confirmPassword-su'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" id='signupbtn'>Sign Up</button>

                    <div className='termsPolicy '>
                        <span>By signing up, you agree with Flickr's<span className='tpcolor'> No Terms of Services </span> and  <span className='tpcolor'> No Privacy Policy </span>. </span>
                    </div>
                    <div className='redirectsignin'>
                        Already a Snipstr member? <span className='linkmember' onClick={login}> Log in here</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;