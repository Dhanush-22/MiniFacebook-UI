import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css"

export default function ChatOnline({onlineUsers, currId, setCurrChat}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    
    const handleClick = async (user)=>{
      try{
        const res = await axios("/conversations/find/"+user._id+"/"+currId);
        setCurrChat(res.data);
      }catch(err){
      }
    }

    useEffect(()=>{
      const getFriends = async ()=>{
        try{
          const res = await axios.get("/users/friends/"+currId);
          setFriends(res.data);
        }catch(err){
          console.log("Error while fetching friends in ChatOnline.jsx ",err)
        }
      }
      getFriends();
      console.log("Friends:",friends);
    },[currId]);

    useEffect(()=>{
      setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)));
    },[friends,onlineUsers]);
    
  return (
    <div className="chatOnline">
      {onlineFriends.map(f=>(
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer" onClick={()=>{handleClick(f)}}>
                <img src={f && f.profilePicture? PF+"/"+f.profilePicture : PF+"/p2.jpg"} alt="" className="chatOnlineProfile" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName" onClick={()=>{handleClick(f)}}>{f.username}</span>
        </div>
      ))}
      
    </div>
  )
}
