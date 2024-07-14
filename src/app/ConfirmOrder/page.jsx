import React, { Suspense } from 'react'
import ConfirmOrder from './ConfirmOrder'
import LoadingPage from '../loaders/LoadingPage'

function page() {
  return (
    <div><Suspense fallback={<div><LoadingPage/></div>}>
        <ConfirmOrder/>
        </Suspense>
    </div>
  )
}

export default page