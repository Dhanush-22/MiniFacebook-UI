import "./login.css";
import { useEffect, useRef, useState } from "react";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(!isVisible);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isVisible]);

  const divStyle = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 1s ease-in-out',
    alignSelf: 'flexStart'
  };

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Clicked");
    await loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  console.log("isFetching value:", isFetching);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="login">
        <div className="loginWrapper loginWrapperL">
          <div className="loginLeft">
            <h3 className="loginLogo">Mini Facebook</h3>
            <span className="loginDesc">
              Mini Facebook helps you connect and share with the people in your
              life
            </span>
          </div>

          <form className="loginRight" onSubmit={handleClick}>
            <div className="loginBox loginBoxL">
              <input
                type="email"
                placeholder="Email address or phone number"
                className="loginInput"
                ref={email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                ref={password}
                required
                minLength="6"
              />
              <button className="loginButton" disabled={isFetching}>
                {isFetching ? (
                  <CircularProgress size="18px" style={{ color: "white" }} />
                ) : (
                  "Log In"
                )}
                {/* {isFetching && <p style={{color:"red"}}>Please hold on, it may take a few second..</p>} */}
              </button>
              <span className="loginForgot">Forgotten password?</span>
              {isFetching && (
                <span className="warningCls">
                  Please wait for a few seconds..
                </span>
              )}
              <Link
                to="/"
                className="loginRegistationButton"
                style={{ textDecoration: "none" }}
              >
                <span>
                  {isFetching ? (
                    <CircularProgress size="18px" style={{ color: "white" }} />
                  ) : (
                    "Create New Account"
                  )}
                </span>
              </Link>
            </div>
          </form>
        </div>
        { !isFetching && (
          <div style={divStyle}>
              <p>Test credentials: &#91; <strong>Email</strong>: dhanush123@gmail.com <strong>Password</strong>: 12345678	&#93;</p>
          </div>
        )

        }
      </div>
    </>
  );
}
        // <div style={{alignSelf:"flex-start", marginLeft:"15px"}}>
