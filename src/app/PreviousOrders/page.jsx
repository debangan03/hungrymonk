import React, { Suspense } from 'react'
import Orders from './Orders'
import Footer from '../Menu/Footer'
import LoadingPage from '../loaders/LoadingPage'

function page() {
  return (
    <div><Suspense fallback={<div><LoadingPage/></div>}>
      <Orders/>
    <Footer/>
    </Suspense></div>
  )
}

export default page