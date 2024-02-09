import GuestNavBar from '@/components/ui/guestnavbar'
import Herosection from '@/components/ui/herosection'
import HerosectionGuest from '@/components/ui/herosectionguest'
import React from 'react'

const WelcomePageLoggedOut = () => {

  return (
    <div>
      <GuestNavBar/>
      <HerosectionGuest/>
    </div>
  )
}

export default WelcomePageLoggedOut
