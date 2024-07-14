import React from 'react'
import { Suspense } from "react";
import FetchAllData from './FetchAllData';
import LoadingPage from '../loaders/LoadingPage';

function page() {
  return (
    <Suspense fallback={<LoadingPage/>}>
      <FetchAllData/>
      </Suspense>
  )
}

export default page