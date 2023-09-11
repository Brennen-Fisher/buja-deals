import React, { useContext } from 'react'
import './footer.scss';
import { LangContext } from '../../context/LangContext';
import { useNavigate } from 'react-router';

export default function footer() {
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();
  return (
    <div className='footerSec'>
      <div className='bg-gray-700 h-full w-full'>
        <div className='flex flex-col lg:gap-0 lg:grid lg:grid-cols-5'>
          <div></div>
          <div className='flex flex-col text-white gap-9 pb-5 pt-10'>
            <h1 className='font-bold text-2xl lg:text-4xl'>{lang === "En" ? "Contact Us" : "Contactez-nous"}</h1>
            <div className='flex justify-center'>
              <div className='flex flex-col items-start'>
                <h1>Some Phone Number</h1>
                <h1>Some Email</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col text-white gap-9 pb-5 pt-10'>
            <h1 className='font-bold text-2xl lg:text-4xl'>{lang === "En" ? "Address" : "Adresse"}</h1>
            <div className='flex justify-center'>
              <div className='flex flex-col items-start'>
                <h1>Some Address</h1>
                <h1>Fargo, North Dakota</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col text-white gap-9 pb-5 pt-10'>
            <h1 className='font-bold text-2xl lg:text-4xl'>{lang==="En"?"Links":"Liens"}</h1>
            <div className='flex justify-center'>
              <div className='flex flex-row gap-3 items-start'>
                <a onClick={() => navigate("/about")}>{lang === "En" ? "About Us" : "à propos"}</a>
                <a onClick={() => navigate("/terms")}>{lang === "En" ? "Terms" : "Termes"}</a>
                <a onClick={() => navigate("/contact")}>{lang === "En" ? "Contact Us" : "Contactez-nous"}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
