import React, { useContext, useEffect, useState } from 'react'
import './form.scss';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { db, storage } from "../../firebase";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
// import newRequest from '../../utils/newRequest';
// import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LangContext } from '../../context/LangContext';
import CarForm from './carForm';
import HouseForm from './houseForm';

function form() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { lang } = useContext(LangContext);
    const [what, setwhat] = useState("");

    // function SubmissionForm() {
    //     const [what, setwhat] = useState("");
    //     let imageUrl = [];
    //     let test;
    //     // progress
    //     const [percent, setPercent] = useState(0);
    //     const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);


    //     const queryClient = useQueryClient();
    //     const mutation = useMutation({
    //         mutationFn: (list) => {
    //             return newRequest.post("/list/createPost", list);
    //         },
    //         onSuccess: () => {
    //             navigate("/listings");
    //         },
    //     });

    //     const onImageChange = (event) => {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 test = reader.result;
    //             }
    //         }
    //         reader.readAsDataURL(event.target.files[0]);
    //     }

    //     const handleChange = (e) => {
    //         dispatch({
    //             type: "CHANGE_INPUT",
    //             payload: { name: e.name, value: e.value },
    //         });
    //     }

    //     useEffect(() => {
    //         // console.log(state);
    //         if (state.price !== 0) {
    //             mutation.mutate(state);
    //         }
    //     }, [state]);

    //     const handleHouseUpload = async (e) => {
    //         e.preventDefault();
    //         let tempFile = e.target[12].files;
    //         if (!tempFile) {

    //             alert("Please upload an image first!");
    //         }
    //         for (let indexFile of tempFile) {
    //             const storageRef = ref(storage, `/files/${indexFile.name}`);

    //             // progress can be paused and resumed. It also exposes progress updates.
    //             // Receives the storage reference and the file to upload.
    //             const uploadTask = uploadBytesResumable(storageRef, indexFile);

    //             uploadTask.on(
    //                 "state_changed",
    //                 (snapshot) => {
    //                     const percent = Math.round(
    //                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //                     );
    //                 },
    //                 (err) => console.log(err),
    //                 () => {
    //                     // download url
    //                     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                         console.log(url);
    //                         imageUrl.push(url);
    //                         if (imageUrl.length === tempFile.length)
    //                             handleHouseSubmission(e);
    //                     });
    //                 }
    //             );
    //         }
    //     };

    //     const handleHouseSubmission = async (e) => {
    //         e.preventDefault();
    //         handleChange(e.target[0]);
    //         handleChange(e.target[1]);
    //         handleChange(e.target[2]);
    //         handleChange(e.target[3]);
    //         handleChange(e.target[4]);
    //         handleChange(e.target[5]);
    //         handleChange(e.target[6]);
    //         handleChange(e.target[7]);
    //         handleChange(e.target[8]);
    //         handleChange(e.target[9]);
    //         handleChange(e.target[10]);
    //         handleChange(e.target[11]);
    //         handleChange(e.target[13]);
    //         handleChange(e.target[14]);
    //         handleChange(e.target[15]);
    //         handleChange({ name: "what", value: "house" });
    //         handleChange({ name: "image", value: imageUrl });
    //         handleChange({ name: "userId", value: user._id });

    //         // submit();
    //         // const image = imageUrl;
    //         {
    //             /*const price = parseFloat(e.target[0].value);
    //             const style = e.target[1].value;
    //             const year = e.target[2].value;
    //             const sale = e.target[3].value;
    //             const bath = e.target[4].value;
    //             const room = e.target[5].value;
    //             const sqft = e.target[6].value;
    //             const lot = e.target[7].value;
    //             const addy = e.target[8].value;
    //             const city = e.target[9].value;
    //             const state = e.target[10].value;
    //             const zip = e.target[11].value;
    //             const description = e.target[13].value;
    //             const feat = e.target[14].value;
    //         const fact = e.target[15].value;

    //         try {
    //             //Create user

    //             try {

    //                 //create post on firestore
    //                 const string = uuid();
    //                 const personalKey = string.replace(/-/g, "")
    //                 const res = await newRequest.post("/list/createPost", {
    //                     type: "house",
    //                     key: personalKey,
    //                     uid: user.uid,
    //                     // image,
    //                     price,
    //                     sale,
    //                     style,
    //                     year,
    //                     bath,
    //                     room,
    //                     sqft,
    //                     lot,
    //                     addy,
    //                     city,
    //                     state,
    //                     zip,
    //                     description,
    //                     feat,
    //                     fact,
    //                 });

    //                 //create empty user chats on firestore
    //                 for (let field of e.target) {
    //                     field.value = "";
    //                 }
    //                 navigate("/listings");
    //             } catch (err) {
    //                 console.log(err);

    //             }
    //         } catch (err) {

    //         }*/
    //         }
    //     }

    //     function HouseForm() {
    //         return (
    //             <div className='bg-white w-full flex justify-center items-center flex-col p-5 '>
    //                 <form className='flex flex-col items-center gap-[10px] w-full' onSubmit={handleHouseUpload}>
    //                     <h1 className='text-2xl font-bold'>{lang === "En" ? "Add a new home" : "Ajouter une nouvelle maison"}</h1>
    //                     <div id='basic' className='pt-10 w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Basic Info" : "Informations de base"}</h2>
    //                         <div className='lg:w-[50%] grid grid-cols-2 gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Price:" : "Entreprise:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='price' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Style:" : "Entrez le style:"}
    //                                 <select name="style" className='p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
    //                                     <option value="blank"> </option>
    //                                     <option value="condo">{lang === "En" ? "Condo" : "condo"}</option>
    //                                     <option value="single">{lang === "En" ? "Single Family Home" : "Maison unifamiliale"}</option>
    //                                     <option value="townhouse">{lang === "En" ? "Townhouse" : "Maison de ville"}</option>
    //                                     <option value="coop">{lang === "En" ? "Coop" : "Coopérative"}</option>
    //                                     <option value="unknown">{lang === "En" ? "Unknown" : "Inconnue"}</option>
    //                                     <option value="apartment">{lang === "En" ? "Apartment" : "Appartement"}</option>
    //                                     <option value="multi">{lang === "En" ? "Multi Family" : "Plusieurs familles"}</option>
    //                                     <option value="lot">{lang === "En" ? "Lot" : "Parcelle"}</option>
    //                                 </select>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Year of Contruction:" : "Entrez l'année de construction:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='year' type="text" maxlength="4" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Is this for rent or sale?" : "Est-ce à louer ou à vendre?"}
    //                                 <select name="sale" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
    //                                     <option value="blank"> </option>
    //                                     <option value="sale">{lang === "En" ? "For Sale" : "À vendre"}</option>
    //                                     <option value="rent">{lang === "En" ? "For Rent" : "A louer"}</option>
    //                                 </select>
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <div id='size' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Enter Size" : "Entrer la taille"}</h2>
    //                         <div className='lg:w-[50%] grid grid-cols-2 gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Number of Baths:" : "Entrez le nombre de bains:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='bath' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Number of rooms:" : "Entrez le nombre de pièces:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='room' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Square Footage:" : "Entrez en pieds carrés:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='m2' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Lot Size:" : "Entrez la taille du lot:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='' type="text" />
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <div id='location' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Enter Location" : "Entrer l'emplacement"}</h2>
    //                         <div className='lg:w-[50%] grid grid-cols-2 gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Address:" : "Entrer l'adresse:"}
    //                                 <textarea name='addy' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></textarea>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter City:" : "Entrez la ville:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='city' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Commune:" : "Entrez le Commune:"}
    //                                 <select name="commune" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
    //                                     <option value="any">Any</option>
    //                                     <option value="muha">Muha</option>
    //                                     <option value="mukaza">Mukaza</option>
    //                                     <option value="ntahangwa">Ntahangwa</option>
    //                                 </select>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Zone:" : "Entrez le Zone:"}
    //                                 <select name="zone" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
    //                                     <option value="any">Any</option>
    //                                     <option value="buterere">Buterere</option>
    //                                     <option value="buyenzi">Buyenzi</option>
    //                                     <option value="bwiza">Bwiza</option>
    //                                     <option value="cibitoke">Cibitoke</option>
    //                                     <option value="gihosha">Gihosha</option>
    //                                     <option value="kamenge">Kamenge</option>
    //                                     <option value="kanyosha">Kanyosha</option>
    //                                     <option value="kinama">Kinama</option>
    //                                     <option value="kinindo">Kinindo</option>
    //                                     <option value="musaga">Musaga</option>
    //                                     <option value="ngagara">Ngagara</option>
    //                                     <option value="rohero">Rohero</option>
    //                                 </select>
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <div id='media' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Enter Media" : "Entrer les médias"}</h2>
    //                         <div className='gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Image(s):" : "Entrez l'image (s):"}
    //                                 {/* setFiles(this?.target.value) */}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='image' type="file" multiple required accept=".jpg, .png" />
    //                             </label>
    //                             {
    //                                 files && files.map(p => (<img src={p} />))
    //                             }
    //                         </div>
    //                     </div>
    //                     <div id='additional' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium ' >{lang === "En" ? "Additional Information" : "Informations Complémentaires"}</h2>
    //                         <div className='lg:w-[50%] grid grid-cols-2 gap-[25px] lg:gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Description:" : "Entrez Description:"}
    //                                 <textarea name='desc' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Give a short Description'></textarea>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Features:" : "Entrez les fonctionnalités:"}
    //                                 <textarea name='feat' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Airconditioned | Parking | 3 Stories'></textarea>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Facts:" : "Entrez les faits:"}
    //                                 <textarea name='fact' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Optional'></textarea>
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <button className='bg-zinc-400 text-white font-medium py-2 px-4 rounded hover:underline' type='submit'>{lang === "En" ? "submit" : "soumettre"}</button>
    //                 </form>
    //             </div>
    //         );
    //     }

    //     const handleCarUpload = async (e) => {
    //         e.preventDefault();
    //         let tempFile = e.target[15].files;
    //         console.log(tempFile);
    //         if (!tempFile) {
    //             alert("Please upload an image first!");
    //         }
    //         for (let indexFile of tempFile) {
    //             const storageRef = ref(storage, `/files/${indexFile.name}`);

    //             // progress can be paused and resumed. It also exposes progress updates.
    //             // Receives the storage reference and the file to upload.
    //             const uploadTask = uploadBytesResumable(storageRef, indexFile);

    //             uploadTask.on(
    //                 "state_changed",
    //                 (snapshot) => {
    //                     const percent = Math.round(
    //                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //                     );
    //                 },
    //                 (err) => console.log(err),
    //                 () => {
    //                     // download url
    //                     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                         console.log(url);
    //                         imageUrl.push(url);
    //                         if (imageUrl.length === tempFile.length)
    //                             handleCarSubmission(e);
    //                     });
    //                 }
    //             );
    //         }
    //     };

    //     const handleCarSubmission = async (e) => {
    //         // console.log(e);
    //         handleChange(e.target[0]);
    //         handleChange(e.target[1]);
    //         handleChange(e.target[2]);
    //         handleChange(e.target[3]);
    //         handleChange(e.target[4]);
    //         handleChange(e.target[5]);
    //         handleChange(e.target[6]);
    //         handleChange(e.target[7]);
    //         handleChange(e.target[8]);
    //         handleChange(e.target[9]);
    //         handleChange(e.target[10]);
    //         handleChange(e.target[11]);
    //         handleChange(e.target[12]);
    //         handleChange(e.target[13]);
    //         handleChange(e.target[14]);
    //         handleChange(e.target[16]);
    //         handleChange(e.target[17]);
    //         handleChange(e.target[18]);
    //         handleChange({ name: "what", value: "car" });
    //         handleChange({ name: "image", value: imageUrl });
    //         handleChange({ name: "userId", value: user._id });

    //         // await handleUpload(e);
    //         /*const image = imageUrl;
    //         const price = parseFloat(e.target[0].value);
    //         const year = e.target[1].value;
    //         const make = e.target[2].value;
    //         const model = e.target[3].value;
    //         const mileage = e.target[4].value;
    //         const mpg = e.target[5].value;
    //         const color = e.target[6].value;
    //         const sale = e.target[7].value;
    //         const engine = e.target[8].value;
    //         const regi = e.target[9].value;
    //         const style = e.target[10].value;
    //         const addy = e.target[11].value;
    //         const city = e.target[12].value;
    //         const state = e.target[13].value;
    //         const zip = e.target[14].value;
    //         const description = e.target[16].value;
    //         const feat = e.target[17].value;
    //         const fact = e.target[18].value;
    //         try {
    //             //Create user

    //             try {

    //                 //create post on firestore
    //                 const string = uuid();
    //                 const personalKey = string.replace(/-/g, "")
    //                 await setDoc(doc(db, "posts", personalKey), {
    //                     type: "car",
    //                     key: personalKey,
    //                     uid: user.uid,
    //                     make,
    //                     model,
    //                     mileage,
    //                     mpg,
    //                     color,
    //                     engine,
    //                     regi,
    //                     sale,
    //                     image,
    //                     price,
    //                     style,
    //                     year,
    //                     addy,
    //                     city,
    //                     state,
    //                     zip,
    //                     description,
    //                     feat,
    //                     fact,
    //                     date: Timestamp.now(),
    //                 });

    //                 //create empty user chats on firestore
    //                 for (let field of e.target) {
    //                     field.value = "";
    //                 }
    //                 navigate("/listings");
    //             } catch (err) {
    //                 console.log(err);

    //             }
    //         } catch (err) {

    //         }*/
    //     }

    //     function CarForm() {
    //         return (
    //             <div className='bg-white w-full flex justify-center items-center flex-col p-5 '>
    //                 <form className='w-full flex flex-col items-center gap-[10px]' onSubmit={handleCarUpload}>
    //                     <h1 className='text-2xl font-bold'>{lang === "En" ? "Add a new Car" : "Ajouter une nouvelle voiture"}</h1>
    //                     <div id='basic' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium w-1/4' >{lang === "En" ? "Basic Info" : "Informations de base"}</h2>
    //                         <div className='lg:w-[50%] grid grid-cols-2 gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Price:" : "Entreprise:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='price' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Year:" : "Entrez l'année:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='year' type="text" maxlength="4" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Make:" : "Entrez Make:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='make' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Model:" : "Entrez le modèle:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='model' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Total Mileage:" : "Entrez le kilométrage total:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='mileage' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Miles per Gallon:" : "Entrez des kilomètres par gallon:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='mpg' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Color:" : "Entrez la couleur:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='color' type="text" />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Is this for rent or sale?" : "Est-ce à louer ou à vendre?"}
    //                                 <select className="w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600" name="sale" id="type">
    //                                     <option value="blank"> </option>
    //                                     <option value="sale">{lang === "En" ? "For Sale" : "À vendre"}</option>
    //                                     <option value="rent">{lang === "En" ? "For Rent" : "A louer"}</option>
    //                                 </select>
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <div id='size' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium w-1/4'>{lang === "En" ? "Specific Info" : "Informations spécifiques"}</h2>
    //                         <div className='lg:w-[50%] grid grid-cols-2 gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Engine Size:" : "Entrez la taille du moteur:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='engine' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Year of Registration:" : "Année d'inscription:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='yor' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Manual or Automatic:" : "Manuel ou automatique:"}
    //                                 <select className="w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600" name="style" id="style">
    //                                     <option value="blank"> </option>
    //                                     <option value="Manual">{lang === "En" ? "Manual" : "Manuel"}</option>
    //                                     <option value="Automatic">{lang === "En" ? "Automatic" : "Automatique"}</option>
    //                                 </select>
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <div id='location' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Enter Location" : "Entrer l'emplacement"}</h2>
    //                         <div className='lg:w-[50%] grid grid-cols-2 gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Address:" : "Entrer l'adresse:"}
    //                                 <textarea name='addy' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></textarea>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter City:" : "Entrez la ville:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='city' type="text" required />
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Commune:" : "Entrez le Commune:"}
    //                                 <select name="commune" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
    //                                     <option value="any">Any</option>
    //                                     <option value="muha">Muha</option>
    //                                     <option value="mukaza">Mukaza</option>
    //                                     <option value="ntahangwa">Ntahangwa</option>
    //                                 </select>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Zone:" : "Entrez le Zone:"}
    //                                 <select name="zone" className='w-full p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600'>
    //                                     <option value="any">Any</option>
    //                                     <option value="buterere">Buterere</option>
    //                                     <option value="buyenzi">Buyenzi</option>
    //                                     <option value="bwiza">Bwiza</option>
    //                                     <option value="cibitoke">Cibitoke</option>
    //                                     <option value="gihosha">Gihosha</option>
    //                                     <option value="kamenge">Kamenge</option>
    //                                     <option value="kanyosha">Kanyosha</option>
    //                                     <option value="kinama">Kinama</option>
    //                                     <option value="kinindo">Kinindo</option>
    //                                     <option value="musaga">Musaga</option>
    //                                     <option value="ngagara">Ngagara</option>
    //                                     <option value="rohero">Rohero</option>
    //                                 </select>
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <div id='media' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium' >{lang === "En" ? "Enter Media" : "Entrer les médias"}</h2>
    //                         <div className='gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Image:" : "Entrez l'image:"}
    //                                 <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='image' type="file" multiple required accept=".jpg, .png" />
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <div id='additional' className='w-full flex flex-col items-center gap-[25px]'>
    //                         <h2 className='whitespace-nowrap text-[20px] font-medium w-1/4'>{lang === "En" ? "Additional Information" : "Informations Complémentaires"}</h2>
    //                         <div className='lg:w-[50%] grid grid-cols-2 gap-[20px] pb-14'>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Description:" : "Entrez Description:"}
    //                                 <textarea name='desc' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Give a short Description'></textarea>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Features:" : "Entrez les fonctionnalités:"}
    //                                 <textarea name='feat' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Airconditioned | Parking | 3 Stories'></textarea>
    //                             </label>
    //                             <label className='flex flex-col items-start'>
    //                                 {lang === "En" ? "Enter Facts:" : "Entrez les faits:"}
    //                                 <textarea name='fact' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Optional'></textarea>
    //                             </label>
    //                         </div>
    //                     </div>
    //                     <button className='bg-blue-400 text-white font-medium py-2 px-4 rounded hover:underline' type='submit'>{lang === "En" ? "submit" : "soumettre"}</button>
    //                 </form>
    //             </div>
    //         );
    //     }

    //     return (
    //         <div className='w-full flex items-center justify-center bg-[#F5F5F5] min-h-[839px]'>
    //             {
    //                 what === "" ?
    //                     (<select name="formSelect" className='w-auto p-2.5 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600' onChange={(e) => setwhat(e.target.value)}>
    //                         <option value="blank">{lang === "En" ? "Please Choose An option!" : "Veuillez choisir une option!"}</option>
    //                         <option value="car">{lang === "En" ? "Car" : "Voiture"}</option>
    //                         <option value="house">{lang === "En" ? "House" : "Loger"}</option>
    //                     </select>) : null
    //             }
    //             {what === "car" ? <CarForm /> : null}
    //             {what === "house" ? <HouseForm /> : null}
    //         </div>
    //     );

    // }

    if (user)
        return (
            <div>
                <div className="h-screen bg-[skyblue] flex items-center justify-center bg-[url(https://as2.ftcdn.net/v2/jpg/02/49/93/23/1000_F_249932347_btE0PbnvfyGZJB4KFBGcc85XuOrq8OQa.jpg)] bg-cover">
                    <div className="w-6/12 flex min-h-[600px] rounded-[10px] flex-col lg:flex-row">
                        <div className="flex-1 justify-center items-center flex flex-col gap-[30px] text-[black] p-[10px] lg:p-[50px] bg-white bg-opacity-90 lg:border-r-[1px] lg:border-black">
                            <h1 className='text-[60px]'>Car Form</h1>
                            <p>Make a listing for a Car!</p>
                            <button className='whitespace-nowrap bg-blue-500 p-2 text-white rounded-md' onClick={() => navigate("/car-form")}>Car Form</button>
                        </div>
                        <div className="flex-1 justify-center items-center flex flex-col gap-[30px] text-[black] p-[10px] lg:p-[50px] bg-white bg-opacity-90 lg:border-l-[1px] lg:border-black">
                            <h1 className='text-[60px]'>House Form</h1>
                            <p>Make a listing for a House!</p>
                            <button className='whitespace-nowrap bg-blue-500 p-2 text-white rounded-md' onClick={() => navigate("/house-form")}>House Form</button>
                        </div>
                    </div>
                </div>
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

export default form;
