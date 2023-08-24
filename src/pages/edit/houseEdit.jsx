import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import './edit.scss';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from "../../firebase";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import newRequest from '../../utils/newRequest';
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LangContext } from '../../context/LangContext';


function HouseEdit() {

    const { lang } = useContext(LangContext);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    let imageUrl = [];

    // console.log(id);

    const { isLoading, error, data } = useQuery({
        queryKey: ["list2"],
        queryFn: () =>
            newRequest.get(`/list/` + id).then((res) => {
                // console.log("object");
                return res.data;
            }),
    });
    // console.log(data);

    const swapPositions = (array, from, to) => {
        let temp = [];
        console.log(array);
        for (var i = 0; i < array.length; i++) {
            if (i === from) {
                temp.push(array[to]);
            }
            else if (i === to) {
                temp.push(array[from]);
            }
            else {
                temp.push(array[i]);
            }
        }
        return temp;
    }

    const mutation = useMutation({
        mutationFn: (list) => {
            return newRequest.put(`/list/${id}`, list);
        },
        onSuccess: () => {
            navigate("/listings");
        },
    });

    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
    const [price, setPrice] = useState();
    const [year, setYear] = useState();
    const [sale, setSale] = useState();
    const [bath, setBath] = useState();
    const [room, setRoom] = useState();
    const [m2, setM2] = useState();
    const [style, setStyle] = useState();
    const [desc, setDesc] = useState();
    const [feat, setFeat] = useState();
    const [fact, setFact] = useState();
    const [city, setCity] = useState();
    const [commune, setCommune] = useState();
    const [zone, setZone] = useState();
    const [addy, setAddy] = useState();
    const [files, setFiles] = useState();
    const [featImg, setFeatImg] = useState();

    const handleHouseUpload = async (e) => {
        e.preventDefault();
        let tempFile = e.target.files;
        console.log(e);
        if (!tempFile) {

            alert("Please upload an image first!");
        }
        for (let indexFile of tempFile) {
            const storageRef = ref(storage, `/files/${indexFile.name}`);

            // progress can be paused and resumed. It also exposes progress updates.
            // Receives the storage reference and the file to upload.
            const uploadTask = uploadBytesResumable(storageRef, indexFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        setFiles(files => [...files, url]);  
                        // if (imageUrl.length === tempFile.length)
                            // handleHouseSubmission(e);
                    });
                }
            );
        }
    }

    const handleHouseSubmission = async (e) => {
        e.preventDefault();
        console.log(e);
        handleChange(e.target[0]);
        handleChange(e.target[1]);
        handleChange(e.target[2]);
        handleChange(e.target[3]);
        handleChange(e.target[4]);
        handleChange(e.target[5]);
        handleChange(e.target[6]);
        handleChange(e.target[7]);
        handleChange(e.target[8]);
        handleChange(e.target[9]);
        handleChange(e.target[10]);
        handleChange(e.target[11]);
        handleChange(e.target[e.target.length-4]);
        handleChange(e.target[e.target.length-3]);
        handleChange(e.target[e.target.length-2]);
        handleChange({ name: "m2", value: e.target[6].value });
        handleChange({ name: "type", value: "house" });
        featImg? handleChange({ name: "image", value: swapPositions(files, featImg, 0) }) : handleChange({ name: "image", value: files});
        handleChange({ name: "userId", value: user._id });
    }

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.name, value: e.value },
        });
    }

    useEffect(() => {
        setPrice(data?.price);
        setYear(data?.year);
        setSale(data?.sale);
        setBath(data?.bath);
        setRoom(data?.room);
        setM2(data?.m2);
        setStyle(data?.style);
        setDesc(data?.desc);
        setFeat(data?.feat);
        setFact(data?.fact);
        setCity(data?.city);
        setCommune(data?.commune);
        setZone(data?.zone);
        setAddy(data?.addy);
        setFiles(data?.image);
    }, [data]);

    useEffect(() => {
        // console.log(state);
        if (state.price !== 0) {
            mutation.mutate(state);
        }
    }, [state]);

    // {lang === "En" ?"null":"null"}    
    return (
        <div className='bg-[skyblue] w-full flex justify-center items-center flex-col p-5'>
            <form className='bg-white flex  w-full lg:w-[50%] flex-col items-center gap-[10px]' onSubmit={handleHouseSubmission}>
                <h1 className='text-2xl font-bold'>{lang === "En" ? "Change your listing" : "Modifiez votre annonce"}</h1>
                <div id='basic' className='pt-10 w-full flex flex-col items-center gap-[50px]'>
                    <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Basic Info" : "Informations de base"}</h2>
                    <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Price:" : "Change le prix:"}
                            <input value={price} required onChange={(e) => setPrice(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='price' type="text" required />
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Style:" : "Changer le style:"}
                            <select name="style" className='p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600' value={style} onChange={(e) => setStyle(e.target.value)}>
                                <option value="blank"> </option>
                                <option value="condo">{lang === "En" ? "Condo" : "condo"}</option>
                                <option value="single">{lang === "En" ? "Single Family Home" : "Maison unifamiliale"}</option>
                                <option value="townhouse">{lang === "En" ? "Townhouse" : "Maison de ville"}</option>
                                <option value="coop">{lang === "En" ? "Coop" : "Coopérative"}</option>
                                <option value="unknown">{lang === "En" ? "Unknown" : "Inconnue"}</option>
                                <option value="apartment">{lang === "En" ? "Apartment" : "Appartement"}</option>
                                <option value="multi">{lang === "En" ? "Multi Family" : "Plusieurs familles"}</option>
                                <option value="lot">{lang === "En" ? "Lot" : "Parcelle"}</option>
                            </select>
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Year of Contruction:" : "Changement Année de construction:"}
                            <input value={year} onChange={(e) => setYear(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='year' type="text" maxlength="4" required />
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Is this for rent or sale?" : "Est-ce à louer ou à vendre?"}
                            <select value={sale} onChange={(e) => setSale(e.target.value)} name="sale" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
                                <option value="blank"> </option>
                                <option value="sale">{lang === "En" ? "For Sale" : "À vendre"}</option>
                                <option value="rent">{lang === "En" ? "For Rent" : "A louer"}</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div id='size' className='w-full flex flex-col items-center gap-[50px]'>
                    <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Change Size" : "Changer la taille"}</h2>
                    <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Number of Baths:" : "Changer le nombre de bains:"}
                            <input value={bath} onChange={(e) => setBath(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='bath' type="text" required />
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Number of rooms:" : "Changer le nombre de pièces:"}
                            <input value={room} onChange={(e) => setRoom(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='room' type="text" required />
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Meters Squared:" : "Changer les compteurs au carré:"}
                            <input value={m2} onChange={(e) => setM2(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='m2' type="text" required />
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Lot Size:" : "Changer la taille du lot:"}
                            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='m2' type="text" />
                        </label>
                    </div>
                </div>
                <div id='location' className='w-full flex flex-col items-center gap-[50px]'>
                    <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Change Location" : "Changer de lieu"}</h2>
                    <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Address:" : "Changement d'adresse:"}
                            <textarea value={addy} onChange={(e) => setAddy(e.target.value)} name='addy' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></textarea>
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change City:" : "Changer la ville:"}
                            <input required value={city} onChange={(e) => setCity(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='city' type="text" />
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Enter Commune:" : "Entrez le Commune:"}
                            <select name="commune" value={commune} onChange={(e) => setCommune(e.target.value)} className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
                                <option value="any">Any</option>
                                <option value="muha">Muha</option>
                                <option value="mukaza">Mukaza</option>
                                <option value="ntahangwa">Ntahangwa</option>
                            </select>
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Enter Zone:" : "Entrez le Zone:"}
                            <select name="zone" value={zone} onChange={(e) => setZone(e.target.value)} className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
                                <option value="any">Any</option>
                                <option value="buterere">Buterere</option>
                                <option value="buyenzi">Buyenzi</option>
                                <option value="bwiza">Bwiza</option>
                                <option value="cibitoke">Cibitoke</option>
                                <option value="gihosha">Gihosha</option>
                                <option value="kamenge">Kamenge</option>
                                <option value="kanyosha">Kanyosha</option>
                                <option value="kinama">Kinama</option>
                                <option value="kinindo">Kinindo</option>
                                <option value="musaga">Musaga</option>
                                <option value="ngagara">Ngagara</option>
                                <option value="rohero">Rohero</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div id='media' className='w-full flex flex-col items-center gap-[50px]'>
                    <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Change Media" : "Changer les médias"}</h2>
                    <div className='flex gap-[50px] pb-24'>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Please Re Upload Images:" : "Veuillez télécharger des images:"}
                            <input onChange={(e) => handleHouseUpload(e)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='image' type="file" multiple required accept=".jpg, .png" />
                        </label>
                    </div>
                    {files ?
                            <div>
                                <h2 className='whitespace-nowrap text-[20px] font-medium'>Please select your featured image!</h2>
                                <br />
                                <div className='grid grid-cols-1 lg:grid-cols-3'>
                                    {
                                        files && files.map((p) => (<button type='button' onClick={() => setFeatImg(files.indexOf(p))}><img className={featImg === files.indexOf(p) ? 'max-w-[300px] border-[5px] border-blue-500' : 'max-w-[300px]'} src={p}></img></button>))
                                    }
                                </div>
                            </div> : null
                        }
                </div>
                <div id='additional' className='w-full flex flex-col items-center gap-[50px]'>
                    <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Additional Information" : "Informations Complémentaires"}</h2>
                    <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Description:" : "Changer la description:"}
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} name='desc' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Give a short Description'></textarea>
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Features:" : "Changer les fonctionnalités:"}
                            <textarea value={feat} onChange={(e) => setFeat(e.target.value)} name='feat' className="fix block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Airconditioned | Parking | 3 Stories'></textarea>
                        </label>
                        <label className='flex flex-col items-start'>
                            {lang === "En" ? "Change Facts:" : "Changer les faits:"}
                            <textarea value={fact} onChange={(e) => setFact(e.target.value)} name='fact' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Optional'></textarea>
                        </label>
                    </div>
                </div>
                <button className='bg-blue-500 text-white font-medium py-2 px-4 rounded hover:underline' type='submit'>{lang === "En" ? "submit" : "soumettre"}</button>
            </form>
        </div>
    );
}

export default HouseEdit