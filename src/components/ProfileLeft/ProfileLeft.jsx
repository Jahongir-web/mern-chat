import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import { InfoCard } from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'


export const ProfileLeft = () => {
  return (
    <div className='profile-side'>
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  )
}
