import { isAction } from '@reduxjs/toolkit'
import React from 'react'
import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex flex-row gap-4 place-content-between'>
      <NavLink to='/'>
        Home
      </NavLink>

      <NavLink to='/pastes'>
        All Pastes
      </NavLink>
    </div>
  )
}

export default Navbar