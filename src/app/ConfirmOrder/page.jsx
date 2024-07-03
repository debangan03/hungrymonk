import React, { Suspense } from 'react'
import ConfirmOrder from './ConfirmOrder'
import Pageloader from '../loaders/pageloader'

function page() {
  return (
    <div><Suspense fallback={<div><Pageloader/></div>}>
        <ConfirmOrder/>
        </Suspense>
    </div>
  )
}

export default page