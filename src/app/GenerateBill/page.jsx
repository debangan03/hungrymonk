import React, { Suspense } from 'react'
import Bill from './Bill'
import Pageloader from '../loaders/pageloader'

function page() {
  return (
    <Suspense fallback={<Pageloader/>}>
      <Bill/>
      </Suspense>
  )
}

export default page