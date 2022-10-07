import React from 'react'
import {Modal} from "@mantine/core"

import "./ShareModal.css"
import { PostShare } from '../PostShare/PostShare'

export const ShareModal = ({openModal,setOpenModal}) => {
  console.log(openModal);
  return (
    <Modal 
      onClose={()=> setOpenModal(false)}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={openModal}
    >
      <button onClick={()=> setOpenModal(false)}>X</button>
      <PostShare />
    </Modal>
  )
}
