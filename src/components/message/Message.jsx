import "./message.css"
import {format} from "timeago.js" 

export default function message({own, ele, imgUrl}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
        <div className={own?"message own":"message"}>
            <div className="messageTop">
                <img src={imgUrl? PF+"/"+imgUrl : PF+"/defaultProfile.jpg"} alt="" className="messageImg" />
                <p className='messageText'>{ele.text}</p>
            </div>
            <div className="messageBottom">
                <span>{format(ele.createdAt)}</span>
            </div>
        </div>
        </div>
    )
}
