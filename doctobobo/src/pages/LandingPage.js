import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/landing_page.css';
import Menu from './Menu';

function LandingPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        nom: '',
        specialite: '',
        lieu: '',
    });

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:4000/api/logout');
            console.log('Logged out successfully');
            navigate('/connection'); // Corrected navigation method
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const query = new URLSearchParams(searchParams).toString();
        try {
            const response = await axios.get(`http://localhost:4000/api/search-doctor?${query}`);
            console.log(response.data);
            navigate('/result', { state: { searchResults: response.data } }); 
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value,
        }));
    };

    return (
        <div>
            <Menu handleLogout={handleLogout} />
            <div className="recherche_docteur">
                <h1>Je cherche un docteur</h1>
                <form onSubmit={handleSearch}>
                    <div><input type="text" id="nom" name="nom" placeholder="Nom du docteur" value={searchParams.nom} onChange={handleChange} /></div>
                    <div><input type="text" id="specialite" name="specialite" placeholder="Spécialité" value={searchParams.specialite} onChange={handleChange} /></div>
                    <div><input type="text" id="lieu" name="lieu" placeholder="Code postal" value={searchParams.lieu} onChange={handleChange} /></div>
                    <div><button type="submit">Rechercher</button></div>
                </form>
                <img src="./docteur.jpg" alt="Hello je suis la" />
            </div>
        </div>
    );
}

export default LandingPage;
