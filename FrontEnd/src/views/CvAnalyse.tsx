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
        "fullname": "jhon doe",
        "summary": "Médicament homéopathique traditionnellement utilisé dans le traitement des symptômes des états grippaux",
        "tags": "tag1, tag2, tag3",
        "phone": "06050403", 
        "email": "jhon.doe@gmail.com"
    },
    {
        "fullname": "vicktor re",
        "summary": "Médicament homéopathique traditionnellement utilisé dans le traitement des symptômes des états grippaux",
        "tags": "tag1, tag2, tag3",
        "phone": "06050403", 
        "email": "vicktor.re@gmail.com"
    },
    {
        "fullname": "ter jui",
        "summary": "Médicament homéopathique traditionnellement utilisé dans le traitement des symptômes des états grippaux",
        "tags": "tag1, tag2, tag3",
        "phone": "06050403", 
        "email": "ter.jui@gmail.com"
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
                    summary: "Nouveau CV analysé automatiquement. Profil professionnel avec expérience dans le développement web.",
                    tags: "développement, web, javascript",
                    phone: "07" + Math.floor(Math.random() * 90000000 + 10000000), 
                    email: file.name.replace('.pdf', '').toLowerCase().replace(' ', '.') + "@example.com"
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