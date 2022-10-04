import React from 'react'
import { useParams } from 'react-router-dom'
import { useInfoContext } from '../../context/Context'
import { Post } from '../Post/Post'

import "./Posts.css"


export const Posts = () => {
  const params = useParams()
  const {user, posts, loading} = useInfoContext()

  let filteredPosts = []

  if(posts.length === 0) return "No Posts"
  if(params.id) {
    filteredPosts = posts.filter((post)=> post.userId===params.id)
  } else {
    filteredPosts = posts.filter((post)=> post.userId===user._id)
  }
  
  return (
    <div className='Posts'>
      {
        loading ? "Fetching posts..."
        : filteredPosts.map((post, id) => {
          return <Post data={post} key={id} />
        })
      }
    </div>
  )
}
