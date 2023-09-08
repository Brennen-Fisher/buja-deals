import React from 'react'
import './footer.scss';

export default function footer() {
  return (
    <div className='footerSec'>
      <div className='bg-gray-700 h-full w-full'>
        <div className='flex flex-col lg:gap-0 lg:grid lg:grid-cols-5'>
          <div></div>
          <div className='flex flex-col text-white gap-9 pb-5 pt-10'>
            <h1 className='font-bold text-2xl lg:text-4xl'>Contact Us</h1>
            <div className='flex justify-center'>
              <div className='flex flex-col items-start'>
                <h1>Some Phone Number</h1>
                <h1>Some Email</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col text-white gap-9 pb-5 pt-10'>
            <h1 className='font-bold text-2xl lg:text-4xl'>Address</h1>
            <div className='flex justify-center'>
              <div className='flex flex-col items-start'>
                <h1>Some Address</h1>
                <h1>Fargo, North Dakota</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col text-white gap-9 pb-5 pt-10'>
            <h1 className='font-bold text-2xl lg:text-4xl'>Links</h1>
            <div className='flex justify-center'>
              <div className='flex flex-row gap-3 items-start'>
                <a href="/about">About</a>
                <a href="/terms">Terms</a>
                <a href="/contact">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
