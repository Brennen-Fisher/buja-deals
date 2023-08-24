import React, { useContext, useEffect, useReducer, useState } from 'react'
import './form.scss';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from "../../firebase";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import newRequest from '../../utils/newRequest';
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LangContext } from '../../context/LangContext';


function CarForm() {

    const { lang } = useContext(LangContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    let imageUrl = [];
    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
    const [files, setFiles] = useState([]);
    const [featImg, setFeat] = useState();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (list) => {
            return newRequest.post("/list/createPost", list);
        },
        onSuccess: () => {
            navigate("/listings");
        },
    });

    const swapPositions = (array, from, to) => {
        let temp = [];
        // console.log(array);
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

    const handleCarUpload = async (e) => {
        e.preventDefault();
        let tempFile = e.target.files;
        console.log(tempFile);
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
                        //     handleCarSubmission(e);
                    });
                }
            );
        }
    };

    const handleCarSubmission = async (e) => {
        // console.log(e);
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
        handleChange(e.target[12]);
        handleChange(e.target[13]);
        handleChange(e.target[14]);
        handleChange(e.target[e.target.length-4]);
        handleChange(e.target[e.target.length-3]);
        handleChange(e.target[e.target.length-2]);
        handleChange({ name: "what", value: "car" });
        handleChange({ name: "image", value: swapPositions(files, featImg, 0) });
        handleChange({ name: "userId", value: user._id });
    }

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.name, value: e.value },
        });
    }

    useEffect(() => {
        // console.log(state);
        if (state.price !== 0) {
            mutation.mutate(state);
        }
    }, [state]);

    if (user)
        return (
            <div className='bg-[skyblue] w-full flex justify-center items-center flex-col lg:p-5 '>
                <form className='bg-white p-3 w-full lg:w-[50%] flex flex-col items-center gap-[10px]' onSubmit={handleCarSubmission}>
                    <h1 className='text-2xl font-bold'>{lang === "En" ? "Add a new Car" : "Ajouter une nouvelle voiture"}</h1>
                    <div id='basic' className='w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium w-1/4' >{lang === "En" ? "Basic Info" : "Informations de base"}</h2>
                        <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Price:" : "Entreprise:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='price' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Year:" : "Entrez l'année:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='year' type="text" maxlength="4" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Make:" : "Entrez Make:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='make' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Model:" : "Entrez le modèle:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='model' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Total Mileage:" : "Entrez le kilométrage total:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='mileage' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Miles per Gallon:" : "Entrez des kilomètres par gallon:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='mpg' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Color:" : "Entrez la couleur:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='color' type="text" />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Is this for rent or sale?" : "Est-ce à louer ou à vendre?"}
                                <select className="w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600" name="sale" id="type">
                                    <option value="blank"> </option>
                                    <option value="sale">{lang === "En" ? "For Sale" : "À vendre"}</option>
                                    <option value="rent">{lang === "En" ? "For Rent" : "A louer"}</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div id='size' className='w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium w-1/4'>{lang === "En" ? "Specific Info" : "Informations spécifiques"}</h2>
                        <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Engine Size:" : "Entrez la taille du moteur:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='engine' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Year of Registration:" : "Année d'inscription:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='yor' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Manual or Automatic:" : "Manuel ou automatique:"}
                                <select className="w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600" name="style" id="style">
                                    <option value="blank"> </option>
                                    <option value="Manual">{lang === "En" ? "Manual" : "Manuel"}</option>
                                    <option value="Automatic">{lang === "En" ? "Automatic" : "Automatique"}</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div id='location' className='w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Enter Location" : "Entrer l'emplacement"}</h2>
                        <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Address:" : "Entrer l'adresse:"}
                                <textarea name='addy' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></textarea>
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter City:" : "Entrez la ville:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='city' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Commune:" : "Entrez le Commune:"}
                                <select name="commune" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
                                    <option value="any">Any</option>
                                    <option value="muha">Muha</option>
                                    <option value="mukaza">Mukaza</option>
                                    <option value="ntahangwa">Ntahangwa</option>
                                </select>
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Zone:" : "Entrez le Zone:"}
                                <select name="zone" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
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
                    <div id='media' className='w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Enter Media" : "Entrer les médias"}</h2>
                        <div className='gap-[20px] pb-14'>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Image:" : "Entrez l'image:"}
                                <input onChange={(e) => handleCarUpload(e)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='image' type="file" multiple required accept=".jpg, .png" />
                            </label>
                        </div>
                        {files.length !== 0 ?
                            <div>
                                <h2 className='whitespace-nowrap text-[20px] font-medium'>Please select your featured image!</h2>
                                <br />
                                <div className='grid grid-cols-1 lg:grid-cols-3'>
                                    {
                                        files && files.map((p) => (<button type='button' onClick={() => setFeat(files.indexOf(p))}><img className={featImg === files.indexOf(p) ? 'max-w-[300px] border-[5px] border-blue-500' : 'max-w-[300px]'} src={p}></img></button>))
                                    }
                                </div>
                            </div> : null
                        }
                    </div>
                    <div id='additional' className='w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium w-1/4'>{lang === "En" ? "Additional Information" : "Informations Complémentaires"}</h2>
                        <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Description:" : "Entrez Description:"}
                                <textarea name='desc' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Give a short Description'></textarea>
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Features:" : "Entrez les fonctionnalités:"}
                                <textarea name='feat' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Airconditioned | Parking | 3 Stories'></textarea>
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Facts:" : "Entrez les faits:"}
                                <textarea name='fact' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Optional'></textarea>
                            </label>
                        </div>
                    </div>
                    <button className='bg-blue-400 w-[25%] text-white font-medium py-2 px-4 rounded hover:underline' type='submit'>{lang === "En" ? "submit" : "soumettre"}</button>
                </form>
            </div>
        );
    else {
        useEffect(() => {
            alert("Not signed in");
            navigate("/home");
        }, []);
        return (
            <div>
            </div>
        );
    }
}

export default CarForm;