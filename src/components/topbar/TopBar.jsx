import "./topbar.css"
import { Search, Person, Notifications, Chat, Settings, Feedback, HelpOutline, Logout, Help, RememberMe} from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import {useState, useContext } from "react"
import AuthContext from "../../context/AuthContext"
import { logOutCall } from "../../apiCalls";




function TopBar() {
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [open, setOpen] = useState(false);


    const handleOpen = () => {
      setOpen(!open);
    };


    const handleLogout = (e)=>{
        e.preventDefault();
        logOutCall(dispatch);
      };

    const navigate = useNavigate();
    const handlePfClick = () => {
        // import { useNavigate } from 'react-router-dom';
        navigate("/profile/"+user.username);
    };
  
    return (
        <div className="topbarContainer" style={{margin:"-10px -10px 0px -10px", padding:"0"}}>
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Mini Facebook</span>
                </Link>
            </div>
            <div className="topbarCentre">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input type="text" placeholder="Search for friend, post, video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to="/" style={{textDecoration:"none"}}>
                        <span className="topbarLink">Homepage</span>
                    </Link>
                    <Link to={"/profile/"+user.username} style={{textDecoration:"none", marginLeft:"12px"}}>
                        <span className="topbarLink">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span>
                    </Link>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                    <div className="topbarIconItem">
                    <Link to="/messenger" style={{textDecoration:"none", color:"white"}}>
                        <Chat />
                    </Link>
                        {/* <span className="topbarIconBadge">2</span> */}
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        {/* <span className="topbarIconBadge">6</span> */}
                    </div>
                </div>
                <img 
                    src={user.profilePicture? (PF+"/"+user.profilePicture) : (PF+"/defaultProfile.jfif")} 
                    alt="" 
                    className="topbarImg"
                    onClick={handleOpen}
                />
                <div className="dropdown">
                    {open ? (
                        <ul className="menu">
                        <li className="menu-item">
                            <RememberMe/>
                            <button onClick={handlePfClick}>My Profile</button>
                        </li>
                        <li className="menu-item">
                            <Settings/>
                            <button>Settings & Privacy</button>
                        </li>
                        <li className="menu-item">
                            <HelpOutline/>
                            <button>Help & Support</button>
                        </li>
                        <li className="menu-item">
                            <Feedback/>
                            <button>Give Feedback</button>
                        </li>
                        <li className="menu-item">
                            <Logout/>
                            <button onClick={handleLogout}>Log Out</button>
                        </li>
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    );
}


export default TopBar;