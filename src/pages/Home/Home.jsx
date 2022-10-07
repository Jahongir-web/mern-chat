import React from 'react'
import { PostSide } from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import { RightSide } from '../../components/RightSide/RightSide'

import "./Home.css"

export const Home = () => {
  
  return (
    <div className='home'>
      <ProfileSide/>
      <PostSide />
      <RightSide />
    </div>

  )
}
