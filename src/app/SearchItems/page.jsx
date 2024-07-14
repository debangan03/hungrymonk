import React, { Suspense } from 'react'
import SearchPage from './SearchPage'
import LoadingPage from '../loaders/LoadingPage'

function page() {
  return (
    <div><Suspense fallback={<div><LoadingPage/></div>}>
        <SearchPage/>
        </Suspense>
    </div>
  )
}

export default page