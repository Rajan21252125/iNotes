import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({showAlert}) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
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
            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.token);
                navigate('/');
                showAlert('Logged in successfully', 'success');
            } else {
                showAlert(json.error, 'danger');
            }
        } catch (error) {
            
        }
    };

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const toggleShow = () => {
        var x = document.getElementById('password');
        if (x.type === 'password') {
            x.type = 'text';
        } else {
            x.type = 'password';
        }
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
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={handleOnChange}
                        name="password"
                        value={credentials.password}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1" onClick={toggleShow}>
                        Show Password
                    </label>
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}
