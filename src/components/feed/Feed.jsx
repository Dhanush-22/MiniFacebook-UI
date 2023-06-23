import Share from "../share/Share"
import Post from "../post/Post"
import "./feed.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import AuthContext from "../../context/AuthContext"
import Stories from "../stories/Stories"

export default function Feed({username}) {

  const {user} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  console.log("Username in feed: ",username);
  
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res =  username? await axios.get('https://minifacebook-restapi.onrender.com/api/posts/profile/'+username)
      : await axios.get("https://minifacebook-restapi.onrender.com/api/posts/timeline/"+user._id);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  },[username,user._id]);

  const urlC = String(window.location.href);
  const lastChar = urlC.charAt(urlC.length-1);
  
  return (
    <div className="feed">
        <div className="feedWrapper">
          {(lastChar === "/") && <Stories/>}
          {(!username || username === user.username) && <Share/>}
          {posts.map((p) => (
            <Post key={p._id} post={p}/>
          ))}
        </div>
    </div>
  )
}
