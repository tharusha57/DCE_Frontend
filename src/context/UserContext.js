import { createContext , useReducer , useEffect} from "react";

export const UserContext = createContext()

export const userReducer = (state , action) => {
    switch(action.type) {
        case 'USER_CREATED':
            return {
                username : action.payload.username,
                email : action.payload.email,
                id : action.payload.id
            }

        case 'USER_DELETED':
            return {
                username : null,
                email : null,
                id : null
            }
            
        default:
            return state
    }
}

export const UserContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(userReducer , {
        username : null,
        email : null,
        id : null
    })

    useEffect(() => {
        const userState = JSON.parse(localStorage.getItem('userState'))
    
        if (userState) {
          console.log(userState)
          dispatch({ type: 'USER_CREATED', payload: userState })
        }
      }, [])

    // useEffect(()=> {
    //     localStorage.setItem('userState' , JSON.stringify(state))
    // } , [state])

    return <UserContext.Provider value={{...state , dispatch}}>
        {children}
    </UserContext.Provider>
}