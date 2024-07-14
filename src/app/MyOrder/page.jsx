import React, { Suspense } from 'react'
import LoadingPage from '../loaders/LoadingPage'
import Order from './Order'

function page() {
  return (
    <div><Suspense fallback={<div><LoadingPage/></div>}>
        <Order/>
        </Suspense>
    </div>
  )
}

export default page