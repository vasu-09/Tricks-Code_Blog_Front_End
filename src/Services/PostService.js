
import axios from "axios";
import { getToken } from "./AuthService";

 // Get the authentication token from cookies

 const BASE_URL = process.env.REACT_APP_BASE_URL

export const getarticlebyid = (id) => axios.get(BASE_URL+"/article/get/"+id);
export const getCategories = () => axios.get(BASE_URL+"/category/art/all");
export const getarticlebytitle = (title) => axios.get(BASE_URL+"/article/get/title"+title);
export const getCommentsByArticleId = (id) => axios.get(BASE_URL+"/comments/all/"+id);
export const getreplies = (id) => axios.get(BASE_URL+"/replies/get/"+id);
export const getallarticles = () => axios.get(BASE_URL+"/article/get");
export const getallusers = () => axios.get(BASE_URL+"/user/all");
export const getuserbyid = (id) => axios.get(BASE_URL+"/user/get/"+id);
export const getAbout = () => axios.get(BASE_URL+"/about");
export const postCategories = (category) => {
    const token = getToken(); 
    
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          "Content-Type": "application/json",  // Set the content type
        },
      };
    axios.post(BASE_URL+"/category/add", category, config);
}
export const postcomment = (id, comment) => {
  const token = getToken(); 
  
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          "Content-Type": "application/json",  // Set the content type
        },
      };
  axios.post(BASE_URL+"/comments/add/"+id, comment, config);}
  
export const postdata = (id, post) => {
  const token = getToken(); 
  
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          'Content-Type': 'multipart/form-data',  // Set the content type
        },
      };
      axios.post(BASE_URL+"/article/post/"+id, post, config);}

export const updateComment = (id, comment) =>{
  const config = {
        
    headers: {// Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.put(BASE_URL+"/comments/put/"+id, comment, config);
}

export const deleteComment = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.delete(BASE_URL+"/comments/delete/"+id, config);
}

export const updateAbout = (about) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
  axios.put(BASE_URL+"/update/about", about, config);
}

export const updateArticle = (id, post) =>{

    const token = getToken(); 
      const config = {
          
          headers: {
            Authorization: `${token}`,  // Include the token in the Authorization header
            'Content-Type': 'multipart/form-data',  // Set the content type
          },
        };
        axios.put(BASE_URL+"/article/put/"+id, post, config);
}

export const deletearticle = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
  axios.delete(BASE_URL+"/article/delete/"+id, config);
}

export const replycomment = (id, comment) =>{
  const token = getToken()
  const config = {  
    headers: {
      Authorization: `${token}`,        
      "Content-Type": "application/json",  
    },
  };
  axios.post(BASE_URL+"/replies/add/"+id, comment, config);
}


export const deleteReply = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.delete(BASE_URL+"/replies/delete/"+id, config);
}