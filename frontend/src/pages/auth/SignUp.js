import { Form } from "react-router-dom";
import { createContext, useContext, useState, useRef  } from "react";
import api from "../../API";
import { passwordRegex, usernameRegex, emailRegex } from "../../utils/regex";

const SignUp = () => {

    const [passwordError, setPasswordError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const usernameValidation = async (username) => {
        try {
            const res = await fetch('http://localhost:8000/auth/reg-data/' + username);
            if (res.ok) {
                const data = await res.json();
                setUsernameError(!data.available);
            } else {
                setUsernameError(true);
            }
        } catch (error) {
            setUsernameError(true);
            console.error('Error checking username:', error);
        }
    }

    const handlePasswordInput = (value) => {
        if (value !== '') {
            const isValidPassowrd = passwordRegex.test(value);
            setPasswordError(!isValidPassowrd);
        } else {
            setPasswordError(null);
        }
    }

    const handleUsernameInput = (value) => {
        if (value !== '') {
            const isValidUsername = usernameRegex.test(value);
            if (isValidUsername) {
                usernameValidation(value);
            } else {
                setUsernameError(true);
            }
        } else {
            setUsernameError(null);
        }
    }

    const handleEmailInput = (value) => {
        if (value !== '') {
            const isValidEmail = emailRegex.test(value);
            setEmailError(!isValidEmail);
        } else {
            setEmailError(null);
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        if (!passwordError && !emailError && !usernameError) {
            try {
                const res = await api.post('http://localhost:8000/auth/register',
                {
                    "email": email,
                    "password": password,
                    "is_active": true,
                    "is_superuser": false,
                    "is_verified": false,
                    "username": username,
                    "role": null
                })
                console.log(res);
            } catch {error} {}
        } else {
            console.log('dinahu')
        }
    };

    return ( 
            <div className="signup-container">
                <h1>create an account</h1>
                <Form className="signup-form" onSubmit={submitForm}>
                    <div className={`reginput-container ${emailError === true ? 'error' : (emailError === false ? 'success' : '')}`}>
                        <input type="email" name="email" maxLength={50} placeholder="email" onChange={(e) => handleEmailInput(e.target.value)} required/>
                        <i className="fa-regular fa-square-check"></i>
                    </div>
                    <div className={`reginput-container ${usernameError === true ? 'error' : (usernameError === false ? 'success' : '')}`}>
                        <input type="text" name="username" maxLength={20} placeholder="username" onChange={(e) => handleUsernameInput(e.target.value)} required/>
                        <i className="fa-regular fa-square-check"></i>
                    </div>
                    <div className={`reginput-container ${passwordError === true ? 'error' : (passwordError === false ? 'success' : '')}`}>
                        <input type="password" name="password" maxLength={25} placeholder="password" onChange={(e) => handlePasswordInput(e.target.value)} required/>
                        <i className="fa-regular fa-square-check"></i>
                    </div>
                    <button type="submit">accept</button>
                </Form>
            </div>
     );
}

export default SignUp;