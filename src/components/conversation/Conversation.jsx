import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./conversation.css"

export default function Conversation({conversation, currUser}) {
    const [user, setUser] = useState(null);
    useEffect(()=>{
      const friendId = conversation.members.find((m) => m != currUser._id);
      const getUser = async ()=>{
        try{
          const res = await axios.get("https://minifacebook-restapi.onrender.com/api/users?userId="+friendId);
          setUser(res.data);
        }catch(err){
          console.log("Error whil efetching user in messenger.");
        }
      };
      getUser();
    },[currUser]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <li className="sidebarFriend">
        <img src={(user && user.profilePicture)?PF+"/"+user.profilePicture:PF+"/p1.jpg"} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user? user.username: "jhbdcjwb"}</span>
      </li>
    )
}
