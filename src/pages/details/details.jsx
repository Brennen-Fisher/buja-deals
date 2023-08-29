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
import { faVolumeHigh, fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

    const saveListing = async () => {
        // await updateDoc(doc(db, "users", currentUser.uid), {
        //     lists: arrayUnion({
        //         id,
        //     }),
        // });
        newRequest.put(`/user/save/${user._id}`, { saved: [id] });
        // Get the existing data
        var existing = JSON.parse(localStorage.getItem('user'));

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        console.log(existing.saved);
        existing.saved.push(id);
        // existing.saved.pop();
        console.log(existing.saved);

        // Add new data to localStorage Array

        // Save back to localStorage
        localStorage.setItem('user', JSON.stringify(existing));
        // console.log(user);
        // console.log("object");
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
    const [show, setShow] = useState(false);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        // ref.current && alert(ref.current.clientHeight);
        ref.current && setHeight(ref.current.clientHeight);
    }, [ref]);

    // console.log(data?.userId);
    // console.log(user);

    if (data && data.what === "house")
        // if (lang === "En")
        return (
            <div className='flex flex-col justify-center max-w-[400px] lg:max-w-[100%] overflow-x-hidden h-auto bg-[skyblue] border-t-[skyblue] border-t-2'>
                {data && <div className=''>
                    <div className='p-12 ml-5 pl-0 w-full flex flex-col lg:flex-row justify-center items-start'>
                        {data.image.length === 1 ?
                            (<div className='lg:w-auto lg:max-w-[660px] flex flex-col w-full p-3 rounded-md'>
                                <div id='imagePanel' className='bg-white overflow-y-hidden p-4 rounded-md h-[229px] lg:h-[100%]'>
                                    <LightGallery
                                        speed={500}
                                        plugins={[lgThumbnail, lgZoom]}
                                        controls={true}>
                                        {data.image.map((e) =>
                                            <a href={e}>
                                                <img className='flex flex-wrap w-[300px] min-h-[205px] lg:w-[610px]' src={e} />
                                            </a>
                                        )}
                                    </LightGallery>
                                </div>
                                <br />
                                <div className='w-full h-full flex flex-col items-start bg-white p-5 rounded gap-3'>
                                    <div className='flex flex-col w-full items-start gap-2'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <div className='flex flex-row gap-2'>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data.sale === "sale" ? lang === "En" ? "For Sale" : "A Vendre" : lang === "En" ? "For Rent" : "A Louer"}</p></div>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data?.verified === true ? "Verified" : "Not Verified"}</p></div>
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
                                                    <p className='text-[15px]'>{formatOptionValue(data.style)}</p>
                                                    <h3 className='font-normal text-[14px]' >{lang === "En" ? "Property:" : "Types de bien:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-hammer']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.year}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Year Built:" : "Année:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-combined']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.lot ? data.lot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Lot Size: " : "La taille du lot: "}</h3>
                                                </div>
                                            </span>
                                        </div>
                                        <br />
                                        <div className='[&>div]:flex [&>div]:flex-col [&>div]:items-start flex flex-col gap-5'>
                                            <div>
                                                {data.phone || data.email || data.name ? (<div><h2>{lang === "En" ? "Contact Info" : "Informations de contact"}</h2>
                                                    <div id='contact'>
                                                        <p>{data.name}: {data.phone ? (<div>{formatPhoneNumber(data.phone)}</div>) : null} {data.email ? (<div>{data.email}</div>) : null}</p>
                                                    </div>
                                                    <br /></div>) : null}
                                            </div>
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
                                                <h2 className='font-bold '>{lang === "En" ? "About:" : "À propos:"}</h2>
                                                <div className='font-medium text-[18px]'>
                                                    {height >= 100 ? (
                                                        <div>
                                                            <p id={show ? "show" : "hide"} ref={ref}>{data && data.desc}</p>
                                                            <a className='text-[20px] font-medium text-blue-400 hover:underline' type='button' onClick={() => { setShow(!show); setMarkup(!markup); }}>{markup ? "Hide" : "Show More"}</a>
                                                        </div>
                                                    ) : <p className='flex text-start' ref={ref}>{data && data.desc}</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='font-bold '>Facts:</h2>
                                                <div className='font-medium text-[18px]'>
                                                    <p ref={ref}>{data && data.fact}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>) :
                            (<div className='lg:w-full lg:max-w-[660px] flex flex-col w-full p-3 rounded-md'>
                                <div id='imagesPanel' className='bg-white overflow-y-hidden p-4 rounded-md h-[229px] lg:h-[100%]'>
                                    <LightGallery
                                        speed={500}
                                        plugins={[lgThumbnail, lgZoom]}>
                                        {data.image.map((e) =>
                                            <a href={e}>
                                                <img className='flex flex-wrap w-[300px] min-h-[205px] lg:w-[610px]' src={e} />
                                            </a>
                                        )}
                                    </LightGallery>
                                </div>
                                <br />
                                <div className='w-full h-full flex flex-col items-start bg-white p-5 rounded gap-3'>
                                    <div className='flex flex-col w-full items-start gap-2'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <div className='flex flex-row gap-2'>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data.sale === "sale" ? lang === "En" ? "For Sale" : "A Vendre" : lang === "En" ? "For Rent" : "A Louer"}</p></div>
                                                {data?.verified ? <div className='flex bg-green-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>Verified</p></div> : <div className='flex bg-red-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>Not Verified</p></div>}
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
                                                    <h3 className='font-normal text-[14px]' >{lang === "En" ? "Property:" : "Types de bien:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-hammer']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.year}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Year Built:" : "Année:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-combined']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.lot ? data.lot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Lot Size: " : "La taille du lot: "}</h3>
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
                                                <h2 className='font-bold '>{lang === "En" ? "About:" : "À propos:"}</h2>
                                                <div className='flex font-medium text-[18px] justify-start'>
                                                    {height >= 100 ? (
                                                        <div>
                                                            <p id={show ? "show" : "hide"} ref={ref}>{data && data.desc}</p>
                                                            <a className='flex text-start text-[20px] font-medium text-blue-400 hover:underline' type='button' onClick={() => { setShow(!show); setMarkup(!markup); }}>{markup ? "Hide" : "Show More"}</a>
                                                        </div>
                                                    ) : <p className='flex text-start' ref={ref}>{data && data.desc}</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className='font-bold '>Facts:</h2>
                                                <div className='font-medium text-[18px]'>
                                                    <p ref={ref}>{data && data.fact}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>)}

                        {user?._id === data.userId ? null : <div className='bg-white m-2 border-2 border-[grey] rounded-md'>
                            <form className='flex flex-col gap-2 p-6'>
                                <h2 className='flex justify-start font-bold text-2xl'>Contact owner</h2>
                                <input placeholder='Full Name' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <input placeholder='Email' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <input placeholder='Phone Number' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <textarea placeholder='Message' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-blue-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="" cols="30" rows="10"></textarea>
                                <button type='button' className='whitespace-nowrap bg-blue-500 text-white text-medium text-lg p-2 rounded-md'>Send Message</button>
                            </form>
                        </div>}
                    </div>
                </div>}
            </div>

        );
    if (data && data.what === "car")
        return (
            <div className='flex flex-col justify-center max-w-[400px] lg:max-w-[100%] h-auto bg-[skyblue] border-t-[skyblue] border-t-2'>
                {data && <div className=''>
                    <div className='p-12 ml-5 pl-0 w-full flex flex-col lg:flex-row justify-center items-start'>
                        {data.image.length === 1 ?
                            (<div className=' lg:w-auto lg:max-w-[660px] flex flex-col w-full p-3 rounded-md'>
                                <div id='imagePanel' className='bg-white overflow-y-hidden p-4 rounded-md h-[229px] lg:h-[100%]'>
                                    <LightGallery
                                        speed={500}
                                        plugins={[lgThumbnail, lgZoom]}>
                                        {data.image.map((e) =>
                                            <a href={e}>
                                                <img className='flex flex-wrap w-[300px] min-h-[205px] lg:w-[610px]' src={e} />
                                            </a>
                                        )}
                                    </LightGallery>
                                </div>
                                <br />
                                <div className='w-full h-full flex flex-col items-start bg-white p-5 rounded gap-3'>
                                    <div className='flex flex-col w-full items-start gap-2'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <div className='flex flex-row gap-2'>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data.sale === "sale" ? lang === "En" ? "For Sale" : "A Vendre" : lang === "En" ? "For Rent" : "A Louer"}</p></div>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data?.verified === true ? "Verified" : "Not Verified"}</p></div>
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
                                                    <h3 className='font-normal text-[14px]'>Mileage</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-gas-pump']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.mpg} Meters per gallon</p>
                                                    <h3 className='font-normal text-[14px]'>Gas Usage:</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-car']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.make} {data.model}</p>
                                                    <h3 className='font-normal text-[14px]' >{lang === "En" ? "Make / Model:" : "Types de bien:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-hammer']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.year}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Made in:" : "Année:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-combined']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.yor}</p>
                                                    <h3 className='font-normal text-[14px]'>Registration</h3>
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
                                            {data.feat.map((e) =>

                                                <span className='tag'>
                                                    {e}
                                                </span>
                                            )}
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
                                            <h2 className='font-bold '>Facts:</h2>
                                            <div className='font-medium text-[18px]'>
                                                <p ref={ref}>{data && data.fact}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>) :
                            (<div className='lg:w-full lg:max-w-[660px] flex flex-col w-full p-3 rounded-md'>
                                <div id='imagesPanel' className='bg-white overflow-y-hidden p-4 rounded-md h-[229px] lg:h-[100%]'>
                                    <LightGallery
                                        speed={500}
                                        plugins={[lgThumbnail, lgZoom]}>
                                        {data.image.map((e) =>
                                            <a href={e}>
                                                <img className='flex flex-wrap min-h-[205px] w-[300px] lg:w-[610px]' src={e} />
                                            </a>
                                        )}
                                    </LightGallery>
                                </div>
                                <br />
                                <div className='w-full h-full flex flex-col items-start bg-white p-5 rounded gap-3'>
                                    <div className='flex flex-col w-full items-start gap-2'>
                                        <div className='flex flex-row w-full justify-between'>
                                            <div className='flex flex-row gap-2'>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data.sale === "sale" ? lang === "En" ? "For Sale" : "A Vendre" : lang === "En" ? "For Rent" : "A Louer"}</p></div>
                                                <div className='flex background bg-green-300 p-2 rounded justify-start font-medium text-[18px]'><p>{data?.verified === true ? "Verified" : "Not Verified"}</p></div>
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
                                                    <h3 className='font-normal text-[14px]'>Mileage</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-gas-pump']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='flex flex-row text-start items-center gap-1'>{data.mpg} <p className='flex text-sm'>Meters per gallon</p></p>
                                                    <h3 className='font-normal text-[14px]'>Gas Usage:</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-car']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.make} {data.model}</p>
                                                    <h3 className='font-normal text-[14px]' >{lang === "En" ? "Make / Model:" : "Types de bien:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-hammer']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.year}</p>
                                                    <h3 className='font-normal text-[14px]'>{lang === "En" ? "Made in:" : "Année:"}</h3>
                                                </div>
                                            </span>
                                            <span className='font-medium text-[18px] gap-2'>
                                                <FontAwesomeIcon icon={['fas', 'fa-ruler-combined']} size='lg' />
                                                <div className='flex flex-col'>
                                                    <p className='text-start'>{data.yor}</p>
                                                    <h3 className='font-normal text-[14px]'>Registration</h3>
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
                                            <h2 className='font-bold '>Facts:</h2>
                                            <div className='flex text-start font-medium text-[18px]'>
                                                <p ref={ref}>{data && data.fact}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>)}
                        {user?._id === data.userId ? null : <div className='bg-white m-2 border-2 border-[grey] rounded-md'>
                            <form className='flex flex-col gap-2 p-6'>
                                <h2 className='flex justify-start font-bold text-2xl'>Contact owner</h2>
                                <input placeholder='Full Name' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <input placeholder='Email' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <input placeholder='Phone Number' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <textarea placeholder='Message' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-blue-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="" cols="30" rows="10"></textarea>
                                <button type='button' className='whitespace-nowrap bg-blue-500 text-white text-medium text-lg p-2 rounded-md'>Send Message</button>
                            </form>
                        </div>}
                    </div>
                </div>}
            </div>
        );
}

export default Details;
