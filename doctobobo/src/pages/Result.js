import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/result.css'; // Ensure the CSS file is correctly imported

function Result() {
    const [searchResults, setSearchResults] = useState([]);
    const [userType] = useState(localStorage.getItem('user_type') || '');

    useEffect(() => {
        fetchSearchResults();
    }, []);

    const fetchSearchResults = async () => {
        try {
            // Update the URL to include the correct port number
            const response = await axios.get('http://localhost:4000/api/search-results');
            setSearchResults(response.data || []);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    return (
        <div className="resultat">
            <h1>Résultats de la recherche :</h1>
            <div id="search-results">
                {searchResults.length === 0 ? (
                    <p>Aucun resultat.</p>
                ) : (
                    searchResults.map((doctor, index) => (
                        <div key={index}>
                            <hr />
                            <p><strong>Nom:</strong> {doctor.Nom_Medecin}</p>
                            <p><strong>Prenom:</strong> {doctor.Prenom_Medecin}</p>
                            <p><strong>Spécialité:</strong> {doctor.Specialite}</p>
                            {userType === 'patient' && (
                                <a href={`/book-appointment?id=${doctor.idMedecin}`} className="book-appointment-button">Prendre Rendez-vous</a>
                            )}
                            <br />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Result;
