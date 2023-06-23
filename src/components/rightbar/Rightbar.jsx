import "./rightbar.css"
import {Link} from "react-router-dom"
import Online from "../online/Online"
import { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {Add, Remove} from "@mui/icons-material"
import {io} from "socket.io-client"

export default function Rightbar({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user:currUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(currUser.followings.includes(user && user._id));
  const [onlineFrnds, setOnlineFrnds] = useState([]);
  const socket = useRef();

  useEffect(()=>{
    // socket.current = io("ws://localhost:8900");
    socket.current = io("wss://minifacebook-socket.onrender.com");
  },[]);

  useEffect(()=>{
    socket.current.emit("addUser", currUser._id);
    socket.current.on("getUsers",users=>{
      setOnlineFrnds(currUser.followings.filter(f=>users.some((u)=> u.userId === f)));
    })
  },[currUser]);


  /*
      

      socket.current.on("getUsers",users=>{
      // console.log("Online:",users);
      setOnlineUsers(user.followings.filter(f=>users.some((u)=> u.userId === f)));
    })
  
  */
  
  useEffect(()=>{
    setFollowed(currUser.followings.includes(user && user._id));
  },[currUser,user])

  useEffect(()=>{
    const getFriends = async ()=>{
      try{
        if(user){
          const friendList = await axios.get("https://minifacebook-restapi.onrender.com/api/users/friends/"+user._id);
          setFriends(friendList.data);
        }
      }catch(err){
        console.log(err);
      }
    }
    getFriends();
  },[user])

  const handleClick = async () =>{
    try{
      if(followed){
        await axios.put("https://minifacebook-restapi.onrender.com/api/users/"+user._id+"/unfollow",{userId:currUser._id});
        dispatch({type:"UNFOLLOW", payload:user._id});
      }else{
        await axios.put("https://minifacebook-restapi.onrender.com/api/users/"+user._id+"/follow",{userId:currUser._id});
        dispatch({type:"FOLLOW", payload:user._id});
      }
      setFollowed(!followed);
    }catch(err){
      console.log("Error while trying to follow "+err);
    }
    
  }

  const HomeRightbar = ()=>{
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
      <>
          <div className="birthdayContainer">
            <img src={PF+"/gift.png"} alt="" className="birthdayImg" />
            <span className="birthdayText"> <b>Aaron</b> and <b>3 other friends </b>birthday</span>
          </div>
          <img src={PF+"/ad.jpg"} alt="" className="rightbarAd" />
          <hr className="rightBarHR" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <div className="rightbarFriendList">
            {onlineFrnds.map(o=>(<Online userId={o}/>))}
          </div>
      </>
    )
  }

  const ProfileRigthbar = () =>{
    return(
      <>
        {user.username !== currUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed? "Unfollow" : "Follow"}
            {followed? <Remove/> : <Add/>}
          </button>
        )}
        {(user.city || user.from || user.relationship) && (
          <>
          <h4 className="rightbarTitle">User Information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              {user.city && 
                (<>
                  <span className="rightbarInfoKey">City</span>
                  <span className="rightbarInfoValue">{user.city}</span>
                </>
                )
              }
            </div>
            <div className="rightbarInfoItem">
              {user.from && 
                (<>
                  <span className="rightbarInfoKey">From</span>
                  <span className="rightbarInfoValue">{user.from}</span>
                </>
                )
              }
            </div>
            <div className="rightbarInfoItem">
              {user.relationship && 
                (<>
                  <span className="rightbarInfoKey">Relationship</span>
                  <span className="rightbarInfoValue">{user.relationship === 1? "Single" : (user.relationship===2? "Married" : "Empty")}</span>
                </>
                )
              }
            </div>
          </div>
          </>
        )}

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend =>(
            <div key={friend._id} className="rightbarFollowing">
              <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
                <img src={(friend && friend.profilePicture)? PF+"/"+friend.profilePicture: PF+"/defaultProfile.jpg"} alt="" className="rightbarFollowingImg" />
              </Link>
              <span className="rightbarFollowingname">{friend.username}</span>
            </div>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
          {user? <ProfileRigthbar/> : <HomeRightbar/>}
        </div>
    </div>
  )
}

/*
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
      </Routes>
    </Router>
*/


/*
  return (
  <div style={{margin:"-10px -10px 0px -10px", padding:"0"}}>
  <Login/>
  </div>
  );

*/
