import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'

import "./ProfileSide.css"

export default function ProfileSide() {

  return (
    <div className='profile-side'>
      <LogoSearch />
      <ProfileCard location={'homepage'}/>
      <FollowersCard />
    </div>
  )
}
