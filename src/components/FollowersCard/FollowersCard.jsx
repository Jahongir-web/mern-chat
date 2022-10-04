import React, { useEffect, useState } from 'react'
import {getUsers} from "../../api/UserRequests"
import { useInfoContext } from '../../context/Context'
import { User } from '../User/User'

import "./FollowersCard.css"

export default function FollowersCard() {

  const {user} = useInfoContext()

  const [persons, setPersons] = useState([])

  useEffect(()=> {
    const fetchUsers = async () => {
      const {data} = await getUsers()
      setPersons(data)
    }

    fetchUsers()
  }, [])
  return (
    <div className='followers-card'>
      <h3>People you may know</h3>
      {
        persons.map((person, id) => {
          if(person._id !== user._id) {
            return <User person={person} key={id}/>
          }
        })
      }
    </div>
  )
}
