// Dans /src/Components/ConsentForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConsentForm({ userId, userType }) {
    const [acceptedCgu, setAcceptedCgu] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiEndpoint = `/api/${userType}/${userId}/consent`;

    useEffect(() => {
        axios.get(apiEndpoint)
            .then(response => {
                setAcceptedCgu(response.data.acceptedCgu);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du statut de consentement', error);
                setLoading(false);
            });
    }, [userId, userType]);

    const handleConsent = (consent) => {
        axios.post(apiEndpoint, { acceptedCgu: consent })
            .then(() => {
                setAcceptedCgu(consent);
                alert('Votre choix a été enregistré.');
            })
            .catch(error => console.error('Erreur lors de la mise à jour du consentement', error));
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            {acceptedCgu !== null ? (
                <p>Vous avez déjà accepté les conditions.</p>
            ) : (
                <>
                    <p>Voulez-vous accepter les conditions générales d'utilisation ?</p>
                    <button onClick={() => handleConsent(true)}>Oui</button>
                    <button onClick={() => handleConsent(false)}>Non</button>
                </>
            )}
        </div>
    );
}

export default ConsentForm;
