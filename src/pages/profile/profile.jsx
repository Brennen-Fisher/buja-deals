import { v4 as uuid } from 'uuid';
import React, { useContext, useEffect, useState } from 'react'
import './profile.scss';
import { AuthContext } from "./../../context/AuthContext";
import { Navigate, useNavigate, useParams } from 'react-router';
import ListContainer from '../../components/listingContainer/listContainer';
import { useMutation, useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { LangContext } from '../../context/LangContext';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [seeProfile, setProfile] = useState(true);
    const [seeItems, setItems] = useState(false);
    const [seeListings, setListings] = useState(false);
    const [seeVerified, setVerified] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [test, setTest] = useState();
    const { lang } = useContext(LangContext);

    // const { id } = useParams();
    var existing = JSON.parse(localStorage.getItem('user'));

    const { isLoading, error, data } = useQuery({
        queryKey: ["lists"],
        queryFn: () =>
            newRequest.get(`/list/posts?` + "userId=" + user._id + "&sort=date&order=-1").then((res) => {
                return res.data;
            }),
    });

    const { savIsLoading, savError, saved } = useQuery({
        queryKey: ["list3"],
        queryFn: () =>
            newRequest.get(`/list/saved/` + existing._id).then((res) => {
                // console.log(JSON.stringify(res.data));
                setTest(res.data);
                return res.data;
            }),
    });

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
            console.log(props);
            var existing = JSON.parse(localStorage.getItem('user'));
            existing.email = props;
            newRequest.put(`/auth/set/${user._id}`, { email: props });
            localStorage.setItem('user', JSON.stringify(existing));
        }
        const setPhone = (props) => {
            // console.log(props);
            var existing = JSON.parse(localStorage.getItem('user'));
            existing.phone = props;
            newRequest.put(`/auth/set/${user._id}`, { phone: props });
            localStorage.setItem('user', JSON.stringify(existing));
        }
        const setPass = (props) => {
            // console.log(props);
            newRequest.put(`/auth/pass/${user._id}`, { password: props});
        }

        return (
            <div>
                <h1 className='flex w-full justify-center lg:justify-start py-10 lg:pt-5 items-center lg:items-start flex-row font-bold text-2xl'>{lang === "En" ? "Account Info" : "Informations de compte!"} </h1>
                <div className='flex w-[50%]] justify-start rounded-md bg-white p-5'>
                    <div className='flex w-full lg:pt-0 lg:items-center flex-col gap-3 [&>h1]:font-bold [&>h1]:text-2xl'>
                        <div className='flex w-full justify-between lg:pt-0 items-center lg:items-start lg:flex-row flex-col'>
                            <div className='flex flex-col items-start text-start text-sm lg:text-lg'>
                                <h1 className='font-bold text-lg'>{lang === "En" ? "Email:" : "Bonjour!"}</h1>
                                <label className='text-[#a7a6ab]'>We'll use your email to send you any important updates about your account!</label>
                            </div>
                            <div className='flex flex-row gap-3 items-center font-normal w-full justify-between lg:justify-end text-sm lg:text-lg'>
                                <h1>{user && user.email}</h1>
                                <a onClick={()=>setEmail(prompt("Set a new email"))} className='text-lg font-medium text-blue-400 hover:underline'>Edit</a>
                            </div>
                        </div>
                        {/* <h2>Name: {user&&user.name}</h2> */}
                        <div className='flex w-full justify-between lg:pt-0 items-center lg:items-start lg:flex-row flex-col [&>h1]:font-bold [&>h1]:text-lg'>
                            <div className='flex flex-col items-start text-start text-sm lg:text-lg'>
                                <h1 className='font-bold text-lg'>Phone</h1>
                                <label className='text-[#a7a6ab]'>This will be used for Lumicash payment verification</label>
                            </div>
                            <div className='flex flex-row gap-3 items-center font-normal w-full justify-between lg:justify-end text-sm lg:text-lg'>
                                <h1>{user && formatPhoneNumber(user.phone)}</h1>
                                <a onClick={()=>setPhone(prompt("Set a new Phone Number"))} className='text-lg font-medium text-blue-400 hover:underline'>Edit</a>
                            </div>
                        </div>
                        <div className='flex w-full justify-between lg:pt-0 items-center lg:items-start lg:flex-row flex-col [&>h1]:font-bold [&>h1]:text-lg'>
                            <div className='flex flex-col items-start text-start text-sm lg:text-lg'>
                                <h1 className='font-bold text-lg'>Password</h1>
                                <label className='text-[#a7a6ab]'>Reset your password. Make sure its secure to protect your account</label>
                            </div>
                            <div className='flex flex-row gap-3 items-center font-normal w-full justify-between lg:justify-end text-sm lg:text-lg'>
                                <button onClick={()=>setPass(prompt("Set a new Password"))} type='button' className='text-blue-700 font-bold border-[1px] rounded-md border-blue-700 p-2'>Reset Password</button>
                            </div>
                        </div>
                        <div className='flex w-full justify-between lg:pt-0 items-center lg:items-start lg:flex-row flex-col [&>h1]:font-bold [&>h1]:text-lg'>
                            <div className='flex flex-col items-start text-start text-sm lg:text-lg'>
                                <h1 className='font-bold text-lg'>Verify Email:</h1>
                                <label className='text-[#a7a6ab]'>Verify your email to help make your account secure!</label>
                            </div>
                            <div className='flex flex-row gap-3 items-center font-normal w-full justify-between lg:justify-end text-sm lg:text-lg'>
                                <button className='text-blue-700 font-bold border-[1px] rounded-md border-blue-700 p-2'>Verify</button>
                            </div>
                        </div>
                        <button className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { newRequest.post("/auth/logout"); localStorage.clear(); navigate("/home"); location.reload(); }}>Sign Out</button>
                    </div>
                </div>
            </div>
        );

    }

    function Items() {

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


        return (
            <div className='flex flex-col-reverse gap-5 pt-5 lg:grid grid-cols-[5fr,1fr] w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-2 min-[1800px]:grid-cols-3 w-full gap-5'>
                    {
                        data.posts && data.posts.map(p => (
                            <div className='flex flex-col items-center max-w-[370px] gap-2 py-3'>
                                {
                                    (p.what === "house" ? <ListContainer hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} room={p.room} bath={p.bath} m2={p.m2} addy={p.addy} zone={p.zone} commune={p.commune} /> : <ListContainer hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} addy={p.addy} zone={p.zone} commune={p.commune} make={p.make} model={p.model} year={p.year} mileage={p.mileage} mpg={p.mpg} engine={p.engine} color={p.color} />)
                                }
                                <div className='flex flex-row gap-2 w-full items-center'>
                                    <button className='p-2 font-bold w-full text-black bg-white rounded hover:underline text-[15px]' onClick={() => { p.what === "house" ? navigate("/house-edit/" + p._id) : navigate("/car-edit/" + p._id) }}>{lang === "En" ? "Edit" : "Modifier"}</button>
                                    <button className='p-2 font-bold w-full text-black bg-white rounded hover:underline text-[15px]' onClick={() => deletePost(p._id)}>{lang === "En" ? "Delete" : "Supprimer"}</button>
                                </div>
                                <button className='p-2 w-full font-bold text-black bg-white rounded hover:underline text-[15px]' onClick={()=>navigate("/verify/" + p._id) }>Verify Your Listing</button>
                            </div>
                        ))}
                </div>
            </div>
        );

    }

    function Listings() {
        // p._id==='undefined'?deletePost(p_id):console.log("gaming");
        // console.log(test);
        // for (let element of test) {
        //     if (element === undefined) {
        //         console.log("dru");
        //     }
        // }

        const setSaved = (props) => {
            // console.log(props);
            var existing = JSON.parse(localStorage.getItem('user'));
            existing.saved = [];
            for (var obj of props)
                existing.saved.push(obj._id);
            newRequest.put(`/user/set/${user._id}`, { saved: existing.saved });
            localStorage.setItem('user', JSON.stringify(existing));
        }


        const { checkIsLoading, checkError, check } = useQuery({
            queryKey: ["list5"],
            queryFn: () =>
                newRequest.get(`/list/` + id).then((res) => {
                    return res.data;
                }),
        });

        useEffect(() => {
            if(test)
                setSaved(test);
        }, []);

        return (
            <div className='grid grid-cols-1 lg:grid-cols-2 min-[1800px]:grid-cols-4 lg:max-w-[1100px] min-[1800px]:max-w-full h-auto gap-2 py-3'>
                {
                    test?.length !== 0 && test ? test.map(p => (
                        <div className='flex flex-col items-center'>
                            {/* {console.log(p._id)} */}
                            {(p.what === "house" ? <ListContainer hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} room={p.room} bath={p.bath} m2={p.m2} addy={p.addy} zone={p.zone} commune={p.commune} /> : <ListContainer hover={true} city={p.city} style={p.style} sale={p.sale} what={p.what} id={p._id} image={p.image} price={p.price} addy={p.addy} zone={p.zone} commune={p.commune} make={p.make} model={p.model} year={p.year} mileage={p.mileage} mpg={p.mpg} engine={p.engine} color={p.color} />)}
                        </div>
                    )) : <div><h1>No Saved Listings</h1></div>}
            </div>
        );
    }
    function Verified() {

        return (
            <div className='flex gap-2'>
                <div className='flex items-start flex-col [&>h2]:font-bold [&>h2]:text-2xl pt-10'>
                    <h2>{lang === "En" ? "Please use lumicash to send a payment of X amount and send the listing you'd like to verify" : "Vos annonces Annonces enregistrées Vérifié Veuillez utiliser Lumicash pour envoyer un paiement d'un montant X et envoyer l'annonce que vous souhaitez vérifier"}</h2>
                </div>
            </div>
        );
    }
    // {lang === "En" ?"null":"null"}
    return (
        <div className='flex flex-col w-full lg:flex-row h-full bg-[skyblue] min-h-[700px]'>
            <div className='flex flex-col translate-x-[15%] lg:translate-x-[0%] mt-3 bg-white p-5 relative ml-20 top-0 left-0 w-40 h-full justify-center rounded gap-2'>
                <button className='bg-blue-400 hover:underline text-[15px] text-black font-semibold py-2 px-4 rounded' onClick={() => { setVerified(false); setProfile(true); setItems(false); setListings(false); }}>{lang === "En" ? "Account Info" : "Informations de compte"}</button>
                <button className='bg-blue-400 hover:underline text-[15px] text-black font-semibold py-2 px-4 rounded' onClick={() => { setVerified(false); setItems(true); setProfile(false); setListings(false); }}>{lang === "En" ? "Your Listings" : "Vos annonces"}</button>
                <button className='bg-blue-400 hover:underline text-[15px] text-black font-semibold py-2 px-4 rounded' onClick={() => { setVerified(false); setListings(true); setItems(false); setProfile(false); }}>{lang === "En" ? "Saved Listings" : "Listes enregistrées"}</button>
                <button className='bg-blue-400 hover:underline text-[15px] text-black font-semibold py-2 px-4 rounded' onClick={() => { setVerified(true); setListings(false); setItems(false); setProfile(false); }}>{lang === "En" ? "Verified" : "Vérifié"}</button>
            </div>
            <div className='w-full relative flex flex-wrap flex-col box-border lg:px-[75px] max-h-full'>
                {seeProfile ? <Profile /> : null}
                {seeItems ? <Items /> : null}
                {seeListings ? <Listings /> : null}
                {seeVerified ? <Verified /> : null}
            </div>
        </div>
    );
}