import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from "react-router-dom"
import "./details.scss";
import { AuthContext } from '../../context/AuthContext';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { LangContext } from '../../context/LangContext';
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import emailjs from '@emailjs/browser';
library.add(fas, far);

// const details= async()=> {
// function Details() {
//     console.log("test");
// }
function Details() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { lang } = useContext(LangContext);
    const [btn, setBtn] = useState(false);
    const form = useRef();
    const [sent, setSent] = useState(false);

    var settings = {
        infinite: true,
        slidesToShow: 1,
        initialSlide: 0,
        variableWidth: true,
    };


    const { isLoading, error, data } = useQuery({
        queryKey: ["list"],
        queryFn: () =>
            newRequest.get(`/list/` + id).then((res) => {
                return res.data;
            }),
    });

    // console.log(data);

    useEffect(() => {
        var existing = JSON.parse(localStorage.getItem('user'));

        if (user && existing.saved.indexOf(id) !== -1) {
            setBtn(true);
        }

    }, []);

    function sendEmail(e) {
        e.preventDefault();
        setSent(true);
        emailjs.sendForm('service_yjdrr79', 'template_dmnvrr7', form.current, 'OfeRHuPCHSJiCMMZy')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    const saveListing = async () => {
        newRequest.put(`/user/save/${user._id}`, { saved: [id] });
        var existing = JSON.parse(localStorage.getItem('user'));
        console.log(existing.saved);
        existing.saved.push(id);
        console.log(existing.saved);
        localStorage.setItem('user', JSON.stringify(existing));
    }

    const deleteListing = () => {
        var existing = JSON.parse(localStorage.getItem('user'));
        newRequest.put(`/user/del/${user._id}`, { saved: id });
        existing.saved.pop(existing.saved.indexOf(id));
        localStorage.setItem('user', JSON.stringify(existing));
    }

    function formatPhoneNumber(str) {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');

        //Check if the input is of correct
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            //Remove the matched extension code
            //Change this to format for any country code.
            let intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }

        return null;
    }

    function formatOptionValue(value) {
        switch (value) {
            case 'condo':
                return 'Condo';
            case 'single':
                return 'Single Family Home';
            case 'townhouse':
                return 'Townhouse';
            case 'coop':
                return 'Coop';
            case 'unknown':
                return 'Unknown';
            case 'apartment':
                return 'Apartment';
            case 'multi':
                return 'Multi Family Home';
            case 'lot':
                return 'Lot';
            default:
                return '';
        }
    }

    /* Old Code
    const handleSearch = async () => {
        const postRef = doc(db, "posts", id);
        const postSnap = await getDoc(postRef);

        console.log(postSnap.exists() ? "true" : "No doc exists");
        console.log(postSnap.data());
        let array = [];
        array = postSnap.data();
        setPost(array);

        const userRef = doc(db, "users", array.uid);
        const userSnap = await getDoc(userRef);

        console.log(userSnap.data());

        array = userSnap.data();
        setUser(array);
    }

    useEffect(() => {
        console.log("test");
        handleSearch();
    }, []);*/

    // literal witchcraft I don't know how this works

    let price = data && data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const [markup, setMarkup] = useState(false);
    const [markup2, setMarkup2] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [height, setHeight] = useState(0);

    // console.log(data?.userId);
    // console.log(user);

    if (data && data.what === "house")
        // if (lang === "En")
        return (
            <div className='flex flex-col justify-center max-w-[100%] overflow-x-hidden h-auto bg-[skyblue] border-t-[skyblue] border-t-2'>
                {data && <div className=''>
                    <div className='p-12 ml-5 pl-0 w-full flex flex-col lg:flex-row justify-center items-start'>
                        {data.image.length === 1 ?
                            (<div className='lg:w-auto lg:max-w-[660px] flex flex-col w-full p-3 rounded-md'>
                                <div id='imagePanel' className='bg-white overflow-y-hidden p-4 rounded-md h-[229px] lg:h-[100%]'>
                                    <Slider {...settings}>
                                        {data.image.map((e) =>
                                            <LightGallery
                                                speed={500}
                                                index={0}
                                                plugins={[lgThumbnail, lgZoom]}>
                                                <a href={e}>
                                                    <img className='flex flex-wrap w-[300px] min-h-[205px] lg:w-[610px]' src={e} />
                                                </a>
                                            </LightGallery>
                                        )}
                                    </Slider>
                                </div>
                                <br />
                                <div className='w-full h-full flex flex-col items-start bg-white p-5 rounded gap-3'>
                                    <div className='flex flex-col w-full items-start gap-2'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <div className='flex flex-row gap-2'>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data.sale === "sale" ? lang === "En" ? "For Sale" : "A Vendre" : lang === "En" ? "For Rent" : "A Louer"}</p></div>
                                                {data?.verified ? <div className='flex bg-green-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>{lang === "En" ? "Verified" : "Vérifié"}</p></div> : <div className='flex bg-red-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>{lang === "En" ? "Not Verified" : "Non vérifié"}</p></div>}
                                            </div>
                                            <div className='hover:cursor-pointer' onClick={() => {
                                                setBtn(!btn);
                                                if (user) {
                                                    if (!btn) {
                                                        saveListing();
                                                    } else {
                                                        deleteListing();
                                                    }

                                                }
                                            }}>
                                                <div className={btn ? 'block' : 'hidden'}>
                                                    <FontAwesomeIcon icon={['fas', 'heart']} size='2xl' />
                                                </div>
                                                <div className={btn ? 'hidden' : 'block'}>
                                                    <FontAwesomeIcon icon={['far', 'heart']} size='2xl' />
                                                </div>
                                            </div>
                                        </div>
                                        <span className='font-bold flex flex-col text-3xl'>{lang === "En" ? "BF " + price : price + " Fbu"}</span>
                                        <span className='gap-3 font-medium text-[18px]'>{data.room} {lang === "En" ? "bd" : "ch."} {data.bath} {lang === "En" ? "bath" : "sdb"} {data.m2?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} m^2</span>
                                        <span className='gap-3 font-normal text-[16px]'>{data.addy}, {data.city} {data.commune} {data.zone} </span>
                                    </div>
                                    <div className='flex flex-col items-start'>
                                        <h2 className='font-bold flex flex-col  text-[18px]'>{lang === "En" ? "Details:" : "Desc:"}</h2>
                                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-10 [&>*]:items-center [&>*]:flex [&>*]:flex-row [&>span>div]:items-start'>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-bed']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.room}</p>
                                                    <h3 className='font-normal text-[14px]'> {lang === "En" ? "Bed:" : "ch."}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-toilet']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.bath}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Bath:" : "sdb"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-horizontal']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.m2?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Meters</p>
                                                    <h3 className='font-normal text-[14px]'>M^2:</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-house-chimney-user']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className=' text-start text-[15px]'>{formatOptionValue(data.style)}</p>
                                                    <h3 className='font-normal text-[14px]' >{lang === "En" ? "Property:" : "Propriété"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-hammer']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.year}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Year Built:" : "Année de construction"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-combined']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.lot ? data.lot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Lot Size: " : "Taille du terrain "}</h3>
                                                </div>
                                            </span>
                                        </div>
                                        <br />
                                        <div className='[&>div]:flex [&>div]:flex-col [&>div]:items-start flex flex-col gap-5'>
                                            <div>
                                                <h2 className='font-bold'>{lang === "En" ? "Features:" : "Caractéristiques:"}</h2>
                                                <div className='flex flex-row flex-wrap w-auto gap-2'>
                                                    {data.feat.map((e) =>
                                                        <span className='tag'>
                                                            {e}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='font-bold '>{lang === "En" ? "About:" : "À propos de:"}</h2>
                                                <div className='flex font-medium text-[18px] justify-start'>
                                                    <div>
                                                        {data && data.desc.length >= 100 ?
                                                            <div className='text-start'>
                                                                <p p id={show ? "show" : "hide"}>{show ? data && data.desc : data && data.desc.slice(0, 100)}</p>
                                                                <a className='flex text-start text-[20px] font-medium text-blue-400 hover:underline' type='button' onClick={() => { setShow(!show); setMarkup(!markup); }}>{markup ? "Hide" : "Show More"}</a>
                                                            </div>
                                                            :
                                                            <p className='text-start' id={"show"}>{data && data.desc}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='font-bold '>{lang === "En" ? "Facts:" : "Faits:"}</h2>
                                                <div className='font-medium text-[18px]'>
                                                    {data && data.desc.length >= 100 ?
                                                        <div className='text-start'>
                                                            <p p id={show2 ? "show" : "hide"}>{show2 ? data && data.fact : data && data.fact.slice(0, 100)}</p>
                                                            <a className='flex text-start text-[20px] font-medium text-blue-400 hover:underline' type='button' onClick={() => { setShow2(!show2); setMarkup2(!markup2); }}>{markup2 ? "Hide" : "Show More"}</a>
                                                        </div>
                                                        :
                                                        <p className='text-start' p id={"show"}>{data && data.fact}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>) :
                            (<div className='lg:w-full lg:max-w-[665px] flex flex-col items-center w-full p-3 rounded-md'>
                                <div id='imagesPanel' className='bg-white z-[1] max-w-[310px] lg:max-w-full relative p-4 rounded-md h-[229px] lg:h-[100%]'>
                                    <Slider {...settings}>
                                        {data.image.map((e) =>
                                            <LightGallery
                                                speed={500}
                                                index={0}
                                                plugins={[lgThumbnail, lgZoom]}>
                                                <a href={e}>
                                                    <img className='flex w-[275px] min-h-[205px] lg:w-[610px]' src={e} />
                                                </a>
                                            </LightGallery>
                                        )}
                                    </Slider>
                                </div>
                                <br />
                                <div className='w-full h-full flex flex-col items-start bg-white p-5 rounded gap-3'>
                                    <div className='flex flex-col w-full items-start gap-2'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <div className='flex flex-row gap-2'>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data.sale === "sale" ? lang === "En" ? "For Sale" : "A Vendre" : lang === "En" ? "For Rent" : "A Louer"}</p></div>
                                                {data?.verified ? <div className='flex bg-green-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>{lang === "En" ? "Verified" : "Vérifié"}</p></div> : <div className='flex bg-red-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>{lang === "En" ? "Not Verified" : "Non vérifié"}</p></div>}
                                            </div>
                                            <div className='hover:cursor-pointer' onClick={() => {
                                                setBtn(!btn);
                                                if (user) {
                                                    if (!btn) {
                                                        saveListing();
                                                    } else {
                                                        deleteListing();
                                                    }

                                                }
                                            }}>
                                                <div className={btn ? 'block' : 'hidden'}>
                                                    <FontAwesomeIcon icon={['fas', 'heart']} size='2xl' />
                                                </div>
                                                <div className={btn ? 'hidden' : 'block'}>
                                                    <FontAwesomeIcon icon={['far', 'heart']} size='2xl' />
                                                </div>
                                            </div>
                                        </div>
                                        <span className='font-bold flex flex-col text-3xl'>{lang === "En" ? "BF " + price : price + " Fbu"}</span>
                                        <span className='gap-3 font-medium text-[18px]'>{data.room} {lang === "En" ? "bd" : "ch."} {data.bath} {lang === "En" ? "bath" : "sdb"} {data.m2?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} m^2</span>
                                        <span className='gap-3 font-normal text-[16px]'>{data.addy}, {data.city} {data.commune} {data.zone} </span>
                                    </div>
                                    <div className='flex flex-col items-start'>
                                        <h2 className='font-bold flex flex-col  text-[18px]'>{lang === "En" ? "Details:" : "Desc:"}</h2>
                                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-10 [&>*]:items-center [&>*]:flex [&>*]:flex-row [&>span>div]:items-start'>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-bed']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.room}</p>
                                                    <h3 className='font-normal text-[14px]'> {lang === "En" ? "Bed:" : "ch."}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-toilet']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.bath}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Bath:" : "sdb"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-horizontal']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.m2?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Meters</p>
                                                    <h3 className='font-normal text-[14px]'>M^2:</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-house-chimney-user']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className=' text-start text-[15px]'>{formatOptionValue(data.style)}</p>
                                                    <h3 className='font-normal text-[14px]' >{lang === "En" ? "Property:" : "Propriété"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-hammer']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.year}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Year Built:" : "Année de construction"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-combined']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.lot ? data.lot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Lot Size: " : "Taille du terrain "}</h3>
                                                </div>
                                            </span>
                                        </div>
                                        <br />
                                        <div className='[&>div]:flex [&>div]:flex-col [&>div]:items-start flex flex-col gap-5'>
                                            <div>
                                                <h2 className='font-bold'>{lang === "En" ? "Features:" : "Caractéristiques:"}</h2>
                                                <div className='flex flex-row flex-wrap w-auto gap-2'>
                                                    {data.feat.map((e) =>
                                                        <span className='tag'>
                                                            {e}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='font-bold '>{lang === "En" ? "About:" : "À propos de:"}</h2>
                                                <div className='flex font-medium text-[18px] justify-start'>
                                                    <div>
                                                        {data && data.desc.length >= 100 ?
                                                            <div className='text-start'>
                                                                <p p id={show ? "show" : "hide"}>{show ? data && data.desc : data && data.desc.slice(0, 100)}</p>
                                                                <a className='flex text-start text-[20px] font-medium text-blue-400 hover:underline' type='button' onClick={() => { setShow(!show); setMarkup(!markup); }}>{markup ? "Hide" : "Show More"}</a>
                                                            </div>
                                                            :
                                                            <p className='text-start' id={"show"}>{data && data.desc}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='font-bold '>{lang === "En" ? "Facts:" : "Faits:"}</h2>
                                                <div className='font-medium text-[18px]'>
                                                    {data && data.desc.length >= 100 ?
                                                        <div className='text-start'>
                                                            <p p id={show2 ? "show" : "hide"}>{show2 ? data && data.fact : data && data.fact.slice(0, 100)}</p>
                                                            <a className='flex text-start text-[20px] font-medium text-blue-400 hover:underline' type='button' onClick={() => { setShow2(!show2); setMarkup2(!markup2); }}>{markup2 ? "Hide" : "Show More"}</a>
                                                        </div>
                                                        :
                                                        <p className='text-start' p id={"show"}>{data && data.fact}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>)}

                        {user?._id === data.userId ? null : <div className='bg-white m-2 border-2 border-[grey] rounded-md'>
                            {!sent ?
                                <form onSubmit={sendEmail} ref={form} className='flex flex-col gap-2 p-6'>
                                    <input className='hidden' name='param' value={id}></input>
                                    <h2 className='flex justify-start font-bold text-2xl'>Contact owner</h2>
                                    <input required placeholder='Full Name' name='user_name' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                    <input required placeholder='Email' name='user_email' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                    <input required placeholder='Phone Number' name='user_number' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                    <textarea placeholder='Message' name='message' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-blue-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="" cols="30" rows="10"></textarea>
                                    <button type='submit' value='Send' className='whitespace-nowrap bg-blue-500 text-white text-medium text-lg p-2 rounded-md'>Send Message</button>
                                </form>
                                : <div className='w-[200px] h-[200px] flex justify-center items-center'>Sent</div>
                            }
                        </div>}
                    </div>
                </div>}
            </div >

        );
    if (data && data.what === "car")
        return (
            <div className='flex flex-col justify-center max-w-[400px] lg:max-w-[100%] h-auto bg-[skyblue] border-t-[skyblue] border-t-2'>
                {data && <div className=''>
                    <div className='p-12 ml-5 pl-0 w-full flex flex-col lg:flex-row justify-center items-start'>
                        {data.image.length === 1 ?
                            (<div className=' lg:w-auto lg:max-w-[660px] flex flex-col w-full p-3 rounded-md'>
                                <div id='imagePanel' className='bg-white p-4 rounded-md h-[229px] lg:h-[100%]'>
                                    <Slider {...settings}>
                                        {data.image.map((e) =>
                                            <LightGallery
                                                speed={500}
                                                index={0}
                                                plugins={[lgThumbnail, lgZoom]}>
                                                <a href={e}>
                                                    <img className='flex flex-wrap w-[300px] min-h-[205px] lg:w-[610px]' src={e} />
                                                </a>
                                            </LightGallery>
                                        )}
                                    </Slider>
                                </div>
                                <br />
                                <div className='w-full h-full flex flex-col items-start bg-white p-5 rounded gap-3'>
                                    <div className='flex flex-col w-full items-start gap-2'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <div className='flex flex-row gap-2'>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data.sale === "sale" ? lang === "En" ? "For Sale" : "A Vendre" : lang === "En" ? "For Rent" : "A Louer"}</p></div>
                                                {data?.verified ? <div className='flex bg-green-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>{lang === "En" ? "Verified" : "Vérifié"}</p></div> : <div className='flex bg-red-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>{lang === "En" ? "Not Verified" : "Non vérifié"}</p></div>}
                                            </div>
                                            <div className='hover:cursor-pointer' onClick={() => {
                                                setBtn(!btn);
                                                if (user) {
                                                    if (!btn) {
                                                        saveListing();
                                                    } else {
                                                        deleteListing();
                                                    }

                                                }
                                            }}>
                                                <div className={btn ? 'block' : 'hidden'}>
                                                    <FontAwesomeIcon icon={['fas', 'heart']} size='2xl' />
                                                </div>
                                                <div className={btn ? 'hidden' : 'block'}>
                                                    <FontAwesomeIcon icon={['far', 'heart']} size='2xl' />
                                                </div>
                                            </div>
                                        </div>
                                        <span className='font-bold flex flex-col text-3xl'>{lang === "En" ? "BF " + price : price + " Fbu"}</span>
                                        <span className='gap-3 font-normal text-[16px]'>{data.addy}, {data.city} {data.commune} {data.zone} </span>
                                    </div>
                                    <div className='flex flex-col items-start'>
                                        <h2 className='font-bold flex flex-col'>{lang === "En" ? "Facts:" : "Desc:"}</h2>
                                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-10 [&>*]:items-center [&>*]:flex [&>*]:flex-row [&>span>div]:items-start'>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-gears']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.style}</p>
                                                    <h3 className='font-normal text-[14px]'>Transmission</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-road']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.mileage}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Mileage" : "Kilométrage total"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-gas-pump']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='flex flex-row text-start items-center gap-1'>{data.mpg} <p className='flex text-sm'>{lang === "En" ? "Meters per gallon" : "les kilometre par litre"}</p></p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Gas Usage" : "Consommation de gaz"}:</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-car']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.make} {data.model}</p>
                                                    <h3 className='font-normal text-[14px]' >{lang === "En" ? "Make / Model:" : "le modèle:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-hammer']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.year}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Made in:" : "Année de construction:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-combined']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.yor}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Registration" : "Année d'immatriculation"}</h3>
                                                </div>
                                            </span>
                                        </div>
                                        <br />
                                        {data.phone || data.email || data.name ? (<div><h2>{lang === "En" ? "Contact Info" : "Informations de contact"}</h2>
                                            <div id='contact'>
                                                <p>{data.name}: {data.phone ? (<div>{formatPhoneNumber(data.phone)}</div>) : null} {data.email ? (<div>{data.email}</div>) : null}</p>
                                            </div>
                                            <br /></div>) : null}
                                        <h2 className='font-bold'>{lang === "En" ? "Features:" : "Caractéristiques:"}</h2>
                                        <div className='flex flex-row flex-wrap w-auto gap-2'>
                                            {data.feat && data.feat.map((e) => (
                                                <span className='tag'>
                                                    {e}
                                                </span>
                                            ))}
                                        </div>
                                        <br />
                                        <h2 className='font-bold '>{lang === "En" ? "About:" : "À propos:"}</h2>
                                        <div className='font-medium text-[18px]'>
                                            {height >= 100 ? (
                                                <div>
                                                    <p id={show ? "show" : "hide"} ref={ref}>{data && data.desc}</p>
                                                    <a className='text-[20px] font-medium text-blue-400 hover:underline' type='button' onClick={() => { setShow(!show); setMarkup(!markup); }}>{markup ? "Hide" : "Show More"}</a>
                                                </div>
                                            ) : <p ref={ref}>{data && data.desc}</p>}
                                        </div>
                                        <div>
                                            <h2 className='font-bold '>{lang === "En" ? "Facts" : "Faits"}:</h2>
                                            <div className='flex text-start font-medium text-[18px]'>
                                                <p ref={ref}>{data && data.fact}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>) :
                            (<div className='lg:w-full lg:max-w-[660px] flex flex-col w-full p-3 rounded-md'>
                                <div id='imagesPanel' className='bg-white p-4 rounded-md h-[229px] lg:h-[100%]'>
                                    <Slider {...settings}>
                                        {data.image.map((e) =>
                                            <LightGallery
                                                speed={500}
                                                index={0}
                                                plugins={[lgThumbnail, lgZoom]}>
                                                <a href={e}>
                                                    <img className='flex flex-wrap w-[300px] min-h-[205px] lg:w-[610px]' src={e} />
                                                </a>
                                            </LightGallery>
                                        )}
                                    </Slider>
                                </div>
                                <br />
                                <div className='w-full h-full flex flex-col items-start bg-white p-5 rounded gap-3'>
                                    <div className='flex flex-col w-full items-start gap-2'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <div className='flex flex-row gap-2'>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data.sale === "sale" ? lang === "En" ? "For Sale" : "A Vendre" : lang === "En" ? "For Rent" : "A Louer"}</p></div>
                                                {data?.verified ? <div className='flex bg-green-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>{lang === "En" ? "Verified" : "Vérifié"}</p></div> : <div className='flex bg-red-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>{lang === "En" ? "Not Verified" : "Non vérifié"}</p></div>}
                                            </div>
                                            <div className='hover:cursor-pointer' onClick={() => {
                                                setBtn(!btn);
                                                if (user) {
                                                    if (!btn) {
                                                        saveListing();
                                                    } else {
                                                        deleteListing();
                                                    }

                                                }
                                            }}>
                                                <div className={btn ? 'block' : 'hidden'}>
                                                    <FontAwesomeIcon icon={['fas', 'heart']} size='2xl' />
                                                </div>
                                                <div className={btn ? 'hidden' : 'block'}>
                                                    <FontAwesomeIcon icon={['far', 'heart']} size='2xl' />
                                                </div>
                                            </div>
                                        </div>
                                        <span className='font-bold flex flex-col text-3xl'>{lang === "En" ? "BF " + price : price + " Fbu"}</span>
                                        <span className='gap-3 font-normal text-[16px]'>{data.addy}, {data.city} {data.commune} {data.zone} </span>
                                    </div>
                                    <div className='flex flex-col items-start'>
                                        <h2 className='font-bold flex flex-col'>{lang === "En" ? "Facts:" : "Desc:"}</h2>
                                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-10 [&>*]:items-center [&>*]:flex [&>*]:flex-row [&>span>div]:items-start'>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-gears']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.style}</p>
                                                    <h3 className='font-normal text-[14px]'>Transmission</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-road']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.mileage}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Mileage" : "Kilométrage total"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-gas-pump']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='flex flex-row text-start items-center gap-1'>{data.mpg} <p className='flex text-sm'>{lang === "En" ? "Meters per gallon" : "les kilometre par litre"}</p></p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Gas Usage" : "Consommation de gaz"}:</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-car']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.make} {data.model}</p>
                                                    <h3 className='font-normal text-[14px]' >{lang === "En" ? "Make / Model:" : "le modèle:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-hammer']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.year}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Made in:" : "Année de construction:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-combined']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.yor}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Registration" : "Année d'immatriculation"}</h3>
                                                </div>
                                            </span>
                                        </div>
                                        <br />
                                        {data.phone || data.email || data.name ? (<div><h2>{lang === "En" ? "Contact Info" : "Informations de contact"}</h2>
                                            <div id='contact'>
                                                <p>{data.name}: {data.phone ? (<div>{formatPhoneNumber(data.phone)}</div>) : null} {data.email ? (<div>{data.email}</div>) : null}</p>
                                            </div>
                                            <br /></div>) : null}
                                        <h2 className='font-bold'>{lang === "En" ? "Features:" : "Caractéristiques:"}</h2>
                                        <div className='flex flex-row flex-wrap w-auto gap-2'>
                                            {data.feat && data.feat.map((e) => (
                                                <span className='tag'>
                                                    {e}
                                                </span>
                                            ))}
                                        </div>
                                        <br />
                                        <h2 className='font-bold '>{lang === "En" ? "About:" : "À propos:"}</h2>
                                        <div className='font-medium text-[18px]'>
                                            {height >= 100 ? (
                                                <div>
                                                    <p id={show ? "show" : "hide"} ref={ref}>{data && data.desc}</p>
                                                    <a className='text-[20px] font-medium text-blue-400 hover:underline' type='button' onClick={() => { setShow(!show); setMarkup(!markup); }}>{markup ? "Hide" : "Show More"}</a>
                                                </div>
                                            ) : <p ref={ref}>{data && data.desc}</p>}
                                        </div>
                                        <div>
                                            <h2 className='font-bold '>{lang === "En" ? "Facts" : "Faits"}:</h2>
                                            <div className='flex text-start font-medium text-[18px]'>
                                                <p ref={ref}>{data && data.fact}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>)}
                        {user?._id === data.userId ? null : <div className='bg-white m-2 border-2 border-[grey] rounded-md'>
                            <form onSubmit={sendEmail} ref={form} className='flex flex-col gap-2 p-6'>
                                <input className='hidden' name='param' value={id}></input>
                                <h2 className='flex justify-start font-bold text-2xl'>{lang === "En" ? "Contact owner" : "Contacter le Propriétaire"}</h2>
                                <input placeholder='Full Name' name='user_name' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <input placeholder='Email' name='user_email' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <input placeholder='Phone Number' name='user_number' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <textarea placeholder='Message' name='message' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-blue-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="" cols="30" rows="10"></textarea>
                                <button type='submit' value='Send' className='whitespace-nowrap bg-blue-500 text-white text-medium text-lg p-2 rounded-md'>{lang === "En"?"Send Message":"Envoyer Message"}</button>
                            </form>
                        </div>}
                    </div>
                </div>}
            </div>
        );
}

export default Details;