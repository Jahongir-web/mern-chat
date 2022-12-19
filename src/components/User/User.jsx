import React, { useState } from 'react'
import { followUser, getUser, unfollowUser } from '../../api/UserRequests'
import { useInfoContext } from '../../context/Context'

export const User = ({person}) => {

  const {user, setUser, serverPublic} = useInfoContext()
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  )

  const handleFollow = async () => {
    setFollowing((prev) => !prev)
    following 
     ? (await unfollowUser(person._id, user)) 
     : (await followUser(person._id, user))  
    const {data} = await getUser(user._id) 
    setUser(data)
    localStorage.setItem('profile', JSON.stringify(data))
  }
  
  return (
    <div className='follower'>
      <div>
        <img src={
          person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png"
        } alt="profile" className='followerImage'/>
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button onClick={handleFollow} className={following ? "button fc-button UnfollowButton" : "button fc-button"}>{following ? "Unfollow" : "Follow"}</button>
    </div>
  )
}
