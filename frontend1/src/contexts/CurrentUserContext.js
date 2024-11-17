import React from "react";
import api from "../../src/utils/api";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = React.useState({name:"", about:"", avatar:""});


  React.useEffect(() => {
    api
    .getUserInfo()
    .then((data) => {
      
      setCurrentUser(data.user);
    })
    .catch((err) => {
      console.error(err);
    });
  }, [])
 
 
  
  
  return(
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
      </CurrentUserContext.Provider>
  )
}
