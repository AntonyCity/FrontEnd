import React, { useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist/types/pdf';
import '../style/CvAnalyse.css';

// Configure workerSrc
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

function CvAnalyse() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const extractTextFromPDF = async (file: File) => {
    try {
      const pdf: PDFDocumentProxy = await getDocument(URL.createObjectURL(file)).promise;
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
      alert('Please select a file.');
      return;
    }

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
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('File upload failed.');
    }
  };

  return (
    <main className="CvAnalyse">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <button type="submit">Upload PDF</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}

export default CvAnalyse;
