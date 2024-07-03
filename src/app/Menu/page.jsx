import React from 'react'
import { Suspense } from "react";
import FetchAllData from './FetchAllData';
import Pageloader from '../loaders/pageloader';

function page() {
  return (
    <Suspense fallback={<Pageloader/>}>
      <FetchAllData/>
      </Suspense>
  )
}

export default page