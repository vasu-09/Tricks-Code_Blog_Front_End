
import React, { useState } from 'react'
import { Button, Form, Modal, Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { isAdmin } from '../Services/AuthService';
import {postCategories} from '../Services/PostService';

const Home = ({categories, articles, users}) => {
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddUserModel, setShowAddUserModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newUsername, setNewUsername] = useState();
    const [newEmail, setNewEmail] = useState();
    const [newpassword, setNewpassword] = useState();
    const [showUserModel, setShowUserModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const navigate = useNavigate()

    const handleClose = () => setShowAddCategoryModal(false);
    const handleShow = () => setShowAddCategoryModal(true);
    const handleClose1 = () => setShowAddUserModal(false);
    const handleClose2 = () => setShowUserModel(false);

    const handleShow2 = (id) => {
        setSelectedUser(id);
        setShowUserModel(true);
    }

   const stripHtmlTags = (html) => {
      let temp = document.createElement("div");
      temp.innerHTML = html;
      return temp.textContent || temp.innerText || "";
    };

    const extractFirstLine = (content) => {
        // Split the content into lines
        if(content){
          const contentWithoutTags = stripHtmlTags(content);
          let lines = contentWithoutTags.split('\n');
          return lines[0];
        }
        else{
            return null;
        }
      };


    const handleToggleCategory = (categoryId) => {
        if (expandedCategories.includes(categoryId)) {
          setExpandedCategories(expandedCategories.filter((id) => id !== categoryId));
        } else {
          setExpandedCategories([...expandedCategories, categoryId]);
        }
      };

      const handleAddCategory = () => {
        if (!newCategoryName) {
            return;
          }
        const category = {
            name: newCategoryName
        }
          postCategories(category);
          
          handleClose();
          window.location.reload(false)  
                
        };

      const handleAddArticle = () =>{
        navigate('add-article')
      }
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div className='container mt-5'>
        <div className='row'>
        <div className='col-md-10'>
            <div className='row'>
                <div className='col'>
        <h2>ARTICLES</h2>
        </div>
       {isAdmin() && <div className='col text-right'>
        <Button variant='primary' onClick={handleAddArticle}>
              Add Article
            </Button>
            </div>}
            </div>
            {articles.slice(0, 5).map((article) => (
                 <Link key={article.id} to={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
               <div
                className='container mt-2 border p-3'
                style={{
                  transition: 'box-shadow 0.3s',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  padding: '15px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(0.97)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <h3 style={{color:'black'}}>{article.title}</h3>
                <p style={{color: 'black'}}>{extractFirstLine(article.content)}</p>
              </div>
            </Link>
            ))}
        </div>
        <div className='col-md-4 ml-auto' style={{ flex: 1 }}>
            <div className='row'>
                <div className='col md-4 border p-3'>
            <div className='row'>
                <div className='col'>
        <h2>CATEGORIES</h2>
        </div>
        {isAdmin() && <div className='col text-right'>
        <Button variant='primary' size='sm' onClick={handleShow}>
              Add
            </Button>
            </div>}
            </div>
          {categories.map((category) => (
            <div key={category.id}>
              <span onClick={() => handleToggleCategory(category.id)}>
                {expandedCategories.includes(category.id) ? '[-]' : '[+]'}
              </span>{' '}
              {category.name}
              {expandedCategories.includes(category.id) && (
                <ul>
                  {category.artname.map((article, index) => (
                    <li key={category.artid[index]}>
                      <a href={`/article/${category.artid[index]}`} style={{ textDecoration: 'none' }}>
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          </div>

          {isAdmin() && <div className='col-md-6 border p-3 mt-3' style={{ flex: 2 }}>
          <div className='row'>
                <div className='col'>
        <h2>Users</h2>
        </div>
            </div>
          <ul>
          {currentUsers.map((user) => (
            <li key={user.id}>
              <span onClick={() => handleShow2(user)}>{user.username}</span>
            </li>
          ))}
          </ul>
          <Pagination>
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        </div>}
        </div>
      </div>
      </div>

        {/* Add Category Modal */}
     <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showAddCategoryModal} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title>Add Category</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Form>
         <Form.Group controlId='newCategoryName'>
           <Form.Label>Category Name</Form.Label>
           <Form.Control
             type='text'
             placeholder='Enter category name'
             value={newCategoryName}
             onChange={(e) => setNewCategoryName(e.target.value)}
           />
         </Form.Group>
       </Form>
     </Modal.Body>
     <Modal.Footer>
       <Button variant='secondary' onClick={handleClose}>
         Close
       </Button>
       <Button variant='primary' onClick={handleAddCategory}>
         Add Category
       </Button>
     </Modal.Footer>
   </Modal>

   <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showAddUserModel} onHide={handleClose1}>
   <Modal.Header closeButton>
       <Modal.Title>Add User</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Form>
         <Form.Group controlId='newCategoryName'>
           <Form.Label>User Name</Form.Label>
           <Form.Control
             type='text'
             placeholder='Enter User name'
             value={newUsername}
             onChange={(e) => setNewUsername(e.target.value)}
           />
           <Form.Label>Email id</Form.Label>
           <Form.Control
             type='text'
             placeholder='Enter Email id'
             value={newEmail}
             onChange={(e) => setNewEmail(e.target.value)}
           />
           <Form.Label>Password</Form.Label>
           <Form.Control
             type='password'
             placeholder='Enter Password'
             value={newpassword}
             onChange={(e) => setNewpassword(e.target.value)}
           />
         </Form.Group>
       </Form>
     </Modal.Body>
     <Modal.Footer>
       <Button variant='secondary' onClick={handleClose}>
         Close
       </Button>
       <Button variant='primary' onClick={handleAddCategory}>
         Add Category
       </Button>
     </Modal.Footer>
   </Modal>
   
   <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showUserModel} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold' }}>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table>
            <tbody>
                <tr>
                <td style={{ fontWeight: 'bold' }}>Id :</td>
                    <td>{selectedUser && selectedUser.id}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>User Name :</td>
                    <td>{selectedUser && selectedUser.username}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Email :</td>
                    <td>{selectedUser && selectedUser.email}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: 'bold' }}>Role :</td>
                    <td>{selectedUser && selectedUser.role && selectedUser.role.length > 0 ? selectedUser.role[0] : 'N/A'}</td>
                </tr>
            </tbody>
          </table>
        </Modal.Body>
    </Modal>


</div>
  )
}

export default Home
