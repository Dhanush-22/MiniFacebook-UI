import axios from "axios";
// import { useContext } from "react";
import { useRef } from "react";
import {useNavigate, Link} from "react-router-dom"
// import { loginCall } from "../../apiCalls";
// import AuthContext from "../../context/AuthContext";
import "./register.css"

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  // const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const history = useNavigate();

  const handleClick = async (e)=>{
    e.preventDefault();
    // console.log("Clicked....")
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match.");
    }else{
      const newUser ={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try{
        const res = await axios.post("https://minifacebook-restapi.onrender.com/api/auth/register",newUser);
        history("/login");
      }catch(err){
        console.log(err);
      }
    }
  };

  return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Mini Facebook</h3>
            <span className="loginDesc">Mini Facebook helps you connect and share with the people in your life</span>
          </div>

          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input 
                type="text" 
                placeholder="Name" 
                required
                className="loginInput"
                ref={username}
                 />
              <input 
                type="email"
                placeholder="Email address" 
                required
                className="loginInput"
                ref={email}
                 />
              <input 
                type="password" 
                placeholder="Password"
                required 
                className="loginInput"
                ref={password}
                 />
              <input 
                type="password" 
                placeholder="Password Again" 
                className="loginInput"
                ref={passwordAgain}
                 />
              <button className="loginButton" type="submit">Sign Up</button>
              {/* <div className="loginRegistationButtonD"> */}
                <Link to="/login" className="loginRegistationButton" style={{textDecoration:"none"}}>
                  <span >Log In</span>
                </Link>
              {/* </div> */}
            </form>
          </div>

        </div>
      </div>
  )
}



