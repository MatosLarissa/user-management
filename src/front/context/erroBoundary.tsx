"use client"

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"
import ErrorComponent from "../component/error/error"

interface ErrorContextProps {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}


interface Props {
  children: ReactNode;
}

const ErrorContext = createContext<ErrorContextProps>({ error: null, setError: () => {} })

export const useErrorContex = () => useContext(ErrorContext)

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (error) {
      timeout = setTimeout(() => {
        setError(null)
      }, 2000)
    }
    return () => clearTimeout(timeout)
  }, [error])

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {error ? <ErrorComponent message={error || "Something went wrong."} /> : children}
    </ErrorContext.Provider>
  )
}
