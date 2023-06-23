import "./profile.css"
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useState, useEffect} from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState([]);
    const params = useParams();
    const username = params.username;
    console.log("Username in Profile "+username);
    useEffect(()=>{
        const fetchUser = async ()=>{
          const url = '/users?username='+ username;
          const res =  await axios.get(url);
          setUser(res.data);
        };
        fetchUser();
      },[username]);
    return (
    <>
        <TopBar/>
        <div className="profile">
            <SideBar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={(user && user.coverPicture)? PF+"/"+user.coverPicture : PF+"/c3.jpg"} alt="" className="profileCoverImg" />
                        <img src={(user && user.profilePicture)? PF+"/"+user.profilePicture: PF+"/defaultProfile.jfif"} alt="" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileUserName">{user.username}</h4>
                        <span className="profileDesc">{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">       
                    <div className="profileFeed">
                        <Feed username={username}/>
                    </div>
                    <div className="profileRightBar">
                        <Rightbar user={user}/>
                    </div>     
                </div>
            </div>
        </div>
    </>
  )
}
