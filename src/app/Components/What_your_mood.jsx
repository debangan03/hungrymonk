import React from 'react'
import Heading from './Heading'
import Image from 'next/image'
import SmallViewItem from './SmallViewItem'

function What_your_mood() {
  return (
    <>
      <Heading heading={'What Your Mood'}/>
      <div className='px-4 -mt-2'>
        <section className="flex noscroll overflow-x-auto space-x-4 p-4">
          <SmallViewItem/>
          <SmallViewItem/>
          <SmallViewItem/>
          <SmallViewItem/>
          <SmallViewItem/>
          <SmallViewItem/>
          <SmallViewItem/>

        </section>
      </div>
    </>
  )
}

export default What_your_mood
