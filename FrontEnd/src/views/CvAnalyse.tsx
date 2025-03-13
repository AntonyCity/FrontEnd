import React, { useState, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import '../style/CvAnalyse.css';


GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

interface CV {
    fullname: string;
    summary: string;
    tags: string;
    phone: string;
    email: string;
}


// FAKE DATA TO DELETE
const mockCvData: CV[] = [
    {
        "fullname": "Gilles Legros",
        "summary": "Développeur web et UX/UI designer avec 5 ans d'expérience. Je suis à la recherche d'un CDI dans une entreprise dynamique et innovante.",
        "tags": "Développeur, UX/UI designer, CDI",
        "phone": "0691828302", 
        "email": "gill-legros@gmail.com"
    },
    {
        "fullname": "Jeremy Léonard",
        "summary": "Développeur web full-stack avec 3 ans d'expérience. Je suis passionné par les nouvelles technologies et je suis à la recherche de nouveaux défis.",
        "tags": "Développeur, web, full-stack",
        "phone": "0683028234", 
        "email": "jeremyleonard@gmail.com"
    },
    {
        "fullname": "Alice Dordon",
        "summary": "Développeuse web junior avec 1 an d'expérience. Je suis à la recherche d'un stage de fin d'études pour valider mon diplôme.",
        "tags": "Développeur, web, junior",
        "phone": "0718374993", 
        "email": "dordonalice@gmail.com"
    }
];

function CvAnalyse() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cvList, setCvList] = useState<CV[]>([]);
    const [isLoadingCvs, setIsLoadingCvs] = useState(false);

    // DATA SIMULATION-------
    useEffect(() => {
        fetchCvList();
    }, []);

    const fetchCvList = async () => {
        setIsLoadingCvs(true);
        
        setTimeout(() => {
            setCvList(mockCvData);
            setIsLoadingCvs(false);
        }, 800);
    };
    // DATA SIMULATION-------

    const extractTextFromPDF = async (file: File) => {
        try {
            const pdf = await getDocument(URL.createObjectURL(file)).promise;
            let text = '';

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                text += textContent.items.map((item: any) => item.str).join(' ') + ' ';
            }

            return text;
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
            throw error;
        }
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

            // DATA SIMULATION-------
            setTimeout(() => {
                const newCv: CV = {
                    fullname: file.name.replace('.pdf', ''),
                    summary: "Développeur web full-stack avec 1 ans d'expérience. Je suis passionné par les nouvelles technologies et je suis à la recherche d'un contrat en alternance pou un Master.",
                    tags: "Développeur web, Full-stack, Alternance",
                    phone: "0611688567", 
                    email: "renaudbrevin@gmail.com"
                };
                
                setCvList([newCv, ...cvList]);
                
                setMessage('CV analysé et ajouté avec succès!');
                setIsError(false);
                setIsLoading(false);
            }, 2000);
            // DATA SIMULATION-------
            
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Analyse du CV échouée.');
            setIsError(true);
            setIsLoading(false);
        }
    };

    return (
        <main className="CvAnalyse">
            <h1>Banque de CV</h1>
            <div className='upload-container'>
                <h2>Ajoutez un CV pour analyse</h2>
                <p>Envoyez un CV afin qu'il soit analysé par une intelligence artificielle. Il sera résumé et ajouté à la base de données pour faciliter la consultation et la sélection des candidats.</p>
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
                ) : (
                    cvList.length > 0 ? (
                        <div className="cv-grid">
                            {cvList.map((cv, index) => (
                                <div key={index} className="cv-card">
                                    <h3>{cv.fullname}</h3>
                                    <p className="cv-summary">{cv.summary}</p>
                                    <div className="cv-tags">
                                        {cv.tags.split(',').map((tag, tagIndex) => (
                                            <span key={tagIndex} className="cv-tag">{tag.trim()}</span>
                                        ))}
                                    </div>
                                    <div className="cv-contact">
                                        <p><strong>Email:</strong> {cv.email}</p>
                                        <p><strong>Téléphone:</strong> {cv.phone}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Aucun CV disponible pour le moment.</p>
                    )
                )}
            </div>
        </main>
    );
}

export default CvAnalyse;