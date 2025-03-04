import { useState } from "react";
import { NavLink,useNavigate,useParams } from "react-router";
import {useCookies} from 'react-cookie'

function App() {
  const params = useParams();
  const navigate = useNavigate();
  const [username,setUserName] = useState('');
  const [password,setPasw] = useState('');
  const [cookies,setCookie,removeCookie] = useCookies(['username']);

  const LoginFunc = async() => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login',{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const data = await response.json();
      console.log(data);
      if(data.message == 'Success') {
        setCookie('username',username);
        setCookie('token',data.token);
        navigate('/booksstore/books');
      } else {
        removeCookie('username');
        removeCookie('token');
        alert(data.message+":-"+data.description);
      }
      
    } catch(error) {
      console.log(error);
    }

  }


  const LoginButton = (e)=> {
    e.preventDefault();
    LoginFunc();
  }

  return (
    <div>
      
      <h2 className='title'>Login</h2>
      <div>
          <form  className="form-container" onSubmit={LoginButton}>
              <div className="formdiv">
                  <label htmlFor="username">User Name:</label><br />
                  <input type="text" className="txtbox" name="username" onChange={(e)=> setUserName(e.target.value)} placeholder="Enter User Name"/>
                  <br />
                  <label htmlFor="password">Password:</label><br />
                  <input type="password" className="txtbox" name="password" onChange={(e)=> setPasw(e.target.value)} placeholder="Enter Password"/>
                  <br />
                  <button className="AddBtn" >Login</button>
                  <br />
                  <NavLink to="/booksstore/register" className="NavLink" >SignUp</NavLink>
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