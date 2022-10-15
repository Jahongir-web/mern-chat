const { createContext, useContext, useState, useEffect } = require("react");

const {getTimelinePosts} = require("../api/PostRequests")

const InfoContext = createContext()

export const useInfoContext = () => useContext(InfoContext)

export const InfoProvider = ({children}) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) || null)

  const [loading, setLoading] = useState(false)

  const [posts, setPosts] = useState([])

  const [modalOpened, setModalOpened] = useState(false)

  const serverPublic = "http://localhost:4001/"

// get posts
  useEffect(() => {
    ;(async()=> {
      const {data} = await getTimelinePosts(user._id)
      setPosts(data)
    })()
  }, [user])

  const value = {
    user,
    setUser,
    serverPublic,
    loading,
    setLoading,
    posts,
    setPosts,
    modalOpened,
    setModalOpened
  }

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>
        {
          ()=>children
        }
      </InfoContext.Consumer>
    </InfoContext.Provider>
  )
}

