import React from 'react'
import {Modal} from "@mantine/core"
import { useInfoContext } from '../../context/Context'
import { useState } from 'react'
import { uploadImage } from '../../api/UploadRequests'
import { getUser, updateUser } from '../../api/UserRequests'

export const ProfileModal = ({modalOpened, setModalOpened}) => {

  const {user, setUser} = useInfoContext()
  const {password, ...other} = user  
  const [formData, setformData] = useState(other)
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)


  const handleChange = (e)=> {
    setformData({...formData, [e.target.name]: e.target.value})
  }

  const onImageChange = (e)=> {
    if(e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      e.target.name === 'profileImage' ? setProfileImage(img) : setCoverImage(img)
    }
  }

  // for submission
  const handleSubmit = async(e)=> {
    e.preventDefault()
    let userData = formData
    if(profileImage) {
      const data = new FormData()
      data.append('image', profileImage)
      try {
        let res = await uploadImage(data)
        userData.profilePicture = res.data
      } catch (error) {
        console.log(error);
      }
    } 
    if(coverImage) {
      const data = new FormData()
      data.append('image', coverImage)
      try {
        let res = await uploadImage(data)
        userData.coverPicture = res.data
      } catch (error) {
        console.log(error);
      }
    }

    await updateUser(user._id, userData)
    const {data} = await getUser(user._id)
    setUser(data)
    localStorage.setItem('profile', JSON.stringify(data))
    setModalOpened(false)
  }

  return (
    
    <Modal 
      onClose={()=> setModalOpened(false)}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
    >
      <form onSubmit={handleSubmit}  className="info-form">
        <h3>Your Info</h3>
        <div>
          <input onChange={handleChange} type="text" name='firstname' value={formData.firstname} className="info-input" placeholder='First Name'/>

          <input onChange={handleChange} type="text" name='lastname' value={formData.lastname} className="info-input" placeholder='Last Name'/>
        </div>

        <div>
          <input onChange={handleChange} type="text" name='worksAt' value={formData.worksAt} className="info-input" placeholder='Works At'/>
        </div>
        <div>
          <input onChange={handleChange} type="text" name='livesIn' value={formData.livesIn} className="info-input" placeholder='WLives In'/>

          <input onChange={handleChange} type="text" name='country' value={formData.country} className="info-input" placeholder='Country'/>
        </div>
        <div>
          <input onChange={handleChange} type="text" name='relationship' value={formData.relationship} className="info-input" placeholder='Relationship'/>
        </div>

        <div>
          Profile Image
          <input type="file" name='profileImage' onChange={onImageChange}/>
          Cover Image
          <input type="file" name='coverImage' onChange={onImageChange}/>

        </div>

        <button className="button info-btn" type='submit'>Update</button>

      </form>
    </Modal>
  )
}
