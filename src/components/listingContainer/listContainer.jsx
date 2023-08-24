import React, { useContext, useEffect, useState } from 'react'
import ImageLoader from '../imageContainer/imageLoader';
import './list.scss';
import { LangContext } from '../../context/LangContext';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import newRequest from '../../utils/newRequest';
import { AuthContext } from '../../context/AuthContext';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far);

// const [image,setImage] = useState("image");
// const [title,setTitle] = useState("title");
// const [price, setPrice] = useState("1 dollar");
// const [description,setDescription] = useState("this is a short desc");

function ListContainer(props) {
    const navigate = useNavigate();
    const { lang } = useContext(LangContext);
    const [btn, setBtn] = useState(false);
    const { user } = useContext(AuthContext);
    // console.log(props);
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

    useEffect(() => {
        var existing = JSON.parse(localStorage.getItem('user'));

        if (user && existing.saved.indexOf(props.id) !== -1) {
            setBtn(true);
        }
    }, []);

    useEffect(() => {
        var existing = JSON.parse(localStorage.getItem('user'));

        if (user && existing.saved.indexOf(props.id) !== -1) {
            setBtn(true);
        }
        else
            setBtn(false);
    }, [props.id]);

    const saveListing = async () => {
        // await updateDoc(doc(db, "users", currentUser.uid), {
        //     lists: arrayUnion({
        //         id,
        //     }),
        // });
        newRequest.put(`/user/save/${user._id}`, { saved: [props.id] });
        // Get the existing data
        var existing = JSON.parse(localStorage.getItem('user'));

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        // console.log(existing.saved);
        existing.saved.push(props.id);
        // existing.saved.pop();
        // console.log(existing.saved);

        // Add new data to localStorage Array

        // Save back to localStorage
        localStorage.setItem('user', JSON.stringify(existing));
        // console.log(user);
        // console.log("object");
    }

    const deleteListing = () => {
        var existing = JSON.parse(localStorage.getItem('user'));
        newRequest.put(`/user/del/${user._id}`, { saved: props.id });
        existing.saved.pop(existing.saved.indexOf(props.id));
        localStorage.setItem('user', JSON.stringify(existing));
    }

    // console.log(lang);
    let houseRef1;
    props.what === "house" ? houseRef1 = props.room.toString() + " bd " + props.bath.toString() + " bath " + (props.m2 ? props.m2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "") + " m^2" : null;
    let houseRef2;
    props.what === "house" ? houseRef2 = formatOptionValue(props.style) + " " + (props.sale === "sale" ? "For Sale": "For Rent"):null;
    let carRef1;
    props.what === "car" ? carRef1 = props.color + " " + props.year + " " + props.make + " " + props.model : null;
    let carRef2;
    props.what === "car" ? carRef2 = props.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " miles \n" + props.mpg + "miles per gallon \n" + props.engine + " " + props.style + "\n" + props.sale === "sale" ? "For Sale" : "For Rent" : null;

    let houseRef1f;
    props.what === "house" ? houseRef1f = props.room.toString() + " ch " + props.bath.toString() + " sdb " + (props.m2 ? props.m2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "") + " m^2" : null;
    let houseRef2f;
    props.what === "house" ? houseRef2f = formatOptionValue(props.style) + " " + (props.sale === "sale" ? "à vendre" : "a louer") : null;
    let carRef1f;
    props.what === "car" ? carRef1f = props.color + " " + props.year + " " + props.make + " " + props.model : null;
    let carRef2f;
    props.what === "car" ? carRef2f = props.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Kilométrage \n" + props.mpg + "kilomètres par gallon \n" + props.engine + " " + props.style + "\n" + props.sale === "sale" ? "à vendre" : "a louer" : null;

    if (lang == "En")
        return (
            <div key={props} className={'rounded-t-md bg-white max-w-[325px] lg:max-w-full lg:max-h-[450px] lg:min-h-[450px] grid grid-rows-[2fr,1fr] projects_hover wow animated'}>
                <div className='h-auto'>
                    <ImageLoader img={props.image[0]} />
                    <div className='relative w-[99%] flex h-full justify-end'>
                        <div id='ForSale' className='h-full'>
                            <div className='hidden lg:block'>
                                <label className={props.hover ? 'bg-green-300 absolute p-1 h-fit whitespace-nowrap rounded left-[298px]' : 'bg-green-300 absolute p-1 h-fit whitespace-nowrap rounded left-[298px]'}> For {props.sale}</label>
                            </div>
                            <div className='relative lg:hidden block h-full'>
                                <label className='bg-green-300 absolute p-1 h-fit whitespace-nowrap rounded translate-x-[-44%]'> For {props.sale}</label>
                            </div>
                        </div>
                        <div className='flex h-full items-end lg:translate-y-[-8%]'>
                            <div>
                                <div className='hover:cursor-pointer' onClick={() => {
                                    if (user) {
                                        if (btn)
                                            setBtn(false);
                                        else
                                            setBtn(true);
                                        if (!btn) {
                                            saveListing();
                                        } else {
                                            deleteListing();
                                        }
                                    }
                                    else {
                                        alert("Please make an account");
                                    }
                                }}>
                                    <div className={btn ? 'flex' : 'hidden'}>
                                        <FontAwesomeIcon icon={['fas', 'heart']} size='2xl' />
                                    </div>
                                    <div className={btn ? 'hidden' : 'flex'}>
                                        <FontAwesomeIcon icon={['far', 'heart']} size='2xl' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='overflow-hidden ml-4 flex flex-col justify-center text-left'>
                    {props?.verified ? <div className='flex bg-green-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>Verified</p></div> : <div className='flex bg-red-300 p-2 rounded w-fit justify-start font-medium text-[15px]'><p>Not Verified</p></div>}
                    <a onClick={() => navigate('/details/' + props.id)}>
                        <h2 className='text-2xl font-medium text-blue-400 hover:underline'>BF {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{props.sale === "sale" ? "" : "/Mo"}</h2>
                    </a>
                    <div className='font-medium overflow-hidden max-w-[300px] whitespace-nowrap'>
                        {props.what === "house" ? <h3>{houseRef1.length > 40 ? houseRef1.substring(37) + "..." : houseRef1}</h3> : null}
                        {props.what === "house" ? <h5>{houseRef2.length > 40 ? houseRef2.substring(37) + "..." : houseRef2}</h5> : null}
                        {props.what === "car" ? <h3>{carRef1.length > 40 ? carRef1.substring(37) + "..." : carRef1}</h3> : null}
                        {props.what === "car" ? <h5>{carRef2.length > 40 ? carRef2.substring(37) + "..." : carRef2}</h5> : null}
                        <p>{props.addy}, {props.city.charAt(0).toUpperCase() + props.city.slice(1).toLowerCase()}, {props.commune}, {props.zone}</p>
                    </div>
                </div>
            </div>
        );
    else if (lang === "Fr")
        return (
            <div key={props} className='bg-white max-h-[450px] w-fit max-w-200px grid grid-rows-[2fr,1fr] projects_hover wow animated'>
                <div className=''>
                    {/* <img src={props.image[props.image.length-1]}/> */}
                    <ImageLoader img={props.image[props.image.length - 1]} />
                </div>
                <div className='overflow-hidden ml-4 flex flex-col justify-center text-left'>
                    <a href={'details/' + props.id}>
                        <h2 className='text-2xl font-medium text-blue-400 hover:underline'>{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} FBu {props.sale === "sale" ? "" : "/Mo"}</h2>
                    </a>
                    <div className='font-medium overflow-hidden max-w-[300px] whitespace-nowrap'>
                        {props.what === "house" ? <h3>{houseRef1f.length > 40 ? houseRef1f.substring(37) + "..." : houseRef1f}</h3> : null}
                        {props.what === "house" ? <h5>{houseRef2f.length > 40 ? houseRef2f.substring(37) + "..." : houseRef2f}</h5> : null}
                        {props.what === "car" ? <h3>{carRef1f.length > 40 ? carRef1f.substring(37) + "..." : carRef1f}</h3> : null}
                        {props.what === "car" ? <h5>{carRef2f.length > 40 ? carRef2f.substring(37) + "..." : carRef2f}</h5> : null}
                        <p>{props.addy}, {props.city.charAt(0).toUpperCase() + props.city.slice(1).toLowerCase()}, {props.country}</p>
                    </div>
                </div>
                <div id='verifiedStatus'>
                    {/* <h2>Verified</h2> */}
                </div>
            </div>
        );
}


export default ListContainer;