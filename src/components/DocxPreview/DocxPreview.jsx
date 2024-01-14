import React, { useState } from 'react';

const DocxPreview = ({ bookData }) => {
  const [htmlPreview, setHtmlPreview] = useState("");

  const handlePreview = async () => {
    try {
      const docxBuffer = await createDocx(bookData);
      const html = await convertToHtml(docxBuffer);
      setHtmlPreview(html);
    } catch (error) {
        notification.error("Error creating preview:", error);
    }
  };

  return (
    <div>
      <button onClick={handlePreview}>Generate Preview</button>
      <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
    </div>
  );
};

export default DocxPreview;
