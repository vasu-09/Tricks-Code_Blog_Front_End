import React, { useState, useEffect } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Editor } from 'primereact/editor';
import { getAbout, updateAbout } from '../Services/PostService';
import { useNavigate } from 'react-router-dom';

const EditAbout = () => {
    const [content1, setContent1] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const navigae=useNavigate()

    const handleContentChange = (e) => {
        setContent1(e.htmlValue);
    };

    function saveAndUpdateTask(e) {
        e.preventDefault();
        const about = {
            content: content1
        };

        updateAbout(about);
        navigae('/about')
    }

    useEffect(() => {
        getAbout()
            .then((res) => {
                const aboutContent = res.data?.content || ''; // Ensure content is a string
                setContent1(aboutContent);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h1>Update About</h1>
                    <div className='card-body'>
                        {!isLoaded ? (
                            <p>Loading...</p>
                        ) : (
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>content</label>
                                    <Editor
                                        value={content1}
                                        onTextChange={handleContentChange}
                                    />
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveAndUpdateTask(e)} style={{ backgroundColor: "rgb(19, 167, 42)" }}>Submit</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAbout;
