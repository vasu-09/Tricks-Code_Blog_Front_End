import React, { useEffect, useState } from 'react'
import {deletearticle, deleteComment, deleteReply, getarticlebyid, getCommentsByArticleId, getreplies, postcomment, replycomment, updateComment} from '../Services/PostService';
import DOMPurify from 'dompurify';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Button } from 'react-bootstrap';
import { isUserLoggedIn } from '../Services/AuthService';
import './style.css';
import { isAdmin } from '../Services/AuthService';


const Post = () => {
    const isAuth = isUserLoggedIn()
    const [post, setPost] = useState()
    const {id} = useParams()
    const [comments, setComments] = useState([]); 
    const [input, setInput] = useState('')
    const [replies, setReplies] = useState([])
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [commentError, setCommentError] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [replyinput, setReplyinput] = useState('');
    const [rselectedCommentId, setRselectedCommentId] = useState('');
    const [editInput, setEditInput] = useState('');
    const navigate = useNavigate();
    const isadmin = isAdmin()
    const [email1, setEmail1] = useState('');
    const [username1, setUsername1] = useState('');
    const [visibleComments, setVisibleComments] = useState(3);



    const handleShowMore = () => {
      setVisibleComments((prevVisibleComments) => prevVisibleComments + 3);
    };
    

    const handleSaveEdit = (commmentid) =>{
      const editreply = input;
      const comment ={
        content: input,
      }
      updateComment(commmentid, comment);
      console.log(editreply);
      setSelectedCommentId('');
      window.location.reload(false)
    }
    
    const handleCancelEdit = () =>{
      setEditingCommentId('');
      setInput('');
    }
    const handleSendReply = (commentId) => {
      // Implement logic to send the reply
      const formData = new FormData();
      formData.append('content', replyinput);
      const replyContent = replyinput; // Get the reply content from the input field
      console.log(`Sending reply to comment ${commentId}: ${replyContent}`);
      replycomment(commentId, formData);
      setSelectedCommentId('');
      setInput('');
      window.location.reload(false)
    };

    const handleCancelReply = (commentId) => {
      // Implement logic to cancel the reply operation
      console.log(`Canceling reply to comment ${commentId}`);
      // Clear the input field
      setRselectedCommentId('');
      setReplyinput('');
    };
    
    const handleReply = (commentId) => {
        // Implement reply logic
        setRselectedCommentId(commentId);
       
      };
      
      const handleDelete = (commentId) => {
        // Implement delete logic
        deleteComment(commentId);
        window.location.reload(false)
      };

      const handlereplyDelete = (replyid) =>{
        deleteReply(replyid)
        window.location.reload(false)
      }

    const handleAddComment = (event) => {
      event.preventDefault();
        if (editInput.trim() === '') {
          // Display an error message when the comment is empty
          setCommentError('Please enter your comment.');
          return;
        }else{
          setCommentError('');
          const comment ={
            username : username1,
            content: editInput,
            email: email1
          }
        postcomment(id, comment);
      
       window.location.reload(false)
      }
        
      };

    useEffect(() =>{
        getarticlebyid(id).then(res =>{
            setPost(res.data)
        }).catch(error =>{
            console.error();
        });
        getCommentsByArticleId(id)
    .then((res) => {
      setComments(res.data);
    
      const fetchReplies = async () => {
        const repliesData = await Promise.all(
          res.data.map(async (comment) => {
            if (comment.id) {
              const replyResponse = await getreplies(comment.id);
              return { [comment.id]: replyResponse.data };
            }
            return null; // Handle cases where comment.id is undefined
          })
        );
        setReplies(Object.assign({}, ...repliesData.filter(Boolean))); // Filter out null values
      };
      
      fetchReplies();
    })
    .catch((error) => {
      console.error(error);
    });
    }, [id])

    const handleToggleReplies = (commentId) => {
        setSelectedCommentId(commentId === selectedCommentId ? null : commentId);
      };

      function updateArticle(id){
        navigate(`/update-article/${id}`)
      }

      function deleteArticle(id){
        deletearticle(id);
        navigate('/')
        window.location.reload(false)
      }

      const formatDate = (dateString) => {
        // Create a Date object from the provided dateString
        const date = new Date(dateString);
      
        // Options for formatting the date
        const options = {
          day: '2-digit', // Ensure two digits for day
          month: 'short', // Short month name
          year: 'numeric', // Full numeric year
        };
      
        // Format the date using toLocaleDateString() method
        const formattedDate = date.toLocaleDateString('en-GB', options);
      
        // Extract the day part from the formatted date
        const day = date.getDate();
      
        // Function to add ordinal suffix to the day (e.g., 1st, 2nd, 3rd, 4th, ...)
        const addOrdinalSuffix = (day) => {
          if (day >= 11 && day <= 13) {
            return day + 'th';
          }
          switch (day % 10) {
            case 1:
              return day + 'st';
            case 2:
              return day + 'nd';
            case 3:
              return day + 'rd';
            default:
              return day + 'th';
          }
        };
      
        // Add ordinal suffix to the day and concatenate with the formatted date
        const formattedDateWithOrdinal = addOrdinalSuffix(day) + ' ' + formattedDate.slice(3);
      
        return formattedDateWithOrdinal;
      };

    const renderReplies = (commentId) => {
        const replyList = replies[commentId];
        if (replyList && replyList.length > 0) {
          return (
            <div style={{ marginLeft: '20px' }}>
              {replyList.map((reply) => (
                <div key={reply.id}>
                  <div style={{display: "flex", fontSize: "10px", gap: "10px"}}>
                            <span >{reply.userEmail}</span>
                            <span >{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</span>
                            </div>
                            <p style={{ fontSize: 'medium', margin: '5px 0' }}>{reply.content}</p>
                            <div style={{display: "flex", gap: "10px", fontSize: "12px"}}>
                            {isAdmin() && (<span style={{color:"#FF9999"}} onClick={() => handlereplyDelete(reply.id)}>Delete</span>)}
                            </div>
                </div>
              ))}
            </div>
          );
        }
        return null;
      };

    const sanitizedContent = post ? DOMPurify.sanitize(post.content) : '';

    return (
    <div className='col-lg-15 mx-auto p-3 py-md-5'> 
    {post ? (
                <div className='fs-5 col-md-15 aligned-text container'>
                  <div className='row'>
                    <div className='col'>
                      
                    <h1>{post.title}</h1>
                    <span className='text-muted' style={{fontSize: "15px"}}>Created / Modified at: {formatDate(post.createdDate)}</span>
                    </div>
                    <div className='col text-right'>
                    
                    {isadmin && <button className='btn text-white' onClick={() =>updateArticle(post.id)} style={{backgroundColor: "rgb(19, 18, 256)", marginLeft: "10px"}}>Update</button> }
                    {isadmin && <button className='btn text-white' onClick={() =>deleteArticle(post.id)} style={{backgroundColor: "rgb(249, 28, 25)", marginLeft: "10px"}}>Delete</button> }
                    </div>
                    </div>
                    <div className='container'>
                      <br/>
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    </div>
                    <hr size="8" width="90%" /> 
                    <div className='container form-outline' >
                        <h3>Comments</h3>     
                        {comments.slice(0, visibleComments).map((comment) => (
                        <div key={comment.id}>
                            <hr size="5" width="70%" />
                            <div style={{display: "flex", fontSize: "10px", gap: "10px"}}>
                            <span >{comment.userEmail}</span>
                            <span >{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                            </div>
                            {editingCommentId === comment.id ? (
                            // Render input field for editing
                            <div style={{ display: "flex", gap: "10px", fontSize: "12px" }}>
                            <input
                            type="text"
                            id={`editInput_${comment.id}`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />
                            {/* Save Button */}
                            <span style={{ color: 'green' }} onClick={() => handleSaveEdit(comment.id)}>
                            Save
                            </span>
                            {/* Cancel Button */}
                            <span style={{ color: 'red' }} onClick={() => handleCancelEdit(comment.id)}>
                            Cancel
                            </span>
                            </div>
                            ) : (
                            // Render comment content
                            <p style={{ fontSize: 'medium', margin: '5px 0' }}>{comment.content}</p>
                          )}
                            {isAuth && <div style={{display: "flex", gap: "10px", fontSize: "12px"}}>
                                {rselectedCommentId !== comment.id && (
                                  <>
                                  {isAdmin() && (<span style={{ color: '#C0C0C0' }} onClick={() => handleReply(comment.id)}>
                                  Reply
                                  </span>)}
                                {isAdmin() && (<span style={{color:"#FF9999"}} onClick={() => handleDelete(comment.id)}>Delete</span>)}
                                </>
                                )}
                            </div>}
                            {rselectedCommentId === comment.id && (
                              <>
                              {/* Reply Input Box */}
                                <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                                  <input
                                  type="text"
                                  id={`replyInput_${comment.id}`}
                                  value={replyinput}
                                  onChange={(e) => setReplyinput(e.target.value)}
                                  placeholder="type reply..."
                                  />
                              {/* Send Button */}
                                <span style={{ color: 'green' }} onClick={() => handleSendReply(comment.id)}>
                                  Send
                                </span>
                              {/* Cancel Button */}
                                <span style={{ color: 'red' }} onClick={() => handleCancelReply(comment.id)}>
                                  Cancel
                                </span>
                              </div>
                              </>
                            )}
                            <span style={{ fontSize: 'small', display: 'ruby' }} onClick={() => handleToggleReplies(comment.id)}>
                  {selectedCommentId === comment.id ? <span style={{color: '#CC00CC'}}>Hide Replies</span> : <span style={{color: 'blue'}}>Show Replies</span>}
                </span> 
                            {selectedCommentId === comment.id && renderReplies(comment.id)}

                          
                        </div>
                        ))}

                        <hr size="5" width="70%" /> 
                        {comments.length > visibleComments && (
          <span className='smc'style={{ fontSize: 'small', display: 'ruby', color: 'blue' }} onClick={() => handleShowMore()}>
            Show More Comments
          </span>
        )}
                          <h3>Add Comment</h3>
                          <form onSubmit={handleAddComment} className="comment-form">
  {/* Add input fields for username and email */}
  <label htmlFor='username'>Username:</label>
  <input
    type='text'
    id='username'
    className='form-control'
    value={username1}
    onChange={(e) => setUsername1(e.target.value)}
    placeholder='Type your name...'
    required
  />

  <label htmlFor='email'>Email:</label>
  <input
    type='email'
    id='email'
    className='form-control'
    value={email1}
    onChange={(e) => setEmail1(e.target.value)}
    placeholder='Type your email id...'
    required
  />

  <label htmlFor='comment'>Comment:</label>
  <textarea
    type='text'
    id='comment'
    className='form-control'
    value={editInput}
    onChange={(e) => setEditInput(e.target.value)}
    placeholder='Type your comment...'
    required
  />
  <Button className='btn-success' type='submit'>Add Comment</Button>
</form>
        {commentError && (
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{commentError}</p>
        )}</div>
                    </div>   
            ) : (
                <p>Loading...</p>
            )}
    </div>
  )
}

export default Post;
