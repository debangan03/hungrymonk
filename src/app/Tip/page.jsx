import React, { Suspense } from 'react'
import LoadingPage from '../loaders/LoadingPage'
import Tip from './Tip'
import Script from 'next/script'

function page() {
  return (
    <div><Suspense fallback={<div><LoadingPage/></div>}>
        <Tip/>
        </Suspense>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"
    />
    </div>
  )
}

export default page