import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/connection.css'; // Ensure you have imported the CSS correctly

function Connection() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/login', {
              email,
              password,
              userType
            });

            if (response.data.success) {
                // Assuming the API response contains a success flag and possibly a token or user type
                localStorage.setItem('userType', userType);
                // Adjust as needed, consider using React Router for navigation
                window.location.href = '/my_space';
            } else {
                setErrorMessage('Invalid email or password. Please try again or sign up.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login. Please try again.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/inscription');
    };

    return (
        <div className="connection_compte">
            <h1>J'ai un compte Doctobobo</h1>
            <form onSubmit={handleLogin}>
                <div className="radio-group">
                    <label>
                        <input type="radio" name="titre" value="docteur" onChange={() => setUserType('docteur')} /> Docteur
                    </label>
                    <label>
                        <input type="radio" name="titre" value="patient" onChange={() => setUserType('patient')} /> Patient
                    </label>
                </div>

                <div>
                    <label htmlFor="email">Votre adresse email :</label>
                    <input type="text" id="email" name="email" placeholder="monadresse@mail.fr" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Votre mot de passe :</label>
                    <input type="password" id="pwd" name="pwd" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <button type="submit">Se connecter</button>
                </div>
                {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
            </form>

            <div className="retour_inscription">
                <h1>Nouveau sur Doctobobo ?</h1>
                <button onClick={handleRegisterRedirect}>S'inscrire</button>
            </div>
        </div>
    );
}

export default Connection;
