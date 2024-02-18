
import axios from "axios";
import { getToken } from "./AuthService";

 // Get the authentication token from cookies

  

export const getarticlebyid = (id) => axios.get("http://localhost:8080/article/get/"+id);
export const getCategories = () => axios.get("http://localhost:8080/category/art/all");
export const getarticlebytitle = (title) => axios.get("http://localhost:8080/article/get/title"+title);
export const getCommentsByArticleId = (id) => axios.get("http://localhost:8080/comments/all/"+id);
export const getreplies = (id) => axios.get("http://localhost:8080/replies/get/"+id);
export const getallarticles = () => axios.get("http://localhost:8080/article/get");
export const getallusers = () => axios.get("http://localhost:8080/user/all");
export const getuserbyid = (id) => axios.get("http://localhost:8080/user/get/"+id);
export const getAbout = () => axios.get("http://localhost:8080/about");
export const postCategories = (category) => {
    const token = getToken(); 
    
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          "Content-Type": "application/json",  // Set the content type
        },
      };
    axios.post("http://localhost:8080/category/add", category, config);
}
export const postcomment = (id, comment) => {
  const token = getToken(); 
  
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          "Content-Type": "application/json",  // Set the content type
        },
      };
  axios.post("http://localhost:8080/comments/add/"+id, comment, config);}
  
export const postdata = (id, post) => {
  const token = getToken(); 
  
    const config = {
        
        headers: {
          Authorization: `${token}`,  // Include the token in the Authorization header
          'Content-Type': 'multipart/form-data',  // Set the content type
        },
      };
      axios.post("http://localhost:8080/article/post/"+id, post, config);}

export const updateComment = (id, comment) =>{
  const config = {
        
    headers: {// Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.post("http://localhost:8080/comments/put/"+id, comment, config);
}

export const deleteComment = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.delete("http://localhost:8080/comments/delete/"+id, config);
}

export const updateAbout = (about) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
  axios.put("http://localhost:8080/update/about", about, config);
}

export const updateArticle = (id, post) =>{

    const token = getToken(); 
      const config = {
          
          headers: {
            Authorization: `${token}`,  // Include the token in the Authorization header
            'Content-Type': 'multipart/form-data',  // Set the content type
          },
        };
        axios.put("http://localhost:8080/article/put/"+id, post, config);
}

export const deletearticle = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
  axios.delete("http://localhost:8080/article/delete/"+id, config);
}

export const replycomment = (id, comment) =>{
  const token = getToken()
  const config = {  
    headers: {
      Authorization: `${token}`,        
      "Content-Type": "application/json",  
    },
  };
  axios.post("http://localhost:8080/replies/add/"+id, comment, config);
}


export const deleteReply = (id) =>{
  const token = getToken();
  const config = {
        
    headers: {
      Authorization: `${token}`,  // Include the token in the Authorization header
      "Content-Type": "application/json",  // Set the content type
    },
  };
axios.delete("http://localhost:8080/replies/delete/"+id, config);
}