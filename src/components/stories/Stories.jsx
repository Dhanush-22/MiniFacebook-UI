import "./story.scss"
import {Add} from "@mui/icons-material"
import AuthContext from "../../context/AuthContext";
import { useContext} from "react";

export default function Story() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    return(
    <div className="stories">
        <div className="story">
            <img 
            className="createStoryImg"
            src={(user.profilePicture)?PF+"/"+user.profilePicture:PF+"/defaultProfile.jfif"} 
                alt = ""
            />
            <Add className="icon"/>
            <span className="createStory">Create Story</span>
        </div>
        <div className="story">
            <img src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/339600/339696.jpg" alt="" />
            <span>MS Dhoni</span>
        </div>
        <div className="story">
            <img src="https://img.onmanorama.com/content/dam/mm/en/sports/cricket/images/2022/7/30/rohit-sharma.jpg" alt="" />
            <span>Rohit Sharma</span>
        </div>
        <div className="story">
            <img src="https://mobimg.b-cdn.net/v3/fetch/a6/a6cb442b49cfe67369016c2459f8acbf.jpeg" alt="" />
            <span>Jane Doe</span>
        </div>
        <div className="story">
            <img src="https://i.pinimg.com/736x/84/70/94/847094a5d2df67f4fc7a7a6b77bcfe7b.jpg" alt="" />
            <span>Ellyse Perry</span>
        </div>
    </div>
    )
}
