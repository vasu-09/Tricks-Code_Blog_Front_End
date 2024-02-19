
import axios from "axios";
import { getToken } from "./AuthService";

 // Get the authentication token from cookies

  

export const getarticlebyid = (id) => axios.get("https://tricks-codesblogbackend.up.railway.app/article/get/"+id);
export const getCategories = () => axios.get("https://tricks-codesblogbackend.up.railway.app/category/art/all");
export const getarticlebytitle = (title) => axios.get("https://tricks-codesblogbackend.up.railway.app/article/get/title"+title);
export const getCommentsByArticleId = (id) => axios.get("https://tricks-codesblogbackend.up.railway.app/comments/all/"+id);
export const getreplies = (id) => axios.get("https://tricks-codesblogbackend.up.railway.app/replies/get/"+id);
export const getallarticles = () => axios.get("https://tricks-codesblogbackend.up.railway.app/article/get");
export const getallusers = () => axios.get("https://tricks-codesblogbackend.up.railway.app/user/all");
export const getuserbyid = (id) => axios.get("https://tricks-codesblogbackend.up.railway.app/user/get/"+id);
export const getAbout = () => axios.get("https://tricks-codesblogbackend.up.railway.app/about");
export const postCategories = (category) => {
    const token = getToken(); 
    
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          "Content-Type": "application/json",  // Set the content type
        },
      };
    axios.post("https://tricks-codesblogbackend.up.railway.app/category/add", category, config);
}
export const postcomment = (id, comment) => {
  const token = getToken(); 
  
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          "Content-Type": "application/json",  // Set the content type
        },
      };
  axios.post("https://tricks-codesblogbackend.up.railway.app/comments/add/"+id, comment, config);}
  
export const postdata = (id, post) => {
  const token = getToken(); 
  
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          'Content-Type': 'multipart/form-data',  // Set the content type
        },
      };
      axios.post("https://tricks-codesblogbackend.up.railway.app/article/post/"+id, post, config);}

export const updateComment = (id, comment) =>{
  const config = {
        
    headers: {// Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.post("https://tricks-codesblogbackend.up.railway.app/comments/put/"+id, comment, config);
}

export const deleteComment = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.delete("https://tricks-codesblogbackend.up.railway.app/comments/delete/"+id, config);
}

export const updateAbout = (about) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
  axios.put("https://tricks-codesblogbackend.up.railway.app/update/about", about, config);
}

export const updateArticle = (id, post) =>{

    const token = getToken(); 
      const config = {
          
          headers: {
            Authorization: `${token}`,  // Include the token in the Authorization header
            'Content-Type': 'multipart/form-data',  // Set the content type
          },
        };
        axios.put("https://tricks-codesblogbackend.up.railway.app/article/put/"+id, post, config);
}

export const deletearticle = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
  axios.delete("https://tricks-codesblogbackend.up.railway.app/article/delete/"+id, config);
}

export const replycomment = (id, comment) =>{
  const token = getToken()
  const config = {  
    headers: {
      Authorization: `${token}`,        
      "Content-Type": "application/json",  
    },
  };
  axios.post("https://tricks-codesblogbackend.up.railway.app/replies/add/"+id, comment, config);
}


export const deleteReply = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.delete("https://tricks-codesblogbackend.up.railway.app/replies/delete/"+id, config);
}