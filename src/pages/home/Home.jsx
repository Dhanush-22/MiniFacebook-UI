import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import "./home.css"
import { useEffect } from "react";


function Home(){
    useEffect(() => {
        // Reset the zoom level to 100% on component mount
        window.document.body.style.zoom = '100%';
      }, []);
    return (
        <>
            <TopBar/>
            <div className="homeContainer">
                <SideBar/>
                <Feed/>
                <Rightbar/>
            </div>
        </>
    );
}


export default Home;