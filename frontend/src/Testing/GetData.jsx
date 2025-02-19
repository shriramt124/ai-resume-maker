import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import html2pdf from 'html2pdf.js';

const GetData = () => {
  const [content, setContent] = useState('<h2>My Resume</h2><p>Visit my website: <a href="https://example.com">example.com</a></p>');

  const handleDownloadPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = content; // Get the Quill editor content

    html2pdf()
      .set({
        margin: 10,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  return (
    <div>
      <ReactQuill value={content} onChange={setContent} theme="snow" />
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default GetData;
