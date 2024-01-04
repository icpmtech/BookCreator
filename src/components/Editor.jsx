import React, { useRef, useEffect, memo } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../tools/tools';

const Editor = ({ data, onChange, editorblock }) => {
  const editorRef = useRef();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: editorblock,
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
            const data = await api.saver.save();
            onChange(data);
          },
      });
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data, editorblock]);

  const addTextBlock = async (text) => {
    if (editorRef.current) {
      try {
        await editorRef.current.blocks.insert("paragraph", { text: text }, {}, undefined, true);
      } catch (error) {
        console.error('Error adding text block:', error);
      }
    }
  };

  return (
    <div>
      <div id={editorblock} />
      <button onClick={() => addTextBlock("Your text here")}>Add Text Block</button>
    </div>
  );
};

export default memo(Editor);


