import React, { Suspense } from 'react'
import SearchPage from './SearchPage'
import Pageloader from '../loaders/pageloader'

function page() {
  return (
    <div><Suspense fallback={<div><Pageloader/></div>}>
        <SearchPage/>
        </Suspense>
    </div>
  )
}

export default page