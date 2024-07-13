import React, { Suspense } from 'react'
import Pageloader from '../loaders/pageloader'
import Tip from './Tip'
import Script from 'next/script'

function page() {
  return (
    <div><Suspense fallback={<div><Pageloader/></div>}>
        <Tip/>
        </Suspense>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"
    />
    </div>
  )
}

export default page