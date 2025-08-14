import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { ResumeInfoContextProvider } from '@/context/ResumeInfoContext';

function App() {
  const { user, isLoaded, isSignedIn } = useUser()
  const params = useParams()
  const [id, setId] = useState()

  useEffect(() => {
    setId(params?.resumeId)
  }, [params?.resumeId])

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />
  }

  return (
    <ResumeInfoContextProvider id={id}>
      <Header />
      <Outlet />
      <Toaster />
    </ResumeInfoContextProvider>
  )
}

export default App
