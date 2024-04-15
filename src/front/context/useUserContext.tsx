"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { User } from "../service/endpoint/user/types/user.type"
import { UserEdit } from "../service/endpoint/user/types/userEdit.type"
import fetchCheckToken from "../service/endpoint/user/fetchCheckToken"

interface UserContextType {
  token: string;
  setToken: (token: string) => void,
  clearToken: () => void,
  userData: User[] | []
  userObject: UserEdit
  setUserData: React.Dispatch<React.SetStateAction<User[] | []>>
  user: UserEdit
  setUser: React.Dispatch<React.SetStateAction<UserEdit>>
}

interface UserProviderProps {
  children: ReactNode;
}
const defaultUser: UserEdit = { firstName: "", lastName: "", birthDate: "", email: "", password: "" }

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(null)
  const clearToken = () => setToken(null)
  const [userData, setUserData] = useState<User[]>([])
  const [userObject, setUserObject] = useState<UserEdit>(null)
  const [user, setUser] = useState<UserEdit>(defaultUser)

  useEffect(() => {
    if (userData && userData.length > 0) {
      const nameParts = userData[0].name.split(" ")
      const userEditObject: UserEdit = {
        firstName: nameParts[0],
        lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
        birthDate: userData[0].birthDate,
        email: userData[0].email,
        password: userData[0].password,
      }
      setUserObject(userEditObject)
    }
  }, [userData])

  async function fetchUserData(token: string) {
    try {
      const validUser = await fetchCheckToken(token)
      if (validUser) {
        setUserData(validUser)
      } else {
        setUserData([])
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useEffect(() => {
    const userToken = localStorage.getItem("userToken")
    if (userToken) {
      setToken(userToken)
      fetchUserData(userToken)
    }
  }, [])

  useEffect(() => {
  }, [userData,user])

  return (
    <UserContext.Provider value={{ token, setToken, clearToken, userData, setUserData, user, setUser, userObject }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}
