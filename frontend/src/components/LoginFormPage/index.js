import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const demoUserSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form onSubmit={handleSubmit} id='logInForm'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <h1 id='title'>Log In</h1>
            <input
                placeholder='username/email'
                id='username'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
            />
            <input
                placeholder=' password'
                id='password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" id='loginBtn'>Log In</button>
            <p>
                <NavLink to="/signup" >Don't have an account</NavLink>
            </p>

            <button
                type="submit"
                id='demoUserBtn'
                onClick={(e) => (
                    setPassword('password'),
                    setCredential('Demo-lition')
                )}>

                Demo User
            </button>
        </form >
    );
}

export default LoginFormPage;