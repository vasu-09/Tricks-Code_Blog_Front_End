import React, { useState, useEffect } from 'react'
import RichTextEditor from './RichTextEditor'
import { postdata, getarticlebyid, getCategories, updateArticle } from '../Services/PostService';
import { useNavigate, useParams } from 'react-router-dom';


const Postarticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [catid, setCatid] = useState('');
    const {id} = useParams()
    const navigate = useNavigate()
    const [titleError, setTitleError] = useState(false); // State for title error
    const [categoryError, setCategoryError] = useState(false); 
    

    const handleContentChange = (e, newContent) => {
      setContent(newContent);
    };  
      useEffect(() => {

        getCategories()
        .then((response) => {
          const categoryData = response.data;
          setCategories(categoryData);
        })
        .catch((error) => {
          console.error(error);
        });

        if(id){
            getarticlebyid(id)
          .then((response) => {
            const articleData = response.data;
            setTitle(articleData.title);
            setCatid(articleData.categoryid);
            setContent(articleData.content);
          })
          .catch((error) => {
            console.error(error);
          });
        }
      }, [id]);

      function saveandupdateTask(e) {
        e.preventDefault();
        if (!title) {
          setTitleError(true);
      } else {
          setTitleError(false);
      }

      if (!catid) {
          setCategoryError(true);
      } else {
          setCategoryError(false);
      }
      if (title && catid){
        if(id){
          const formData = new FormData();
          formData.append('title', title);
          formData.append('content', content);
          updateArticle(id, formData)
          
        
        navigate('/');
        window.location.reload(false)
      }else{
          const formData =  new FormData();
          formData.append('title', title);
          formData.append('content', content);
          postdata(catid, formData);
          
          navigate('/')
          window.location.reload(false)
        }
      }
    }
    
    function text(){
      if(id){
          return <h2 className='text-center'> Update the Article </h2>
      }
      else{
          return <h2 className='text-center'> Add the Article</h2>
      }
    }

  return (
    <div className='container mt-4'>
        <div className='row'>
        <div className='col-lg-6 offset-lg-3'>
      <div className='card'>
            {text()}
            <div className='card-body'>
                <form>
                    <div className='form-group mb-4'>
                        <label className='form-label'>Title</label>
                        <input
                            className='form-control'
                            type='text' 
                            placeholder='Enter title of the article' 
                            name='title' value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            required />
                             {titleError && <small className='text-danger'>Please enter the title</small>}
                    </div>
                    <div className='form-group mb-2'>
                <label className='form-label'>Category</label>
                <select
                  className='form-control'
                  value={catid}
                  onChange={(e) => {
                  const selectedOption = e.target.value;
                  const selectedCategory = categories.find((category) => category.id === selectedOption);
                  setCatid(selectedOption);
                  setSelectedCategory(selectedCategory ? selectedCategory.name : '');
                }}
                required
                >
                <option value="">Select Category</option>
                {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
                ))}
              </select>
              {categoryError && <small className='text-danger'>Please select the category</small>}
              </div>
                    <div className='form-group mb-2'>
                    <label className='form-label'>content</label>
                    <RichTextEditor
                      initialValue={content}
                      onContentChange={handleContentChange}
                      required                   
                    />                     
                    </div>
                    <button className='btn btn-success' onClick={(e) => saveandupdateTask(e)} style={{backgroundColor : "rgb(19, 167, 42)"}}>Submit</button>
                </form>
            </div>
        </div>
      </div>      
    </div>
    </div>
  )
}

export default Postarticle
