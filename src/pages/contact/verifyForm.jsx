import React, { useContext, useEffect, useReducer, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../../firebase";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import newRequest from '../../utils/newRequest';
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LangContext } from '../../context/LangContext';


function VerifyForm() {

    const { lang } = useContext(LangContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [featImg, setFeat] = useState();

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
                            console.log(url);
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
        handleChange(e.target[e.target.length-4]);
        handleChange(e.target[e.target.length-3]);
        handleChange(e.target[e.target.length-2]);
        handleChange({ name: "what", value: "house" });
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
        // console.log(state);
        if (state.price !== 0) {
            mutation.mutate(state);
        }
    }, [state]);

    if (user)
        return (
            <div className='bg-[skyblue] w-full flex justify-center items-center flex-col lg:p-5 min-h-[800px]'>
                <form className='bg-white rounded-md flex flex-col items-center gap-[10px] w-full lg:w-[50%] py-10 p-3'>
                    <h1 className='text-2xl font-bold'>Verify Your Listing</h1>
                    <div id='basic' className='pt-10 w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace text-[20px] font-medium' >Verifying a listing lets people know you're trusted! We have a short verification process <br /> Youll need to send X amount to X number <br /> then fill out the form below and we will get in contact with you when available!</h2>
                        <div className='grid grid-cols-1 gap-[20px] w-[50%] pb-14'>
                            <label className='flex flex-col items-start'>
                                Full Name
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='price' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                Email
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='price' type="text" required />
                            </label>
                            <label className='flex flex-col items-start'>
                                Phone Number
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='price' type="text" required />
                            </label>
                        </div>
                    </div>
                    <button className='bg-blue-500 text-white w-[50%] font-medium py-2 px-4 rounded hover:underline' type='button'>Submit</button>
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

export default VerifyForm;