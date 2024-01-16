import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import BookHtmlPreview from './BookHtmlPreview'; // Import your HTML preview component

const BookPreviewModal = ({ bookData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Preview Book
      </Button>
      <Modal
        title="Book Preview"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <BookHtmlPreview bookData={bookData} />
      </Modal>
    </>
  );
};

export default BookPreviewModal;
