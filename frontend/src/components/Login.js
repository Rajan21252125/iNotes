import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({showAlert}) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [ loader , setLoader ] = useState(false);
    const [show,setShow] = useState(false);
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        try {
            const response = await fetch('https://inotes-i3zr.onrender.com/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json);
            setLoader(false)
            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.token);
                navigate('/');
                showAlert('Logged in successfully', 'success');
            } else {
                showAlert(json.error, 'danger');
            }
        } catch (error) {
            showAlert("internal server error we will back soon ...", 'danger')
        }
    };

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const toggleShow = () => {
        setShow(!show);
    }

    return (
        <div className="container my-4">
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={handleOnChange}
                        name="email"
                        value={credentials.email}
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type={show ? "text" : "password"}
                        className="form-control"
                        id="password"
                        onChange={handleOnChange}
                        name="password"
                        value={credentials.password}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={toggleShow}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Show Password
                    </label>
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    {loader ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
