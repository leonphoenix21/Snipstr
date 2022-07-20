import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink, useHistory } from 'react-router-dom';
import { BsDot } from 'react-icons/bs'
import './LoginForm.css'

function LoginFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/home" />
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

    const signup = () => {
        history.push('/signup')
    }

    return (
        <div className='loginBody'>
            <div className="form">
                <form onSubmit={handleSubmit} id='logInForm'>
                    <div className='loginLogoDots' >
                        <BsDot className='redDot' />
                        <BsDot className='blueDot' />
                    </div>
                    <div className='errors'>
                        {errors.map((error, ind) => (
                            <div key={ind} className='eachError'>{error}</div>
                        ))}
                    </div>
                    <h6 id='title'>Log In to Snipstr</h6>
                    <br />
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
                    <br />

                    <button type="submit" id='loginBtn'>Sign In</button>
                    <div className='oRSpan'>OR</div>
                    <button
                        type="submit"
                        id='demoUserBtn'
                        onClick={(e) => (
                            setPassword('password'),
                            setCredential('Demo-lition')
                        )}>

                        Demo User
                    </button>
                    <div className='redirectsignin'>
                        Not a Snipstr member? <span className='linkmember' onClick={signup}> Sign up here</span>
                    </div>
                    <br />


                </form >
            </div>
        </div>

    );
}

export default LoginFormPage;