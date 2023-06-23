import "./sidebar.css"
import {RssFeed, VideoLibrary, Groups, Bookmark, HelpOutlineRounded, WorkRounded, Event, School, ExpandMore} from "@mui/icons-material"
import CloseFriend from "../closeFriend/CloseFriend";

export default function SideBar(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon" style={{color: "rgb(11, 180, 255)"}}/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoLibrary className="sidebarIcon" style = {{color: "rgb(240, 83, 115)"}}/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Groups className="sidebarIcon" style = {{color: " rgb(0, 100, 200)"}}/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" style = {{color:"rgb(255, 213, 0)"}}/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutlineRounded className="sidebarIcon" style = {{color: "rgb(12, 12, 102)"}}/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkRounded className="sidebarIcon" style = {{color: "lightsalmon"}}/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" style = {{color: "pink"}}/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" style = {{color: "green"}}/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                    <li className="sidebarListItem">
                        <ExpandMore className="sidebarIcon" style = {{color: "gray"}}/>
                        <span className="sidebarListItemText">See more</span>
                    </li>
                </ul>
                {/* <button className="sidebarButton">Show more</button> */}
                <hr className="sidebarHr"/>
                <div className="newPeopleContainer">
                    <div className="TitleBoxP">
                        <div className="TitleBox">
                            <h4 className="newPeopleContainerTitle" >People you may know</h4>
                        </div>
                    </div>
                    <div className="newPeopleWrapper">
                        <div className="newPeopleItem">
                            <img src={PF+"/"+"c2.jpg"} alt="" className="newPeopleItemImg" />
                            <div className="nameAndBtn">
                                <span className="newPeopleItemName">Ashish Reddy</span>
                                <button className="newPeopleFollowButton">Follow</button>
                            </div>
                        </div>
                        <div className="newPeopleItem">
                            <img src={PF+"/"+"p3.jpg"} alt="" className="newPeopleItemImg" />
                            <div className="nameAndBtn">
                                <span className="newPeopleItemName">Chohan Singh</span>
                                <button className="newPeopleFollowButton">Follow</button>
                            </div>
                        </div>
                        <div className="newPeopleItem">
                            <img src={PF+"/"+"p2.jpg"} alt="" className="newPeopleItemImg" />
                            <div className="nameAndBtn">
                                <span className="newPeopleItemName">Santosh Kumar</span>
                                <button className="newPeopleFollowButton">Follow</button>
                            </div>
                        </div>
                        <div className="newPeopleItem">
                            <img src={PF+"/"+"defaultProfile.jpg"} alt="" className="newPeopleItemImg" />
                            <div className="nameAndBtn">
                                <span className="newPeopleItemName">Sumukh V</span>
                                <button className="newPeopleFollowButton">Follow</button>
                            </div>
                        </div>
                        <div className="newPeopleItem">
                            <img src={PF+"/"+"p6.jpg"} alt="" className="newPeopleItemImg" />
                            <div className="nameAndBtn">
                                <span className="newPeopleItemName">Prem Kumar G</span>
                                <button className="newPeopleFollowButton">Follow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}