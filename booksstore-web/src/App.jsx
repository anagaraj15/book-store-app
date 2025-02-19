import { useState } from "react";
import { NavLink,useNavigate,useParams } from "react-router";

function App() {
  const params = useParams();
  const navigate = useNavigate();
  const [username,setUserName] = useState('');
  const [pasw,setPasw] = useState('');
  //const LoginFunc = async() => {
    //const response = await fetch(`http://localhost:5000/api/users/${params.userId}`);

  //}


  const LoginButton = (e)=> {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div>
      
      <h2 className='title'>Login</h2>
      <div>
          <form  className="form-container" onSubmit={LoginButton}>
              <div className="formdiv">
                  <label htmlFor="username">User Name:</label><br />
                  <input type="text" className="txtbox" name="username" placeholder="Enter User Name"/>
                  <br />
                  <label htmlFor="password">Password:</label><br />
                  <input type="password" className="txtbox" name="password" placeholder="Enter Password"/>
                  <br />
                  <button className="AddBtn" >Login</button>
                  <br />
                  <NavLink to="/register" className="NavLink" >SignUp</NavLink>
              </div>
              <div className="Imgdiv">
                  <img src="../src/assets/314.jpg" className="loginImgBook" alt="booksimg" />
              </div>
              
          </form>    
      </div>
            
    </div>
  )

}

export default App;