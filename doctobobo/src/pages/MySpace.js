import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/my_space.css'; // Make sure to import the CSS stylesheet

function MySpace() {
    const [userData, setUserData] = useState({
        lastName: '',
        firstName: '',
        birthdate: '',
        email: '',
        address: '',
        postalCode: '',
        specialty: '',
        description: '',
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleEdit = () => {
        setEditMode(true);
    };

    const fetchUserData = async () => {
        try {
            // Update the URL to include the correct port number
            const response = await axios.get('http://localhost:4000/api/user-data');
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            // Update the URL to include the correct port number
            await axios.post('http://localhost:4000/api/update-user-info', userData);
            setEditMode(false);
            // Optionally, you can refetch the user data here
        } catch (error) {
            console.error('Failed to update user data:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="my-space">
            {!editMode ? (
                <div className="personal-info">
                    <h1>Mes données personnelles :</h1>
                    <p>Nom: {userData.lastName}</p>
                    <p>Prénom: {userData.firstName}</p>
                    <p>Date de naissance: {userData.birthdate}</p>
                    <p>Email: {userData.email}</p>
                    <p>Adresse: {userData.address}</p>
                    <p>Code postal: {userData.postalCode}</p>
                    {userData.specialty && <p>Spécialité: {userData.specialty}</p>}
                    {userData.description && <p>Description: {userData.description}</p>}
                    <button onClick={handleEdit}>Modifier mes informations</button>
                </div>
            ) : (
                <div className="edit-form">
                    <h1>Modifier mes informations :</h1>
                    <form onSubmit={handleSave}>
                        <input type="text" name="lastName" placeholder="Nom" value={userData.lastName} onChange={handleChange} />
                        <input type="text" name="firstName" placeholder="Prénom" value={userData.firstName} onChange={handleChange} />
                        <input type="date" name="birthdate" placeholder="Date de naissance" value={userData.birthdate} onChange={handleChange} />
                        <input type="text" name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
                        <input type="text" name="address" placeholder="Adresse" value={userData.address} onChange={handleChange} />
                        <input type="text" name="postalCode" placeholder="Code postal" value={userData.postalCode} onChange={handleChange} />
                        <input type="text" name="specialty" placeholder="Spécialité" value={userData.specialty} onChange={handleChange} />
                        <input type="text" name="description" placeholder="Description" value={userData.description} onChange={handleChange} />
                        <button type="submit">Enregistrer</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default MySpace;
