import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequests'
import { useInfoContext } from '../../context/Context'
import {addMessage, getMessages} from "../../api/MessageRequests"
import {format} from "timeago.js"
import InputEmoji from "react-input-emoji"

import "./ChatBox.css"
import { useRef } from 'react'

export const ChatBox = ({chat, currentUser, setSendMessage, receivedMessage}) => {
  const {serverPublic} = useInfoContext()
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const imageRef = useRef()
  const scroll = useRef()

  useEffect(()=> {
    // fetching data for header
    const getUserData = async () => {
      const userId = chat?.members?.find(id => id!==currentUser)
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error);
      }
    }

    if(chat !== null) getUserData()

  }, [chat, currentUser])

  // fetch messages

  useEffect(()=> {
    const fetchMessages = async () => {
      try {
        const {data} = await getMessages(chat._id)
        setMessages(data)
      } catch (error) {
        console.log(error);
      }
    }

    if(chat !== null) fetchMessages()
  }, [chat])

  // handle change
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  // Always scroll to last Message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  // Send Message
  const handleSend = async(e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id
    }

    const receivedId = chat?.members?.find(id => id!==currentUser)

    setSendMessage({...message, receivedId})

    try {
      const {data} = await addMessage(message)
      setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.log(error);
    }
  }

  // Recevie message from parent component
  useEffect(() => {
    if(receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage])
    }
  }, [receivedMessage])

  return (
    <>
      <div className="chatbox-container">
        {
          chat ? (
            <>
              {/* chat header */}
              <div className="chat-header">
                <div className="follower">
                  <div>
                    <img src={userData?.profileImage ? serverPublic + userData.profileImage : serverPublic + "defaultProfile.png"} alt="profile" className="followerImage" style={{width: '50px', height: '50px'}}/>
                  </div>
                  <div className="name" style={{fontSize:"16px"}}>
                    <span>{userData?.firstname} {userData?.lastname}</span>
                  </div>
                </div>
                <hr style={{width: "100%", border: "1px solid #ececec", marginTop: "20px"}} />
              </div>

              {/* chat body */}
              <div className="chat-body">
                {
                  messages.map((message, i) => (
                    <>
                      <div ref={scroll} key={i} className={message.senderId === currentUser ? "message own" : "message"}>
                        <span>{message.text}</span>
                        <span>{format(message.createdAt)}</span>
                      </div>
                    </>
                  ))
                }
              </div>

              {/* chat sender */}
              <div className="chat-sender">
                <div onClick={()=> imageRef.current.click()}>+</div>
                <InputEmoji value={newMessage} onChange={handleChange}/>
                <button className="send-button button" onClick={handleSend}>
                  Send
                </button>

                <input type="file" name='messageFile' style={{display: 'none'}} ref={imageRef}/>

              </div>
            </>
          ) : (
            <span className='chatbox-empty-message'>Tap on a chat to start conversation...</span>
          )
        }
      </div>
    </>
  )
}
