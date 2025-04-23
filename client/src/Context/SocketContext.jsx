import { createContext,useContext, useEffect ,useState} from 'react'
import { useAuth } from '../pages/auth/Context'
import io from 'socket.io-client'
const socketContext = createContext()

export const useSocketContext = () => {
    return useContext(socketContext)
}

export const SocketProvider = ({ children }) => { 
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {backendUser} = useAuth()
    useEffect(()=>{
        if(backendUser){
            const newSocket = io('http://localhost:3000', {
                query: { userId: backendUser._id },
                headers: {
                    Authorization: `Bearer ${backendUser.token}`,
                },
            });
            setSocket(newSocket);
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
            return()=>{
                newSocket.emit('disconnec', backendUser._id);
                newSocket.close();
            }
        }else{
            socket?.close()
            setSocket(null)
        }
    },[backendUser])

    return(
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    )
    }

    