import React, { useContext, useEffect, useReducer, useState } from 'react'
import './form.scss';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../../firebase";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import newRequest from '../../utils/newRequest';
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LangContext } from '../../context/LangContext';


function HouseForm() {

    const { lang } = useContext(LangContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [featImg, setFeat] = useState(0);
    let imageUrl = [];
    const [tags, setTags] = useState([]);

    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (list) => {
            return newRequest.post("/list/createPost", list);
        },
        onSuccess: () => {
            navigate("/listings");
        },
    });

    function TagsInput() {
        function handleKeyDown(e) {
            if (e.key !== 'Enter') return
            const value = e.target.value
            if (!value.trim()) return
            setTags([...tags, value])
            e.target.value = ''
        }

        function removeTag(index) {
            setTags(tags.filter((el, i) => i !== index))
        }

        return (
            <div className="flex flex-col items-center flex-wrap gap-[0.5em] mt-[1em] p-[0.5em] rounded-[3px] border-2 border-solid border-black">
                <div className='w-auto flex flex-row max-w-[500px] flex-wrap'>
                    {tags?.map((tag, index) => (
                        <div className="bg-[rgb(218,216,216)] flex flex-row px-[0.75em] py-[0.5em] rounded-[20px]" key={index}>
                            <span className="text">{tag}</span>
                            <span className="h-5 w-5 bg-[rgb(48,48,48)] text-white inline-flex justify-center items-center text-lg cursor-pointer ml-[0.5em] rounded-[50%]" onClick={() => removeTag(index)}>&times;</span>
                        </div>
                    ))}
                </div>
                <textarea onKeyDown={(e) => handleKeyDown(e)} type="text" className="grow w-full px-0 py-[0.5em] border-[none] outline-none" placeholder="Type somthing" />
            </div>
        );
    }

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

    const handleHouseUpload = (e) => {
        e.preventDefault();
        // console.log(e);
        // let tempFile = e.target[12].files;
        let tempFile = e.target.files;
        if (!tempFile) {

            alert("Please upload an image first!");
        }
        for (var i = 0; i < tempFile.length; i++) {
            {
                const storageRef = ref(storage, `/files/${tempFile[i].name}`);
                console.log(tempFile);
                // progress can be paused and resumed. It also exposes progress updates.
                // Receives the storage reference and the file to upload.
                const uploadTask = uploadBytesResumable(storageRef, tempFile[i]);

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
                            // console.log(url);
                            // imageUrl.push(url);
                            setFiles(files => [...files, url]);
                            // if (imageUrl.length === tempFile.length)
                            //     handleHouseSubmission(e);
                        });
                    }
                );
            }
        }
    };

    const handleHouseSubmission = async (e) => {
        e.preventDefault();
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
        handleChange(e.target[e.target.length - 3]);
        handleChange(e.target[e.target.length - 2]);
        handleChange({ name: "feat", value: tags });
        handleChange({ name: "what", value: "house" });
        featImg ? handleChange({ name: "image", value: swapPositions(files, featImg, 0) }) : handleChange({ name: "image", value: files });
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
                <form className='bg-white rounded-md flex flex-col items-center gap-[10px] w-full lg:w-[50%] p-3' onSubmit={handleHouseSubmission}>
                    <h1 className='text-2xl font-bold'>{lang === "En" ? "Add a new home" : "Ajouter une nouvelle maison"}</h1>
                    <div id='basic' className='pt-10 w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Basic Info" : "Informations de base"}</h2>
                        <div className='grid grid-cols-2 gap-[20px] w-[75%] pb-14'>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Price:" : "Entreprise:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='price' type="number" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Style:" : "Entrez le style:"}
                                <select name="style" className='p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
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
                                {lang === "En" ? "Enter Year of Contruction:" : "Entrez l'année de construction:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='year' type="number" maxLength="4" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Is this for rent or sale?" : "Est-ce à louer ou à vendre?"}
                                <select name="sale" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
                                    <option value="blank"> </option>
                                    <option value="sale">{lang === "En" ? "For Sale" : "À vendre"}</option>
                                    <option value="rent">{lang === "En" ? "For Rent" : "A louer"}</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div id='size' className='w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Enter Size" : "Entrer la taille"}</h2>
                        <div className='w-[75%] grid grid-cols-2 gap-[20px] pb-14'>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Number of Baths:" : "Entrez le nombre de bains:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='bath' type="number" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Number of rooms:" : "Entrez le nombre de pièces:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='room' type="number" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Square Footage:" : "Entrez en pieds carrés:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='m2' type="number" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Lot Size:" : "Entrez la taille du lot:"}
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='lot' type="text" />
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
                                {lang === "En" ? "Enter Image(s):" : "Entrez l'image (s):"}
                                <input onChange={(e) => handleHouseUpload(e)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='image' type="file" multiple required accept=".jpg, .png" />
                            </label>
                        </div>
                        {files.length !== 0 ?
                            <div>
                                <h2 className='whitespace-nowrap text-[20px] font-medium'>Please select your featured image!</h2>
                                <br />
                                <div className='grid grid-cols-1 lg:grid-cols-2 min-[1800px]:grid-cols-3'>
                                    {
                                        files && files.map((p) => (<div className='flex flex-col'>
                                            <button type='button' onClick={() => setFeat(files.indexOf(p))}>
                                                <img className={featImg === files.indexOf(p) ? 'max-w-[300px] border-[5px] border-blue-500' : 'max-w-[300px]'} src={p}></img>
                                            </button>
                                            <button type='button' onClick={() => {
                                                setFiles(files.filter(item => item !== p))
                                            }}>
                                                Delete
                                            </button>
                                        </div>))
                                    }
                                </div>
                            </div> : null
                        }
                    </div>
                    <div id='tags' className='w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium' >Tags</h2>
                        <div className='gap-[20px] pb-14'>
                            <label className='flex flex-col items-start'>
                                <TagsInput />
                            </label>
                        </div>
                    </div>
                    <div id='additional' className='w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace-nowrap text-[20px] font-medium ' >{lang === "En" ? "Additional Information" : "Informations Complémentaires"}</h2>
                        <div className='w-[75%] grid grid-cols-2 gap-[25px] lg:gap-[20px] pb-14'>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Description:" : "Entrez Description:"}
                                <textarea name='desc' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Give a short Description'></textarea>
                            </label>
                            <label className='flex flex-col items-start'>
                                {lang === "En" ? "Enter Facts:" : "Entrez les faits:"}
                                <textarea name='fact' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Optional'></textarea>
                            </label>
                        </div>
                    </div>
                    <button className='bg-blue-500 text-white w-[25%] font-medium py-2 px-4 rounded hover:underline' type='submit'>{lang === "En" ? "submit" : "soumettre"}</button>
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

export default HouseForm;