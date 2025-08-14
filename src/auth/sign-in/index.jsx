import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className='flex justify-center mt-30 items-center'>
      <SignIn />
    </div>
  )
}

export default SignInPage