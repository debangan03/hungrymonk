"use client"

import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Header from './Header';
import SomethingNew from './SomethingNew';
import BestSeller from './BestSeller';
import DisplayCategorywisemenu from './DisplayCategorywisemenu';
import Orderviewer from './Orderviewer';
import Footer from './Footer';

function FetchAllData() {
    const searchParams=useSearchParams();
    useEffect(() => {
        const restaurant_id = searchParams.get("id");
        const table_number = searchParams.get("table");
        const getmenu=async()=>{
          const res= await axios.post('/api/fetchrestaurantmenu',{restaurant_id});
          console.log(res);
        }
        getmenu();      
    }, [])
    
  return (
    <div>
      <Header />
      {/* <What_your_mood /> */}
      <SomethingNew />
      <BestSeller />
      <DisplayCategorywisemenu />
      <Orderviewer />
      <Footer />
    </div>
  )
}

export default FetchAllData