import React from 'react'
import { useState } from 'react'
import { NavIcons } from '../NavIcons/NavIcons'
import { ShareModal } from '../ShareModal/ShareModal'
import { TrendCard } from '../TrendCard/TrendCard'

import "./RightSide.css"

export const RightSide = () => {
  const [openModal, setOpenModal] = useState(false)
  
  return (
    <div className='right-side'>
      {/* navabr */}
      <NavIcons />

      {/* top Posts */}
      <TrendCard />
      {/* Share modal */}
      <button className="button r-button" onClick={()=> setOpenModal(true)}>
        Share
        <ShareModal openModal = {openModal} setOpenModal = {setOpenModal}/>
      </button>
    </div>
  )
}
