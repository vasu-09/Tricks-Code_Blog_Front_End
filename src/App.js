import './App.css';

import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Post from './Components/Post';
import Postarticle from './Components/Postarticle';
import Header from './Components/Header';
import { getCategories, getallarticles, getallusers } from './Services/PostService';
import { useEffect, useState } from 'react';
import Home from './Components/Home';
import { isAdmin } from './Services/AuthService';
import About from './Components/About';
import EditAbout from './Components/EditAbout';
import Footer from './Components/Footer';
import AuthModal from './Components/AuthModal';


function App() {

  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch categories from your API
    // For example, assuming you have a getCategories function
    getCategories()
      .then((response) => {
        const categoryData = response.data;
        setCategories(categoryData);
      })
      .catch((error) => {
        console.error(error);
      });

      getallarticles().then((res)=>{
        const articleData = res.data;
        
        setArticles(articleData)
      }).catch((error)=>{
        console.error(error)
      });

      getallusers().then((res) =>{
        const userdata=res.data;
       
        setUsers(userdata);
      }).catch((error)=>{
        console.error(error)
      })
  }, []);

  function AdminRoute({children}){
    const admin = isAdmin();
    if(admin){
      return children
    }

    return <Navigate to='/'/>
  }

  return (
    <>
      <BrowserRouter>
      <Header categories={categories}/>
    <Routes>
      <Route path='/' element= {<Home categories={categories} articles={articles} users={users} />}></Route>
      <Route path='/add-article' element = {
        <AdminRoute>
          <Postarticle />
        </AdminRoute>}
      ></Route>
      <Route path='/update-article/:id' element = {
        
          <Postarticle/>
        }>
      </Route>
      <Route path='/article/:id' element = {<Post />}></Route> 
      <Route path='/about' element = {<About />}></Route>
      <Route path='/update-about' element={<EditAbout/>}></Route>
      <Route path='login' element={<AuthModal/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
