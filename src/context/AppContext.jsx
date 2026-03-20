import { createContext, useContext } from "react"
import { doctorsData } from "../assets/assets"


export const AppContext = createContext()

function AppContextProvider (props) {


const value ={
    doctorsData
}

  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider