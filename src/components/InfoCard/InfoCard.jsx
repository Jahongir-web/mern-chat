import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {UilPen} from "@iconscout/react-unicons"
import { useParams } from 'react-router-dom'
import { getUser } from '../../api/UserRequests'
import { useInfoContext } from '../../context/Context'
import { ProfileModal } from '../ProfileModal/ProfileModal'

import "./InfoCard.css"

export const InfoCard = () => {
  const {user, modalOpened, setModalOpened} = useInfoContext()
  const params = useParams()
  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})

  useEffect(()=> {
    const fetchProfileUser = async()=> {
      if(profileUserId === user._id) {
        setProfileUser(user)
      } else {
        const profileUser = await getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    fetchProfileUser()
  }, [user])


  return (
    <div className='info-card'>
      <div className="info-head">
        <h4>Profile Info</h4>
        {
          user._id === profileUserId ? (
            <div>
              <UilPen width="2rem" height="1.2rem" onClick={()=> setModalOpened(true)}/>
              <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>

            </div>
          ) : (
            <>
            </>
          )
        }
      </div>

      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
    </div>
  )
}
