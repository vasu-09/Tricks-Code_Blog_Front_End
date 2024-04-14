import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

const RichTextEditor = ({ initialValue, onContentChange }) => {
  
  const handleEditorChange = (content, editor) => {
    onContentChange(null, content);
    
};
  
  const handleImageUpload = (blobInfo) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());
     
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      axios.post("https://tricks-codesblogbackend.up.railway.app/upload/image", formData, {
        ...config,
        responseType: 'json'
      })
      .then(response => {
        if (response && response.data) {
          const imageData = response.data;
          const imageUrl = imageData.src;
          resolve(imageUrl);
        } else {
          reject("Image upload failed");
        }
      })
      .catch(error => {
        reject("Image upload failed");
      });
    });
  };
  
  const API_KEY = process.env.REACT_APP_TINY_MCE_API_KEY;

  return (
    <Editor
      apiKey={API_KEY}      
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "image",
          "codesample",
          "link",
          "emoticons",
          "quickbars",
          "insertdatetime",
          "save"
        ],
        toolbar:
         'undo redo | blocks fontfamily fontsize | '+
          'bold italic forecolor image table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | alignleft aligncenter ' +
         'alignright alignjustify align lineheight | save insertdatetime emoticons link codesample media searchreplace bullist numlist outdent indent visualblocks preview | ' +
        'removeformat | help| code charmap fullscreen ',images_upload_handler: handleImageUpload,
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup: (editor) => {
            editor.on('change', () => {
                handleEditorChange(editor.getContent(), editor); // Pass both content and editor object
      });
    }}}
    
    />
  );
};

export default RichTextEditor;
