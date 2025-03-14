import React, { useState, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import '../style/CvAnalyse.css';
// Removed CvReader component as per instructions

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

interface CV {
name: string;
summary: string;
tags: string;
phone: string;
email: string;
}

function CvAnalyse() {
const [file, setFile] = useState<File | null>(null);
const [message, setMessage] = useState('');
const [isError, setIsError] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [cvList, setCvList] = useState<CV[]>([]);
const [isLoadingCvs, setIsLoadingCvs] = useState(false);

// Fetch the CV list on mount using the API
useEffect(() => {
    fetchCvList();
}, []);

const fetchCvList = async () => {
    setIsLoadingCvs(true);
    try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cv/show`, {
        headers: {
        'Content-Type': 'application/json',
        Authorization:
            'Bearer ' +
            JSON.parse(sessionStorage.getItem('sessionData') || '""')?.token,
        },
    });
    if (!response.ok) {
        throw new Error('Error fetching CV list');
    }
    const data = await response.json();
    console.log('CV list:', data.allCandidate);
    setCvList(data.allCandidate);
    } catch (error) {
    console.error('Error fetching CV list:', error);
    setMessage('Error fetching CV list.');
    setIsError(true);
    }
    setIsLoadingCvs(false);
};

const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdf = await getDocument(URL.createObjectURL(file)).promise;
    let text = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    text += textContent.items.map((item: any) => item.str).join(' ') + ' ';
    }
    return text;
};

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
    setMessage('Please select a file.');
    setIsError(true);
    return;
    }

    setIsLoading(true);
    setMessage('');

    try {
    const extractedText = await extractTextFromPDF(file);
    console.log('Extracted text:', extractedText);

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cv/upload`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization:'Bearer ' + JSON.parse(sessionStorage.getItem('sessionData') || '""')?.token,
        },
        body: JSON.stringify({ pdfText: extractedText }),
        }
    );

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    const result = await response.json();
    console.log(result);
    alert('CV analysé et ajouté avec succès!');

    // Refresh the CV list after successful upload
    fetchCvList();
    } catch (error) {
    console.error('Error uploading file:', error);
    setMessage('Analyse du CV échouée.');
    setIsError(true);
    }
    setIsLoading(false);
};

return (
    <main className="CvAnalyse">
    <h1>Banque de CV</h1>
    {/* CvReader component removed as per instructions */}
    <div className="upload-container">
        <h2>Ajoutez un CV pour analyse</h2>
        <p>
        Envoyez un CV afin qu'il soit analysé par une intelligence artificielle.
        Il sera résumé et ajouté à la base de données pour faciliter la
        consultation et la sélection des candidats.
        </p>
        <form onSubmit={handleSubmit}>
        <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
            {isLoading ? (
            <div className="loader-container">
                <div className="loader"></div>
                <span>Analyse du CV...</span>
            </div>
            ) : (
            'Upload PDF'
            )}
        </button>
        </form>
        {message && <p className={isError ? 'error' : 'success'}>{message}</p>}
    </div>
    <div className="cv-list-container">
        <h2>Tous les CVs</h2>
        {isLoadingCvs ? (
        <div className="loader-container">
            <div className="loader"></div>
            <span>Chargement des CVs...</span>
        </div>
        ) : cvList.length > 0 ? (
        <div className="cv-grid">
            {cvList.map((cv, index) => (
            <div key={index} className="cv-card">
                <h3>{cv.name}</h3>
                <p className="cv-summary">{cv.summary}</p>
                <div className="cv-tags">
                {cv.tags.split(',').map((tag, tagIndex) => (
                    <span key={tagIndex} className="cv-tag">
                    {tag.trim()}
                    </span>
                ))}
                </div>
                <div className="cv-contact">
                <p>
                    <strong>Email:</strong> {cv.email}
                </p>
                <p>
                    <strong>Téléphone:</strong> {cv.phone}
                </p>
                </div>
            </div>
            ))}
        </div>
        ) : (
        <p>Aucun CV disponible pour le moment.</p>
        )}
    </div>
    </main>
);
}

export default CvAnalyse;
