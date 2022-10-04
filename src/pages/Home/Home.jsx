import React from 'react'
import { PostSide } from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import { useInfoContext } from '../../context/Context'

import "./Home.css"

export const Home = () => {
  const {user, setUser} = useInfoContext()
  
  return (
    <div className='home'>
      <ProfileSide/>
      <PostSide />
      {/* <RightSide /> */}
      <div>
        <button onClick={() => {
          localStorage.clear()
          setUser(null)
        }}>Log Out</button>
      </div>
    </div>

  )
}
