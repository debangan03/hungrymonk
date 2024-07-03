import React, { Suspense } from 'react'
import Pageloader from '../loaders/pageloader'
import Order from './Order'

function page() {
  return (
    <div><Suspense fallback={<div><Pageloader/></div>}>
        <Order/>
        </Suspense>
    </div>
  )
}

export default page