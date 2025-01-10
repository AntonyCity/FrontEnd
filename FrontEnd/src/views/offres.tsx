import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Offer {
    id: number;
    title: string;
    content: string;
    tags?: string;
}

interface FormData {
    title: string;
    content: string;
    tags: string;
}

const Offres: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        tags: '',
    });
    
    const token = JSON.parse(sessionStorage.getItem('sessionData') || '""');
    console.log(token.token)
    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
      const response = await fetch('http://localhost:8003/offre/display', {
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token?.token}` 
        }
    });
        const data: Offer[] = await response.json();
        setOffers(data);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddOffer = async (e: FormEvent) => {
        e.preventDefault();
        const data = { ...formData};

        await fetch('http://localhost:8003/offre/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token?.token}` 

            },
            body: JSON.stringify(data)
        });

        setFormData({ title: '', content: '', tags: '' });
        fetchOffers();
    };

    const handleEditOffer = async (id: number) => {
        const newTitle = prompt('Enter new title:');
        const newContent = prompt('Enter new content:');
        const newTags = prompt('Enter new tags (optional):');
        const newPublished = prompt('Enter new published date (YYYY-MM-DDTHH:mm):');

        if (newTitle && newContent && newPublished) {
            await fetch('http://localhost:8003/offre/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token?.token}` 

                },
                body: JSON.stringify({
                    id,
                    title: newTitle,
                    content: newContent,
                    tags: newTags,
                    published: new Date(newPublished).toISOString()
                })
            });

            fetchOffers();
        }
    };

    const handleDeleteOffer = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this offer?')) {
            await fetch('http://localhost:8003/offre/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token?.token}`   
                  },
                body: JSON.stringify({ id })
            });

            fetchOffers();
        }
    };

    return (
        <div>
            <h1>Manage Offers</h1>

            <form onSubmit={handleAddOffer}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Tags:</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                    />
                </div>
                
                <button type="submit">Add Offer</button>
            </form>

            <h2>Offers</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {offers?.length > 0 ? (
                        offers.map((offer) => (
                            <tr key={offer.id}>
                                <td>{offer.id}</td>
                                <td>{offer.title}</td>
                                <td>{offer.content}</td>
                                <td>{offer.tags || ''}</td>
                                <td>
                                    <button onClick={() => handleEditOffer(offer.id)}>Edit</button>
                                    <button onClick={() => handleDeleteOffer(offer.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No offers available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Offres;
