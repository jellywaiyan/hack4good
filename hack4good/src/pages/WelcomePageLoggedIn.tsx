import GuestNavBar from '@/components/ui/guestnavbar'
import React from 'react'
import Herosection from '@/components/ui/herosection'
import { Button, CardFooter } from 'react-bootstrap'
import Footer from '@/components/ui/Footer/Footer'


const WelcomePageLoggedIn = () => {

  return (
    <div>
      <Herosection/>
      <Footer/>
    </div>
  )
}

export default WelcomePageLoggedIn
