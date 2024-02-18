import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';


const axiosInstance = axios.create();

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Do not log the response here, just return it
    return response;
  },
  error => {
    // Do not log the error here, just return it
    return Promise.reject(error);
  }
);


const RichTextEditor = ({ initialValue, onContentChange,  }) => {
  
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
  
      axios.post("http://localhost:8080/upload/image", formData, {
        ...config,
        responseType: 'json' // Add this option to disable logging
      })
      .then(response => {
        if (response && response.data) {
          const imageData = response.data;
          const imageUrl = imageData.src; // Adjust this based on your API response structure
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
  
      

  return (
    <Editor
      apiKey='uvwxgj5y4tjnwymogl2gbguh5w9s2up4gm212s9xjy14soy2'
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
          'undo redo | blocks | '+
          'bold italic forecolor image table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | alignleft aligncenter ' +
          'alignright alignjustify | save insertdatetime emoticons link codesample media searchreplace bullist numlist outdent indent visualblocks preview | ' +
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