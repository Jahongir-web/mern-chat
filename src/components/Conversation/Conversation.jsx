import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../api/UserRequests'
import { useInfoContext } from '../../context/Context'

export const Conversation = ({data, currentUser, online}) => {
  const {serverPublic} = useInfoContext()
  const [userData, setUserData] = useState(null)
  console.log(userData);

  useEffect(()=> {
    const userId = data.members.find(id => id!==currentUser)

    const getUserData = async () => {

      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error);
      }
    }

    getUserData()
  }, [])

  return (
    <>
      <div className='follower conversation'>
        <div>
          {
            online && <div className='online-dot'></div>
          }
          <img src={userData?.profileImage ? serverPublic + userData.profileImage : serverPublic + "defaultProfile.png"} alt="profile" className="followerImage" style={{width: '50px', height: '50px'}}/>
          <div className="name" style={{fontSize:"16px"}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online ? '#51e200' : ""}}>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
