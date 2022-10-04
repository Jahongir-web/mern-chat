import React from 'react'
import { Link } from 'react-router-dom'
import { useInfoContext } from '../../context/Context'

import "./ProfileCard.css"

export default function ProfileCard({location}) {
  const {user, serverPublic, posts} = useInfoContext()
  
  return (
    <div className='profile-card'>
      <div className="profile-images">
      <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt="cover_profile" />

      <img src={user.profilePicture ? serverPublic + user.coverPicture : serverPublic + "defaultProfile.png"} alt="profile_photo" />
      </div>

      <div className="profile-name">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="follow-status">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {
            location === 'profilePage' && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{
                    posts.filter((post) => post.userId === user._id).length
                  }</span>
                  <span>Posts</span>
                </div>
              </>
            )
          }

        </div>
        <hr />
      </div>
      {
        location === "profilePage" ? (
          ""
        ) : (
          <span>
            <Link to={`/profile/${user._id}`} style={{textDecoration: "none", color: "inherit"}}> My Profile</Link>
          </span>
        )
      }
    </div>
  )
}
