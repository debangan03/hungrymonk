import React, { Suspense } from 'react'
import Orders from './Orders'
import Footer from '../Menu/Footer'
import Pageloader from '../loaders/pageloader'

function page() {
  return (
    <div><Suspense fallback={<div><Pageloader/></div>}>
      <Orders/>
    <Footer/>
    </Suspense></div>
  )
}

export default page