import { NavLink, useParams, useNavigate } from "react-router";
import { useState } from "react";

function Register() {
    const params = useParams();
    const navigate = useNavigate();
    const [fname,setFirstName] = useState('');
    const [lname,setLastName] = useState('');
    const [emailid,setEmailID] = useState('');
    const [mobileno,setMobileNum] = useState('');
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [user,setUser] = useState({});
    const AddRegisterUser = async()=> {
        //e.preventdefault();
        //console.log("Inside of Submit");
        const url = "http://localhost:5000/api/users";
        const response = await fetch(
            url,{
            headers:{
                "Content-type" : "application/json",
            },
            method:"POST",
            body:JSON.stringify({
                fname,
                lname,
                emailid,
                mobileno,
                username,
                password
            })
        });
        /*
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle data
            })
            .catch((err) => {
                console.log(err.message);
            });
        */
        const data = await response.json();
        console.log(data);
        setUser(data.user);
        
        if(data.message == 'New User Details'){
            navigate('/login');
        }
        
    }

    
    const AddRegisterkButton = (e)=> {
        e.preventDefault();
        console.log(fname);
        console.log(lname);
        console.log(emailid);
        console.log(mobileno);
        console.log(username);
        console.log(password);
        AddRegisterUser();
    }
    
    return (
      <div>
        
        <h2 className='title'>SignUp</h2>
        <div>
            <form className="form-container">
                
                <div className="Imgdiv">
                    <img src="../src/assets/books.jpg" className="createImgBook" alt="booksimg" />
                </div>
                <div className="formdiv">
                    <label htmlFor="firstname">First Name:</label><br />
                    <input type="text" onChange={(e)=> setFirstName(e.target.value)} className="input-txtbox" name="firstname" placeholder="Enter First Name"/>
                    <br />
                    <label htmlFor="lastname">Last Name:</label><br />
                    <input type="text" onChange={(e)=> setLastName(e.target.value)} className="input-txtbox" name="lastname" placeholder="Enter Last Name"/>
                    <br />
                    <label htmlFor="emailid">Email ID:</label><br />
                    <input type="text" onChange={(e)=> setEmailID(e.target.value)} className="input-txtbox" name="emailid" placeholder="Enter Email ID"/>
                    <br />
                    <label htmlFor="mobileno">Mobile No.:</label><br />
                    <input type="text" onChange={(e)=> setMobileNum(e.target.value)} className="input-txtbox" name="mobileno" placeholder="Enter Mobile No."/>
                    <br />
                    <label htmlFor="username">UserName:</label><br />
                    <input type="text" onChange={(e)=> setUserName(e.target.value)} className="input-txtbox" name="username" placeholder="Enter User Name"/>
                    <br />
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" onChange={(e)=> setPassword(e.target.value)} className="input-txtbox" name="password" placeholder="Enter Password"/>
                    <br />
                    <button className="AddBtn" onClick={AddRegisterkButton}>Register</button><br />
                    <NavLink to="/login" className="NavLink" >SignIn</NavLink>
                    
                </div>

            </form>    
        </div>
              
      </div>
    )
  
  }
  
  export default Register;