import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AIQuilEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);

  // Function to handle image uploads
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      // Call function to upload the image, and get the URL
      const imageUrl = await uploadImage(file);
      // Insert image URL into the editor
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'image', imageUrl);
    };
  };

  // Replace this function with the actual image upload logic
  const uploadImage = (file) => {
    return new Promise((resolve) => {
      // Example URL, replace with actual upload logic
      setTimeout(() => resolve(URL.createObjectURL(file)), 1000);
    });
  };

  // Custom toolbar modules
  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        'image': imageHandler
      }
    }
  };

  return (
    <ReactQuill 
      ref={quillRef}
      value={editorHtml} 
      onChange={setEditorHtml}
      modules={modules}
    />
  );
};

export default AIQuilEditor;
