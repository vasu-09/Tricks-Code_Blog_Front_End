import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';
import { getAbout } from '../Services/PostService';
import { isAdmin } from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';


const About = () => {
    const [about, setAbout] = useState('');
    const isadmin = isAdmin();
    const navigate = useNavigate()

    function updateAbout(){
        navigate('/update-about')
    }

    useEffect(() => {
        getAbout().then((res) => {
            setAbout(res.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

const sanitizedContent = about ? DOMPurify.sanitize(about.content) : '';

  return (
    <div className='container mt-4'>
        <div className='container col-md-7 aligned-text'>
            <div className='row'><div className='col'>
     <h1 style={{fontWeight:'bold'}}>About Me</h1>
     </div>
     <div className='col text-right'>
     {isadmin && <button className='btn text-white' onClick={() =>updateAbout()} style={{backgroundColor: "rgb(255, 0, 128)", marginLeft: "10px"}}>Update</button> }
     </div>
     </div>
     <div className= ''dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
     </div>
    </div>
  )
}

export default About
