import React from 'react'

import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"
import { NewTransaction } from '../NewTransaction'


const Header = () => {
  return (
    <header className='container flex w-full h-36 justify-between items-center'>

        <img className='w-32' src={logo} alt="Imagem Logo" />


       <NewTransaction />



    </header>
  )
}

export default Header