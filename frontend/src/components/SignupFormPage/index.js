import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
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

    return (
        <form onSubmit={handleSubmit} id="signUpForm">
            <ul >
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <h1 id='title'>Sign Up</h1>
            <input
                placeholder="email"
                id='emailSignUpLabel'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                placeholder="username"
                id='usernameSignUpLabel'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <input
                id='passwordSignUpLabel'
                placeholder='password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <input
                placeholder="confirm password"
                id='confirmPasswordSignUpLabel'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <button type="submit" id='submitSignUpBtn'>Sign Up</button>

            <p>
                <NavLink to="/login" >Already have an account</NavLink>
            </p>
        </form>
    );
}

export default SignupFormPage;