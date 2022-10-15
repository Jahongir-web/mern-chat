import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { userChats } from '../../api/ChatReruests'
import { ChatBox } from '../../components/ChatBox/ChatBox'
import { Conversation } from '../../components/Conversation/Conversation'
import LogoSearch from "../../components/LogoSearch/LogoSearch"
import { NavIcons } from '../../components/NavIcons/NavIcons'
import { useInfoContext } from '../../context/Context'

import "./Chat.css"

export const Chat = () => {
  const socket = useRef()
  const {user} = useInfoContext()

  const [chats, setChats] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)

  // Get the chat in the sections
  useEffect(()=> {
    const getChats = async () => {
      try {
        const {data} = await userChats()
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    }

    getChats()
  }, [user._id])

  // connect to socket.io
  useEffect(()=> {
    socket.current = io("ws://localhost:8800")

    socket.current.emit("new-user-add", user._id)

    socket.current.on("get-users", (users)=> {
      setOnlineUsers(users)
    })

  }, [user])

  // send message to socket server
  useEffect(() => {
    if(sendMessage !== null) {
      socket.current.emit("send-message", sendMessage)
    }
  }, [sendMessage])

  // Get the message from socket server 
  useEffect(()=> {
    socket.current.on('recieve-message', (data) => {
      setReceivedMessage(data)
    })
  }, [])

  const checkOlineStatus = (chat) => {
    const chatMember = chat.members.find((member)=> member !== user._id)

    const online = onlineUsers.find((user)=> user.userId === chatMember)

    return online ? true : false
  }

  return (
    <div className='chat'>
      {/* left side */}
      <div className="left-side-chat">
        <LogoSearch />

        <div className="chat-container">
          <h2>Chats</h2>
          <div className="chat-list">
            {
              chats.map((chat, i) => {
                return(
                  <div key={i} onClick={()=>setCurrentChat(chat)}>
                    <Conversation data={chat} currentUser={user._id} online={checkOlineStatus(chat)} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="right-side-chat">
        <div style={{width: "20rem", alignSelf: "flex-end"}}>
          <NavIcons />
        </div>
        <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
      </div>
    </div>
  )
}
