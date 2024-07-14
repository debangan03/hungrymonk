import React, { Suspense } from 'react'
import Bill from './Bill'
import LoadingPage from '../loaders/LoadingPage'

function page() {
  return (
    <Suspense fallback={<LoadingPage/>}>
      <Bill/>
      </Suspense>
  )
}

export default page