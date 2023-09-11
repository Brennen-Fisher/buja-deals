import { v4 as uuid } from 'uuid';
import React, { useContext, useEffect, useState } from 'react'
import './profile.scss';
import { AuthContext } from "./../../context/AuthContext";
import { Navigate, useNavigate, useParams } from 'react-router';
import ListContainer from '../../components/listingContainer/listContainer';
import { useMutation, useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { LangContext } from '../../context/LangContext';
import Admin from './admin';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [seeProfile, setProfile] = useState(false);
    const [seeItems, setItems] = useState(true);
    const [findID, setID] = useState('0');
    const [author, setAuthor] = useState();
    const [seeListings, setListings] = useState(false);
    const [seeAdmin, setAdmin] = useState(false);
    const [seeVerified, setVerified] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [test, setTest] = useState();
    const { lang } = useContext(LangContext);

    // const { id } = useParams();
    var existing = JSON.parse(localStorage.getItem('user'));

    const mutationDel = useMutation({
        mutationFn: (e) =>
            newRequest.delete(`/list/` + e).then((res) => {
                console.log("Deleted Post");
            })
    });

    if (!user) {
        navigate("/home");
    }

    function Profile() {

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

        const setEmail = (props) => {
            // console.log(props);
            if (props !== "") {
                if (props.toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
                    var existing = JSON.parse(localStorage.getItem('user'));
                    existing.email = props;
                    newRequest.put(`/auth/set/${user._id}`, { email: props });
                    localStorage.setItem('user', JSON.stringify(existing));
                }
                else {
                    alert("Enter a vaild email");
                }
            } else {
                alert("Did not enter anything");
            }
        }
        const setPhone = (props) => {
            // console.log(props);
            if (props !== "") {
                var existing = JSON.parse(localStorage.getItem('user'));
                existing.phone = props;
                newRequest.put(`/auth/set/${user._id}`, { phone: props });
                localStorage.setItem('user', JSON.stringify(existing));
            } else {
                alert("Did not enter anything");
            }
        }
        const setPass = (props) => {
            // console.log(props);
            if (props !== "") {
                newRequest.put(`/auth/pass/${user._id}`, { password: props });
            } else {
                alert("Did not enter anything");
            }
        }

        return (
            <div>
                <h1 className='flex w-full justify-center lg:justify-start py-10 lg:pt-5 items-center lg:items-start flex-row font-bold text-2xl'>{lang === "En" ? "Account Info" : "Informations de compte!"} </h1>
                <div className='flex w-[50%]] justify-start rounded-md bg-white p-5'>
                    <div className='flex w-full lg:pt-0 lg:items-center flex-col gap-3 [&>h1]:font-bold [&>h1]:text-2xl'>
                        <div className='flex w-full justify-between lg:pt-0 items-center lg:items-start lg:flex-row flex-col'>
                            <div className='flex flex-col items-start text-start text-sm lg:text-lg'>
                                <h1 className='font-bold text-lg'>{lang === "En" ? "Email:" : "Email"}</h1>
                                <label className='text-[#a7a6ab]'>{lang==="En"? "We'll use your email to send you any important updates about your account!":"Nous utiliserons votre Email pour vous envoyer des mises à jour importantes concernant votre compte !"}</label>
                            </div>
                            <div className='flex flex-row gap-3 items-center font-normal w-full justify-between lg:justify-end text-sm lg:text-lg'>
                                <h1>{user && user.email}</h1>
                                <a onClick={() => setEmail(prompt("Set a new email"))} className='text-lg font-medium text-blue-400 hover:underline'>Edit</a>
                            </div>
                        </div>
                        {/* <h2>Name: {user&&user.name}</h2> */}
                        <div className='flex w-full justify-between lg:pt-0 items-center lg:items-start lg:flex-row flex-col [&>h1]:font-bold [&>h1]:text-lg'>
                            <div className='flex flex-col items-start w-full text-sm lg:text-lg'>
                                <h1 className='font-bold text-lg'>{lang === "En" ? "Phone" : "Téléphone"}</h1>
                                <label className='text-[#a7a6ab]'>{lang==="En"? "This will be used for Lumicash payment verification" :"Ceci sera utilisé pour la vérification des paiements Lumicash."}</label>
                            </div>
                            <div className='flex flex-row gap-3 items-center font-normal w-full justify-between lg:justify-end text-sm lg:text-lg'>
                                <h1>{user && formatPhoneNumber(user.phone)}</h1>
                                <a onClick={() => setPhone(prompt("Set a new Phone Number"))} className='text-lg font-medium text-blue-400 hover:underline'>Edit</a>
                            </div>
                        </div>
                        <div className='flex w-full justify-between lg:pt-0 items-center lg:items-start lg:flex-row flex-col [&>h1]:font-bold [&>h1]:text-lg'>
                            <div className='flex flex-col items-start text-start text-sm lg:text-lg'>
                                <h1 className='font-bold text-lg'>{lang === "En" ? "Password":"Mot de passe"}</h1>
                                <label className='text-[#a7a6ab]'>{lang==="En" ? "Reset your password. Make sure its secure to protect your account" : "Réinitialisez votre mot de passe. Assurez-vous qu'il est sécurisé pour protéger votre compte."}</label>
                            </div>
                            <div className='flex flex-row gap-3 items-center font-normal w-full justify-between lg:justify-end text-sm lg:text-lg'>
                                <button onClick={() => setPass(prompt("Set a new Password"))} type='button' className='text-blue-700 font-bold border-[1px] rounded-md border-blue-700 p-2'>Reset Password</button>
                            </div>
                        </div>
                        <div className='flex w-full justify-between lg:pt-0 items-center lg:items-start lg:flex-row flex-col [&>h1]:font-bold [&>h1]:text-lg'>
                            <div className='flex flex-col w-full items-start text-start text-sm lg:text-lg'>
                                <h1 className='font-bold text-lg'>{lang==="En" ? "Verify Email:":"Vérifier l'Email"}</h1>
                                <label className='text-[#a7a6ab]'>{lang === "En" ? "Verify your email to help make your account secure!" : "Vérifiez votre courriel pour contribuer à la sécurité de votre compte !"}</label>
                            </div>
                            <div className='flex flex-row gap-3 items-center font-normal w-full justify-between lg:justify-end text-sm lg:text-lg'>
                                <button className='text-blue-700 font-bold border-[1px] rounded-md border-blue-700 p-2'>Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    function Items() {

        const { isLoading, error, data, refetch } = useQuery({
            queryKey: ["lists"],
            queryFn: () =>
                newRequest.get(`/list/posts?` + "userId=" + user._id + "&sort=date&order=-1").then((res) => {
                    return res.data;
                }),
        });

        /* Old Code
        const [posts, setPosts] = useState();
        const search = async () => {
 
            let array = [];
 
            // const docSnap = getDoc(doc(db, "posts", "post"));
            const q = query(collection(db, "posts"), where("uid", "==", user.uid), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            // console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                array.push(doc.data());
            });
 
            // array = querySnapshot.docs;
            setPosts(array);
        }
        useEffect(() => {
            console.log("test");
            search();
        }, []);*/

        const deletePost = async (e) => {
            alert("deleting post " + e);
            mutationDel.mutate(e);
        }
        useEffect(() => {
            refetch();
        }, [data?.posts]);

        return (
            <div className='flex flex-col-reverse justify-center items-center gap-5 lg:grid w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-3 min-[1800px]:grid-cols-4 w-fit gap-2'>
                    {
                        data?.posts.length !== 0 && data ?
                            data.posts && data.posts.map(p => (
                                <div className='flex flex-col items-center max-w-[370px] gap-1 py-3'>
                                    {
                                        (p.what === "house" ? <ListContainer verified={p.verified} hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} room={p.room} bath={p.bath} m2={p.m2} addy={p.addy} zone={p.zone} commune={p.commune} /> : <ListContainer verified={p.verified} hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} addy={p.addy} zone={p.zone} commune={p.commune} make={p.make} model={p.model} year={p.year} mileage={p.mileage} mpg={p.mpg} engine={p.engine} color={p.color} />)
                                    }
                                    <div className='flex flex-row gap-2 min-w-[325px] w-full items-center'>
                                        <button type='button' className='p-2 font-bold w-full text-black bg-white rounded hover:underline text-[15px]' onClick={() => { p.what === "house" ? navigate("/house-edit/" + p._id) : navigate("/car-edit/" + p._id) }}>{lang === "En" ? "Edit" : "Modifier"}</button>
                                        <button type='button' className='p-2 font-bold w-full text-black bg-white rounded hover:underline text-[15px]' onClick={() => deletePost(p._id)}>{lang === "En" ? "Delete" : "Supprimer"}</button>
                                    </div>
                                    <button type='button' className='p-2 w-full font-bold text-black bg-white rounded hover:underline text-[15px]' onClick={() => navigate("/verify/" + p._id)}>{lang === "En" ? "Verify Your Listing" : "Vérifiez votre annonce"}</button>
                                </div>
                            ))
                            : <div>No Listings</div>
                    }
                </div>
            </div>
        );

    }

    function Listings() {

        const { isLoading, error, data, refetch } = useQuery({
            queryKey: ["list3"],
            queryFn: () =>
                newRequest.get(`/list/saved/` + existing._id).then((res) => {
                    console.log(JSON.stringify(res.data));
                    return res.data;
                }),
        });

        useEffect(() => {
            refetch();
        }, [data?.posts]);

        return (
            <div className='w-full flex justify-center'>
                <div className='grid items-center grid-cols-1 min-[1300px]:grid-cols-3 min-[1800px]:grid-cols-4 lg:max-w-[1600px] h-auto gap-2 py-3'>
                    {
                        data?.length !== 0 && data ? data.map(p => (
                            <div className='flex flex-col items-center max-w-[370px]'>
                                {/* {console.log(p._id)} */}
                                {
                                    (p.what === "house" ? <ListContainer verified={p.verified} hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} room={p.room} bath={p.bath} m2={p.m2} addy={p.addy} zone={p.zone} commune={p.commune} /> : <ListContainer verified={p.verified} hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} addy={p.addy} zone={p.zone} commune={p.commune} make={p.make} model={p.model} year={p.year} mileage={p.mileage} mpg={p.mpg} engine={p.engine} color={p.color} />)
                                }
                            </div>
                        )) : <div><h1>No Saved Listings</h1></div>}
                </div>
            </div>
        );
    }

    // {lang === "En" ?"null":"null"}
    if (user)
        return (
            <div className='flex flex-col w-full lg:flex-col h-full bg-gradient-to-b from-white to-[skyblue] min-h-[700px]'>
                <div className='flex flex-col lg:flex-row justify-center lg:justify-start bg-white py-3 relative top-0 left-0 h-full gap-2 border-t-2 border-black lg:px-48'>
                    <button className={(seeItems ? ('underline') : ('')) + ' bg-blue-400 hover:underline text-[15px] text-white font-semibold py-2 px-4 rounded'} onClick={() => { setItems(true); setProfile(false); setListings(false); setAdmin(false); }}>{lang === "En" ? "Your Listings" : "Vos annonces"}</button>
                    <button className={(seeListings ? ('underline') : ('')) + ' bg-blue-400 hover:underline text-[15px] text-white font-semibold py-2 px-4 rounded'} onClick={() => { setListings(true); setItems(false); setProfile(false); setAdmin(false); }}>{lang === "En" ? "Saved Listings" : "Annonces sauvegardées"}</button>
                    <button className={(seeProfile ? ('underline') : ('')) + ' bg-blue-400 hover:underline text-[15px] text-white font-semibold py-2 px-4 rounded'} onClick={() => { setProfile(true); setItems(false); setListings(false); setAdmin(false); }}>{lang === "En" ? "Account Info" : "Informations du compte"}</button>
                    <button className='bg-blue-400 hover:underline text-[15px] text-white font-semibold py-2 px-4 rounded' onClick={() => { newRequest.post("/auth/logout"); localStorage.clear(); navigate("/home"); location.reload(); }}>{lang === "En" ? "Sign Out" : "Déconnexion"}</button>
                    {user && user.admin ? <button className={(seeAdmin ? ('underline') : ('')) + ' bg-blue-400 hover:underline text-[15px] text-white font-semibold py-2 px-4 rounded'} onClick={() => { setAdmin(true); setProfile(false); setItems(false); setListings(false); }}>{lang==="En" ? "Admin" : "Administrateur"}</button> : null}
                </div>
                <div className='w-full relative flex flex-wrap flex-col box-border lg:px-[75px] max-h-full'>
                    {seeProfile ? <Profile /> : null}
                    {seeItems ? <Items /> : null}
                    {seeListings ? <Listings /> : null}
                    {seeAdmin ? <Admin /> : null}
                </div>
            </div>
        );
    else {
        navigate('/home');
        return (
            <div></div>
        );
    }
}