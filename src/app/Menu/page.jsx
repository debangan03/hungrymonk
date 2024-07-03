import React from 'react'
import { Suspense } from "react";
import FetchAllData from './FetchAllData';
import Pageloader from '../loaders/Pageloader';

function page() {
  return (
    <Suspense fallback={<Pageloader/>}>
      <FetchAllData/>
      </Suspense>
  )
}

export default page