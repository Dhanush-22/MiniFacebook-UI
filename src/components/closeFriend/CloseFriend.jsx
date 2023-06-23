import "./closeFriend.css"

export default function CloseFriend() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
    <img src={PF+"/m1.jpg"} alt="" className="sidebarFriendImg" />
    <span className="sidebarFriendName">Friend1</span>
    </li>
  )
}
