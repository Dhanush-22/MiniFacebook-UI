import "./forgot.css"

export default function Forgot() {
  return (
    <div className="container">
        <div className="wrapper">
            <div className="head">
                <div className="titleBox">
                    <span className="title">Mini Facebook</span>
                </div>
            </div>
            <div className="boxContainer">
                <div className="box">
                    <div className="boxdiv1">
                        <span className="boxTitle">Find Your Account</span>
                    </div>
                    <hr className="boxHr"/>
                    <div className="boxdiv2">
                        <span className="boxDesc">	
Please enter your email address or mobile number to search for your account.</span>
                    </div>
                    <div className="boxdiv3">
                        <input type="email" placeholder="Email address or phone number" className="entry" autoFocus />
                    </div>
                    <hr className="boxHr"/>
                    <div className="boxdiv4">
                        <button className="cancelBtn">Cancel</button>
                        <button className="searchBtn">Search</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
