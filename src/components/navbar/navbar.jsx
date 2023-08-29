import React, { useContext, useEffect, useState } from 'react'
import './navbar.scss';
import { NavLink, useNavigate } from "react-router-dom";
import Login from './../../pages/login/login';
import { AuthContext } from "./../../context/AuthContext";
import { LangContext } from '../../context/LangContext';
// import newRequest from '../../utils/newRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function navbar() {

  const { user } = useContext(AuthContext);
  const { lang, setLang } = useContext(LangContext);
  const navigate = useNavigate();

  const [seen, setSeen] = useState(false);
  const [ham, setHam] = useState("hidden");

  function togglePop() {
    setSeen(!seen);
  };


  function hamToggle() {
    if (ham === "flex") {
      setHam("hidden");
    } else {
      setHam("flex");
    }
  }

  function changeLang(e) {
    // console.log(e.target.value);
    setLang(e.target.value);
  }

  // useEffect(() => {
  //   console.log("lang");
  // }, [lang]);

  return (
    <div>
      <div className={'bg-[skyblue] border-b-black border-b-2 flex flex-col items-center justify-around w-full lg:hidden py-5'}>
        <div className='flex flex-row gap-20'>
          <a onClick={() => navigate("/home")}><span className='text-2xl font-bold'>Buja Marketplace</span></a>
          <button className='focus:ring-transparent focus:border-transparent' onClick={hamToggle}><FontAwesomeIcon icon={['fas', 'fa-bars']} size='lg' /></button>
        </div>
        <div className={"border-t-2 border-t-black items-start gap-5 w-full py-2 my-2 " + ham}>
          <div className='[&>*]:flex [&>*]:w-full [&>*]:h-full grid grid-cols-1 items-start pl-4 font-medium gap-3'>
            <NavLink
              to="/home"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/listings"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Listings
            </NavLink>
            <div className="relative w-full ">
              <select className="w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600" onInput={changeLang} name="lang" id="lang">
                {lang === "En" ? <option value="En" selected>English</option> : <option value="En">English</option>}
                {lang === "Fr" ? <option value="Fr" selected>French</option> : <option value="Fr">French</option>}
              </select>
            </div>
            <div className=' flex-col gap-3 font-bold'>
              {user ?
                <a onClick={() => navigate("/profile")}><h2>{user && user.email}</h2></a>
                :
                <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded' onClick={togglePop}>Login</button>}
              {seen ? <Login toggle={togglePop} /> : null}
            </div>
            <button className='whitespace-nowrap bg-blue-500 text-white p-2 rounded-md' onClick={() => navigate("/form")}>Submit Listing</button>
          </div>
        </div>
      </div>

      <div className={'bg-white lg:flex flex-row items-center justify-between px-48 w-full h-[90px] hidden'}>
        <div className='flex flex-row h-full items-center gap-5'>
          <a href={"/home"} onClick={() =>location.reload}><span className='text-2xl font-bold'>Buja Marketplace</span></a>
          <div className='flex flex-row h-full items-center font-medium text-[17px] [&>div]:h-full [&>div]:flex [&>div]:items-center [&>div]:px-3'>
            <div className='hover:bg-blue-100'>
              <NavLink
                to="/home"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                onClick={location.reload}
              >
                <label className='cursor-pointer'>Home</label>
              </NavLink>
            </div>
            <div className='hover:bg-blue-100'>
              <NavLink
                to="/listings"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <label className='cursor-pointer'>Listings</label>
              </NavLink>
            </div>
            {/* <NavLink
        to="/about"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        About
      </NavLink> */}
          </div>
        </div>
        <div className='flex flex-row items-center gap-3 font-medium'>
          <div className="relative w-full lg:max-w-sm p-2.5">
            <select className="w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600" onInput={changeLang} name="lang" id="lang">
              {lang === "En" ? <option value="En" selected>English</option> : <option value="En">English</option>}
              {lang === "Fr" ? <option value="Fr" selected>French</option> : <option value="Fr">French</option>}
            </select>
          </div>

          <div className='items-center gap-3 font-bold p-2.5'>
            {user ?
              <a onClick={() => navigate("/profile")}><FontAwesomeIcon icon={faUser} size="lg" /></a>
              :
              <div className='cursor-pointer' onClick={togglePop}><FontAwesomeIcon icon={faUser} size="lg" /></div>}
            {/* <button className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={togglePop}>Login</button>*/}
            {seen ? <Login toggle={togglePop} /> : null}
          </div>
          <button className='whitespace-nowrap bg-blue-500 p-2 text-white rounded-md' onClick={() => navigate("/form")}>Submit Listing</button>
        </div>
      </div >
    </div>
  );
}
