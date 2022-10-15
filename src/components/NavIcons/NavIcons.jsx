import React from 'react'
import { Link } from 'react-router-dom'
import Home from "../../img/home.png"
import Chat from "../../img/comment.png"
import Logout from "../../img/logout.png"
import {UilSetting} from "@iconscout/react-unicons"
import { useInfoContext } from '../../context/Context'
import { ProfileModal } from '../ProfileModal/ProfileModal'

export const NavIcons = () => {

  const {setUser, modalOpened, setModalOpened} = useInfoContext()
  return (
    <div className='nav-icons'>
      <Link to={"/home"} >
        <img src={Home} alt="home_icon" />
      </Link>
      <Link to={""} onClick={() => setModalOpened(true)} >
        <UilSetting />
      </Link>
      <Link to={"/chat"} >
        <img src={Chat} alt="chat_icon" />
      </Link>
      <Link to={""} onClick={() => {
          localStorage.clear()
          setUser(null)
        }}>
        <img src={Logout} alt="exit_icon" />
      </Link>
      <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
    </div>
  )
}
