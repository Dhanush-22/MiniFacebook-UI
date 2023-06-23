import axios from "axios";
import { useState } from "react";
import "./online.css"


export default function Online({userId}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userData, setUserData] = useState(null);
  useState(()=>{
    const getUser = async ()=>{
      try{
        const res = await axios.get("https://minifacebook-restapi.onrender.com/api/users?userId="+userId);
        setUserData(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getUser();
  },[]);

  return (
    <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
    <img src={(userData && userData.profilePicture)? PF+"/"+userData.profilePicture :PF + "/m1.jpg"} alt="" className="rightbarProfileImg"/>
    <span className="rightbarOnline"></span>
    </div>
    <span className="rightbarUsername">{userData? userData.username : "jhdcghje"}</span>
    </li>
  )
}

