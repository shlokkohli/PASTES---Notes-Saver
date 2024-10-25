import React from "react";
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Toaster />
    </>
  )
}

export default Layout