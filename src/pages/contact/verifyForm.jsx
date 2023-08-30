import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { LangContext } from '../../context/LangContext';
import emailjs from '@emailjs/browser';


function VerifyForm() {

    const { id } = useParams();
    const { lang } = useContext(LangContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [featImg, setFeat] = useState();
    const form = useRef();

    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    useEffect(() => {
        // console.log(state);
        if (state.price !== 0) {
            mutation.mutate(state);
        }
    }, [state]);

    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_yjdrr79', 'template_23ibsdd', form.current, 'OfeRHuPCHSJiCMMZy')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }
    
    if (user)
        return (
            <div className='bg-[skyblue] w-full flex justify-center items-center flex-col lg:p-5 min-h-[800px]'>
                <form onSubmit={sendEmail} ref={form} className='bg-white rounded-md flex flex-col items-center gap-[10px] w-full lg:w-[50%] py-10 p-3'>
                    <h1 className='text-2xl font-bold'>Verify Your Listing</h1>
                    <div id='basic' className='pt-10 w-full flex flex-col items-center gap-[25px]'>
                        <h2 className='whitespace text-[20px] font-medium' >Verifying a listing lets people know you're trusted! We have a short verification process <br /> Youll need to send X amount to X number <br /> then fill out the form below and we will get in contact with you when available!</h2>
                        <div className='grid grid-cols-1 gap-[20px] w-[50%] pb-14'>
                            <input className='hidden' name='param' value={id}></input>
                            <label className='flex flex-col items-start'>
                                Full Name
                                <input placeholder='Enter your Full Name' name='user_name' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </label>
                            <label className='flex flex-col items-start'>
                                Email
                                <input placeholder='Enter your Email' name='user_email' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </label>
                            <label className='flex flex-col items-start'>
                                Phone Number
                                <input placeholder='Enter your Phone Number' name='user_number' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </label>
                            <label className='flex flex-col items-start'>
                                Lumicash ID
                                <input placeholder='Enter your ID' name='lumicash' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </label>
                            <label className='flex flex-col items-start'>
                                Comments
                                <textarea placeholder='Any additional info' name='comments' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </label>
                        </div>
                    </div>
                    <button className='bg-blue-500 text-white w-[50%] font-medium py-2 px-4 rounded hover:underline' type='submit'>Submit</button>
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