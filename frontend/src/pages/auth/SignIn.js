import { Form } from "react-router-dom";
import { useState, useRef } from "react";
import api from "../../API";

const SignIn = () => {

    const [error, setError] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        if (!error) {
            try {
                const res = await api.get('http://localhost:8000/auth/login-data/' + username)
                const userData = res.data

                if (userData) {
                    bcrypt.compare(userData, password, (err, result) => {
                        if (err) {
                            console.log('Password comparison error', err);
                        } else {
                            if (result) {
                                console.log('Password correct');
                            } else {
                                console.log('Password incorrect');
                            }
                        }
                    });
                } else {
                    console.log('User not found');
                }

            } catch (error) {
                console.log('Error occured', error);
            }         
        }
    }

    return ( 
        <div className="signin-container">
            <h1>welcome back</h1>
                <Form method="get" className="signin-form" onSubmit={submitForm}>
                    <input type="text" name="username" maxLength={20} required placeholder="username"></input>
                    <input type="password" name="password" maxLength={25} required placeholder="password"></input>
                </Form>
            <button type="submit">continue</button>
        </div>
     );
}
 
export default SignIn;