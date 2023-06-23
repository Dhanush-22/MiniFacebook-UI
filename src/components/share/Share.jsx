import "./share.css"
import {PermMedia, EmojiEmotions, LocalOffer, AddLocation} from "@mui/icons-material"
import {Link} from "react-router-dom"
import { useContext, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios"
import {Cancel} from "@mui/icons-material"

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file,setFile] = useState(null);

  const submitHandler = async (e)=>{
    e.preventDefault();
    const newPost = {
      userId : user._id,
      desc : desc.current.value
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      newPost.img = fileName;
      try{
        await axios.post("https://minifacebook-restapi.onrender.com/api/upload",data);
      }catch(err){
        console.log("Error while uploading"+err);
      }
    }
    try{
      await axios.post("https://minifacebook-restapi.onrender.com/api/posts",newPost);
      window.location.reload();
    }catch(err){
      console.log("Error while posting"+err);
    }
  };

  return (
    <div className="share">
    <div className="shareWrapper">
      <div className="shareTop">
        <Link to={"/profile/"+user.username} style={{textDecoration:"none"}}>
          <img src={(user.profilePicture)?PF+"/"+user.profilePicture:PF+"/defaultProfile.jfif"} alt="" className="shareProfileImg" />
        </Link>
        <input type="text"
          spellCheck="false" 
          placeholder={"Hello "+ user.username.charAt(0).toUpperCase() + user.username.slice(1) + ", post/share something for your followers."} 
          className="shareInput"
          ref = {desc}
          />
      </div>
      <hr className="shareHr" />

      {file && (
        <div className="shareImgContainer">
          <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
          <Cancel className="shareCancel" onClick = {()=> setFile(null)}/>
        </div>
      )}
      
      <form className="sharebottom" onSubmit={submitHandler}>
        <div className="shareOptions">
          <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="red" className="shareOptionIcon"/>
              <span className="shareOptionText">Photo or Video</span>
              <input 
                style={{display:"none"}}
                type="file" 
                id="file" 
                accept=".png, .jpeg, .jfif, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
                 />
          </label>
          <div className="shareOption">
              <LocalOffer style = {{color:"rgb(255, 160, 255)"}} className="shareOptionIcon"/>
              <span className="shareOptionText">Tag</span>
          </div>
          <div className="shareOption">
              <AddLocation htmlColor="green" className="shareOptionIcon"/>
              <span className="shareOptionText">Location</span>
          </div>
          <div className="shareOption">
              <EmojiEmotions style = {{color:"rgb(255, 160, 0)"}} className="shareOptionIcon"/>
              <span className="shareOptionText">Feelings</span>
          </div>
        </div>
        <button className="shareButton" type="submit">Share</button>
      </form>
      
    </div>
    </div>
  )
}
