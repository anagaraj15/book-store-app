import { useState } from "react";
import { NavLink,useNavigate,useParams } from "react-router";
import {useCookies} from 'react-cookie'

function App() {
  const params = useParams();
  const navigate = useNavigate();
  const [username,setUserName] = useState('');
  const [password,setPasw] = useState('');
  const [usernameerror,setUserNameError] = useState('');
  const [passworderror,setPasswordError] = useState('');
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
        const response1 = await fetch('http://localhost:5000/api/address/default');
        const data1 = await response1.json();
        console.log(data1);
        if(data1.message!="Error") {
          setCookie('address',data1.address._id);
          navigate('/booksstore/books');
        }
        //navigate('/booksstore/books');
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

  const AlphaNumericInput = (e)=> {
    const value = e.target.value;
    console.log(value);
    const regex = /^[0-9a-zA-Z(\-)]+$/; //this will admit letters, numbers and dashes
    if (value.match(regex) || value === "") {
      //setUserName(value);
      //e.target.nextElementSibling.innerHTML = "";
      setUserNameError('');
    } else {
      //e.target.nextElementSibling.innerHTML = "Invalid UserName";
      setUserNameError("Invalid UserName");
    }
  }

  const PasswordValidation = (e)=> {
    const value = e.target.value;
    console.log(value);
    var reg = new RegExp('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/');
    //var reg = new RegExp('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/');
    var test = reg.test(value);
    console.log(test);
    if (test) {
      setPasswordError('');
    } else{
      setPasswordError("Invalid Password");
    }
  }

  return (
    <div>
      
      <h2 className='title'>Login</h2>
      <div>
          <form  className="login-container" onSubmit={LoginButton}>
              <div className="loginformdiv">
                  <label htmlFor="username">User Name:</label><br />
                  <input type="text" className="txtbox" name="username" onChange={(e)=> setUserName(e.target.value)} onInput={AlphaNumericInput} placeholder="Enter User Name"/>
                  <p style={{color:"red"}}>{usernameerror}</p>
                  <br />
                  <label htmlFor="password">Password:</label><br />
                  <input type="password" className="txtbox" name="password" onChange={(e)=> setPasw(e.target.value)} onInput={PasswordValidation} placeholder="Enter Password"/>
                  <p style={{color:"red"}}>{passworderror}</p>
                  <br />
                  <button className="AddBtn" >Login</button>
                  <br />
                  <NavLink to="/booksstore/register" className="NavLink" >SignUp</NavLink>
              </div>
              <div className="loginImgdiv">
                  <img src="../src/assets/314.jpg" className="loginImgBook" alt="booksimg" />
              </div>
              
          </form>    
      </div>
            
    </div>
  )

}

export default App;