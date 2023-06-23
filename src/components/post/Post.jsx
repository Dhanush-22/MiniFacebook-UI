import "./post.css"
import {MoreVert, ThumbUp, Favorite} from "@mui/icons-material"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import AuthContext from "../../context/AuthContext"

export default function Post({post}) {

  const {user:currUser} = useContext(AuthContext);

  const [like,setLike] = useState(post.likes.length); 
  const [isLiked,setIsLiked] = useState(post.likes.includes(currUser._id)? true:false);
  const [user, setUser] = useState([]);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const url = 'https://minifacebook-restapi.onrender.com/api/users?userId=' + post.userId;
      const res =  await axios.get(url);
      setUser(res.data);
    };
    fetchUser();
  },[post.userId]);

  const likeHandler = async()=>{
    try{
      await axios.put("https://minifacebook-restapi.onrender.com/api/posts/"+ post._id +"/like",{userId:currUser._id});
    }catch(err){
      console.log("Error while liking the post.."+err);
    }
    setLike(isLiked? like-1 : like+1);
    setIsLiked(!isLiked);
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={'profile/'+user.username}>
                  <img 
                    className="postProfileImg"
                    src={(user.profilePicture)?(PF+"/"+user.profilePicture):(PF+"/defaultProfile.jpg")} 
                    alt="" />
                </Link>
                <span className="postUsername">
                  {/* {user.username.charAt(0).toUpperCase() + user.username.slice(1)} */}
                  {user.username}
                </span>
                {/* { // eslint-disable-next-line} */}
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className="postTopRight">
                <MoreVert/>
              </div>
            </div>

            <div className="postCenter">
              <span className="postText">{post.desc}</span>
              <img src= {PF+"/"+post.img} alt="" className="postImg"/>
            </div>

            <div className="postBottom">
              <div className="postBottomLeft">
                <span onClick={likeHandler} className="makeCircularLike">
                  <ThumbUp className="likeIcon"/>
                </span>
                <span onClick={likeHandler} className="makeCircularHeart">
                  <Favorite className="heartIcon"/>
                </span>
                <div className="postLikeCounter">{isLiked? (("You "+ ((like-1 <= 0)? " like it" : " and " + (like - 1) + " people like it")))
                : ((like === 0)? " " : (like + " people like it"))}</div>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText"> 5 comments</span>
              </div>    
            </div>

        </div>
    </div>
  )
}
