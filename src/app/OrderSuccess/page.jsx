import React, { Suspense } from 'react'
import SuccessPage from './Order'
import LoadingPage from '../loaders/LoadingPage'

function page() {
  return (
    <div><Suspense fallback={<div><LoadingPage/></div>}>
        <SuccessPage/>
        </Suspense>
    </div>
  )
}

export default page