import React from 'react'
import SmallViewItem from './SmallViewItem'
import Heading from './Heading'

function BestSeller() {
    return (
        <>
          <Heading heading={'Best Selling'}/>
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

export default BestSeller