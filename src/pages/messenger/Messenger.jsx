import "./messenger.css"
import TopBar from "../../components/topbar/TopBar"
import CloseFriend from "../../components/closeFriend/CloseFriend"
import Message from "../../components/message/Message"
import {Search, Chat, VideoCall, MoreHoriz, Call, Videocam, Info, AddCircle, Collections, EmojiEmotions, GifBox, Send, ConstructionOutlined, Facebook, Notifications} from "@mui/icons-material"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { useContext, useRef } from "react"
import AuthContext from "../../context/AuthContext"
import { useState, useEffect } from "react"
import axios from "axios"
import Conversation from "../../components/conversation/Conversation"
import {io} from "socket.io-client"

export default function Messenger() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [allConversations, setConversations] = useState([]);
  const [currChat, setCurrChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const socket = useRef()
  const {user} = useContext(AuthContext);
  const scrollRef = useRef(); // to scroll down upon new message


  useEffect(()=>{
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage",data =>{
      setArrivalMsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  },[])

  useEffect(()=>{
    const getUser = async ()=>{
      try{
        const receiverId = currChat.members.filter(m=> m !== user._id);
        const res = await axios.get("/users?userId="+receiverId);
        setReceiver(res.data);
      }catch(err){
        console.log(err);
      }
    }
    if(currChat){
      getUser();
    }
  },[currChat])

  useEffect(()=>{
    arrivalMsg && currChat?.members.includes(arrivalMsg.sender) &&
    setMessages(prev =>[...prev, arrivalMsg])
  },[arrivalMsg, currChat])

  useEffect(()=>{
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers",users=>{
      // console.log("Online:",users);
      setOnlineUsers(user.followings.filter(f=>users.some((u)=> u.userId === f)));
    })
  },[user]);

  
  useEffect(()=>{
    const getConversations = async ()=>{
      try{
        const convos = await axios.get("/conversations/633d6c58cd4d08dc29eb4f43");
        console.log(convos.data);
        setConversations(convos.data);
      }catch(err){
        console.log("Error while fetching conversations ",err);
      }
    }
    getConversations();
  },[user])

  useEffect(()=>{
    if(currChat){
      const getMessages = async ()=>{
        try{
          const msgs = await axios.get("/messages/"+currChat._id);
          setMessages(msgs.data);
        }catch(err){
          console.log("Error while fetching conversations ",err);
        }
      }
      getMessages();
    }
  },[currChat]);


  const handleSendClick = async (e) =>{
    e.preventDefault();
    const message = {
      conversationId:currChat._id,
      sender:user._id,
      text:newMessage
    };
    
    const receiverId = currChat.members.find(m=> m !== user._id);

    socket.current.emit("sendMessage",{
      senderId : user._id,
      receiverId : receiverId,
      text: newMessage
    });

    try{
      const res = await axios.post("/messages",message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    }catch(err){
      console.log("Error while sending a new message ",err);
    }
  };



  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
  },[messages]);




  return (
    <>
      <TopBar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="chatLeftTop">
              <h2 className="chatLeftTopTitle">Chats</h2>
              <div className="chatMenuIcons">
                <div className="chatMenuIcon">
                  <MoreHoriz style={{fontSize:"20px"}}/>
                </div>            
                <div className="chatMenuIcon">
                  <VideoCall style={{fontSize:"20px"}}/>
                </div>            
                <div className="chatMenuIcon">
                  <Chat style={{fontSize:"20px"}}/>
                </div>            
              </div>

            </div>
            <div className="msgsearchbar">
              <Search className = "chatSearchIcon"/>
              <input type="text" placeholder="Search for chat or friend" className="msgsearchInput" />
            </div>
            <hr className="msgHr"></hr>
            <div className="chatFriendsList">
              {allConversations.map(con=>(
                <div onClick={()=>setCurrChat(con)}>
                  <Conversation key={(con)? con._id:"some"}conversation={con} currUser={user}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBarWrapper">
          {
            currChat?
            <>
            <div className="chatBoxTopProfile">
              <div className="chatBoxTopProfileLeft">
                <img src={(receiver && receiver.profilePicture)? PF+"/"+receiver.profilePicture : PF+"/defaultProfile.jpg"} alt="" className="chatBoxTopProfileImg" />
                <span className="chatBoxTopProfileName">{receiver && receiver.username}</span>
              </div>
              <div className="chatBoxTopProfileRightIcons">
                <div className="chatBoxTopProfileRightIcon">
                  <Call/>
                </div>
                <div className="chatBoxTopProfileRightIcon">
                  <Videocam/>
                </div>
                <div className="chatBoxTopProfileRightIcon">
                  <Info/>
                </div>

              </div>
              
            </div>
            <div className="chatBoxTop">
              {messages && messages.map(m=>(
                <div ref={scrollRef}>
                  {(m.sender === user._id)? 
                  <Message key={m._id} own={true} ele={m} imgUrl={user? user.profilePicture : "defaultProfile.jpg"}/> : <Message key={m._id} ele={m} imgUrl={ receiver? receiver.profilePicture : "defaultProfile.jpg"}/>}
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <div className="bottomIcons">
                <div className="bottomIcon">
                  <AddCircle/>
                </div>
                <div className="bottomIcon">
                  <Collections/>
                </div>
                <div className="bottomIcon">
                  <GifBox/>
                </div>
              </div>
              <div className="chatMessageBox">
                <textarea 
                  className="chatMessageInput" 
                  placeholder="Aa"
                  spellCheck="false"
                  onChange={(e)=>setNewMessage(e.target.value)}
                  value = {newMessage}
                  >
                </textarea>
                <div className="emojiIcon">
                  <EmojiEmotions/>
                </div>
              </div>
              <label htmlFor="btn1" className="sendButton" onClick={handleSendClick}>
                <Send className="sendIcon"/>
                <button id= "btn1" className="messageHitButton" style={{display:"none"}}>Send</button>
              </label>
            </div>
          </> : <><span className="noConversation">Open any conversation to start chat.</span></>}
          </div>
        </div>

        {/* Chat Online Wrapper............ */}
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {receiver && (<>

            <div className="friendProfileContainer">
              <div className="friendProfileWrapper">
                <img src={(receiver.profilePicture)? PF+"/"+receiver.profilePicture : PF+"/defaultProfile.jpg"} alt="" className="rightBarFrndImg" />
                <div className="rightbarFrndName">{receiver.username}</div>
              </div>

              <div className="rightbarFrndIcons">
                <div className="rightbarFrndIcon">
                  <div className="rightbarFrndIconBox">
                    <Facebook/>
                  </div>
                  <span className="rightbarIconName">Profile</span>
                </div>

                <div className="rightbarFrndIcon">
                  <div className="rightbarFrndIconBox">
                    <Notifications/>
                  </div>
                  <span className="rightbarIconName">Mute</span>
                </div>

                <div className="rightbarFrndIcon">
                  <div className="rightbarFrndIconBox">
                    <Search/>
                  </div>
                  <span className="rightbarIconName">Search</span>
                </div>
              </div>

            </div>
            </>)}
            <div className="onlineUsersContainer">
              <hr className="rightBarHR" />
              <h4 className="rightbarTitle">Online Friends</h4>
              <ChatOnline 
                onlineUsers={onlineUsers}
                currId={user._id}
                setCurrChat={setCurrChat}/>
            </div>
            </div>
        </div>

      </div>
    </>
  )
}
