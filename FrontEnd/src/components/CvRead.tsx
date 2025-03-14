import { useState } from "react";
import "pdfjs-dist/build/pdf";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Set the worker source for pdf.js
GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const PdfUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdf = await getDocument(URL.createObjectURL(file)).promise;
    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      text += textContent.items.map((item) => (item as any).str).join(" ") + " ";
    }

    return text;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const extractedText = await extractTextFromPDF(file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/cv/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("sessionData") || '""')?.token
        },
        body: JSON.stringify({ pdfText: extractedText })
      });

      const result = await response.json();
      console.log(result);
      alert(JSON.stringify(result));
    } catch (error) {
      console.error("Error:", error);
      alert("File upload failed.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        <button type="submit">Upload PDF</button>
      </form>
    </div>
  );
};

export default PdfUploader;
