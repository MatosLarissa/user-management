"use client"

import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from "react"
import { User } from "../service/endpoint/user/types/user.type"
import { UserEdit } from "../service/endpoint/user/types/userEdit.type"
import UserUnauthorizedCustomException from "@/back/user/exceptions/userUnauthorizedCustom.exception"
import { verifyTokenTeste } from "@/shared/utils/hashManagerFunction.util"
import { UserLogin } from "../service/endpoint/user/types/userLogin.type"
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
  inputCreateUser: UserEdit
  setInputCreateUser: React.Dispatch<React.SetStateAction<UserEdit>>
  inputLoginUser: UserLogin
  setInputLoginUser: React.Dispatch<React.SetStateAction<UserLogin>>
}

interface UserProviderProps {
  children: ReactNode;
}
const defaultUser: UserEdit = { firstName: "", lastName: "", birthDate: "", email: "", password: "" }
const defaultUserLogin: UserLogin = { email: "", password: "" }

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(null)
  const [userData, setUserData] = useState<User[]>([])
  const [userObject, setUserObject] = useState<UserEdit>(null)
  const [user, setUser] = useState<UserEdit>(defaultUser)
  const [inputCreateUser, setInputCreateUser] = useState<UserEdit>(defaultUser)
  const [inputLoginUser, setInputLoginUser] = useState<UserLogin>(defaultUserLogin)

  const clearToken = () => {
    localStorage.removeItem("userToken")
    setToken(null)
  }

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

  useEffect(() => {
    const checkTokenAndFetchUserData = async () => {
      if(token){
        const isValidToken = await fetchCheckToken(token)
        if(isValidToken){
          async function fetchUserData(tokenString: string) {
            try {
              const validUser = await verifyTokenTeste(tokenString)
              if (validUser) {
                localStorage.setItem("userToken", token)
                const userData: User[] = [validUser]
                setUserData(userData)
              } else {
                setUserData([])
                throw new UserUnauthorizedCustomException()
              }
            } catch (error) {
              console.log("Error fetching user data:", error)
              console.error("Error fetching user data:", error)
            }
          }
          fetchUserData(token)
        }
      }
    }
    checkTokenAndFetchUserData()
  }, [token])

  useEffect(() => {
  }, [userData,user])

  return (
    <UserContext.Provider value={{ token, setToken, clearToken, userData, setUserData, user, setUser, userObject, inputCreateUser, setInputCreateUser, inputLoginUser, setInputLoginUser }}>
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
