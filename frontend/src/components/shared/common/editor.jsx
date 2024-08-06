import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = useRef(null);

  const handleChange = html => {
    setEditorHtml(html);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      // Replace the URL below with your image upload endpoint
      const response = await fetch("https://example.com/upload-image", {
        method: "POST",
        body: formData,
      });

      const imageUrl = await response.json();

      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, "image", imageUrl);
    };
  };
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  );
};

export default MyEditor;
