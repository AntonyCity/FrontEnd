import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

    interface Offer {
    id: number;
    title: string;
    location: string;
    content: string;
    requirements: string;
    salary: string;
    contractType: string;
    tags?: string;
    }

interface FormData {
    title: string;
    location: string;
    content: string;
    requirements: string;
    salary: string;
    contractType: string;
    tags: string;
}

const Offres: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [formData, setFormData] = useState<FormData>({
    title: '',
    location: '',
    content: '',
    requirements: '',
    salary: '',
    contractType: '',
    tags: '',
    });

    const token = JSON.parse(sessionStorage.getItem('sessionData') || '""');

    useEffect(() => {
    fetchOffers();
    }, []);

    const fetchOffers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/offre/display`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.token}`
        }
        });
        const data: Offer[] = await response.json();
        setOffers(data.offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
    }
};

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value,
    }));
    };

    const handleAddOffer = async (e: FormEvent) => {
    e.preventDefault();
    const data = { ...formData };
    try {
        await fetch(`${import.meta.env.VITE_API_URL}/offre/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.token}`
        },
        body: JSON.stringify(data)
        });
      // Reset the form
        setFormData({
        title: '',
        location: '',
        content: '',
        requirements: '',
        salary: '',
        contractType: '',
        tags: '',
        });
        fetchOffers();
    } catch (error) {
        console.error('Error adding offer:', error);
    }
    };

    const handleEditOffer = async (id: number) => {
    const newTitle = prompt('Enter new Job Title:');
    const newLocation = prompt('Enter new Localisation:');
    const newContent = prompt('Enter new Description:');
    const newRequirements = prompt('Enter new Requis:');
    const newSalary = prompt('Enter new Salaire moyen:');
    const newContractType = prompt('Enter new Type de contract:');
    const newTags = prompt('Enter new Tags (optional):');
    
    if (
        newTitle &&
        newLocation &&
        newContent &&
        newRequirements &&
        newSalary &&
        newContractType
    ) {
        try {
        await fetch(`${import.meta.env.VITE_API_URL}/offre/update`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.token}`
            },
            body: JSON.stringify({
            id,
            title: newTitle,
            location: newLocation,
            content: newContent,
            requirements: newRequirements,
            salary: newSalary,
            contractType: newContractType,
            tags: newTags
            })
        });
        fetchOffers();
        } catch (error) {
        console.error('Error updating offer:', error);
        }
    }
    };

    const handleDeleteOffer = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
        try {
        await fetch(`${import.meta.env.VITE_API_URL}/offre/delete`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.token}`
            },
            body: JSON.stringify({ id })
        });
        fetchOffers();
        } catch (error) {
        console.error('Error deleting offer:', error);
        }
    }
};
console.log("API URL:", import.meta.env.VITE_API_URL);


    return (
    <div className="offers-container">
        <h1 className="title">Créer une annonce</h1>
        
        <form onSubmit={handleAddOffer} className="offer-form">
            <div className="form-group">
            <label>Job Title:</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Localisation:</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Description:</label>
            <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Requis:</label>
            <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Salaire moyen:</label>
            <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Type de contract:</label>
            <input
                type="text"
                name="contractType"
                value={formData.contractType}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Tags:</label>
            <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
            />
            </div>
            <div className="button-group">
            <button type="reset" className="clear-btn">Clear Form</button>
            <button type="submit" className="submit-btn">Publier l'annonce</button>
            </div>
        </form>
        
        <h2 className="offers-title">Annonces</h2>
        <table className="offers-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Localisation</th>
                <th>Description</th>
                <th>Requis</th>
                <th>Salaire moyen</th>
                <th>Type de contract</th>
                <th>Tags</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {offers ? (
                offers.map((offer) => (
                <tr key={offer.id}>
                    <td>{offer.id}</td>
                    <td>{offer.title}</td>
                    <td>{offer.location}</td>
                    <td>{offer.content}</td>
                    <td>{offer.requirements}</td>
                    <td>{offer.salary}</td>
                    <td>{offer.contractType}</td>
                    <td>{offer.tags || ''}</td>
                    <td>
                    <button onClick={() => handleEditOffer(offer.id)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteOffer(offer.id)} className="delete-btn">Delete</button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={9}>No offers available</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

export default Offres;
