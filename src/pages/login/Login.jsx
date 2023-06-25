import "./login.css"
import {useRef} from "react"
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext"
import {CircularProgress} from "@mui/material" 
import { Link } from "react-router-dom";


export default function Login() {
  const email = useRef();
  const password = useRef();

  const {user, isFetching, error, dispatch} = useContext(AuthContext);

  const handleClick = async (e)=>{
    e.preventDefault();
    console.log("Clicked");
    await loginCall(
      {email:email.current.value, 
       password:password.current.value}
      ,dispatch);
  };
  console.log(user);
  console.log("isFetching value:",isFetching);
  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Mini Facebook</h3>
            <span className="loginDesc">Mini Facebook helps you connect and share with the people in your life</span>
          </div>

          <form className="loginRight" onSubmit={handleClick}>
            <div className="loginBox">
              <input 
               type="email"
               placeholder="Email address or phone number" 
               className="loginInput"
               ref = {email}
               required
                />
              <input 
                type="password" 
                placeholder="Password" 
                className="loginInput"
                ref = {password}
                required
                minLength="6"
                 />
              <button className="loginButton" disabled={isFetching}>
                {isFetching? <CircularProgress size="18px" style={{color:"white"}}/> : "Log In" }
                {isFetching && <p style={{color:"red"}}>Please hold on, it may take a few second..</p>}
              </button>
              <span className="loginForgot">Forgotten password?</span>
              <Link to="/" className="loginRegistationButton">  
                <span className="loginRegText">{isFetching? <CircularProgress size="18px" style={{color:"white"}}/> : "Create New Account" }</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}