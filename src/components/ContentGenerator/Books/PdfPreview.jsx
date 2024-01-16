import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Document as PdfViewer, Page as PdfViewerPage } from 'react-pdf';
import { Modal, Button } from 'antd';
import BookPdfDocument from './BookPdfDocument';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const PdfPreview = ({ bookData }) => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    
    const document = (
      <BookPdfDocument bookData={bookData} />
    );

    pdf(document).toBlob().then(setPdfBlob);
  }, [bookData]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDownloadPdf = () => {
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = "download.pdf";
    link.click();
    URL.revokeObjectURL(blobUrl);
  };

  if (!pdfBlob) {
    return <div>Loading preview...</div>;
  }

  return (
    <div>
    
        <PdfViewer file={pdfBlob}>
          <PdfViewerPage pageNumber={1} />
        </PdfViewer>
    
      <Button onClick={handleDownloadPdf}>Download PDF</Button>
    </div>
  );
};

export default PdfPreview;
