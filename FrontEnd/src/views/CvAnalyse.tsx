import React, { useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import '../style/CvAnalyse.css';

// Configure workerSrc
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

function CvAnalyse() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

            const response = await fetch('http://localhost:8003/cv/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pdfText: extractedText,
                }),
            });

            const result = await response.json();
            setMessage(result.message || 'File uploaded successfully.');
            setIsError(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('File upload failed.');
            setIsError(true);
        } finally {
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
            <div>
            <h2>Tous les CVs</h2>
            </div>
        </main>
    );
}

export default CvAnalyse;