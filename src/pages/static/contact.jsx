import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import emailjs from '@emailjs/browser';

function contact() {
    const [sent, setSent] = useState(false);
    const form = useRef();


    function sendEmail(e) {
        e.preventDefault();
        setSent(true);
        emailjs.sendForm('service_yjdrr79', 'template_dmnvrr7', form.current, 'OfeRHuPCHSJiCMMZy')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    return (
        <div className='flex flex-col gap-3 bg-gradient-to-b from-white to-[skyblue]'>
            <div className='flex flex-col lg:flex-row justify-center items-center bg-[#F7F7F7] py-[100px] lg:h-[150px] gap-3'>
                <div className='bg-white flex gap-5 flex-row px-10 py-5 max-w-[350px] min-h-[100px] w-full items-center justify-center text-[20px] text-[#757575]'>
                    <div className='relative opacity-[40%]'><FontAwesomeIcon icon={faEnvelope} size="lg" /></div>
                    info@vitalhealthstaffing.us
                </div>
                <div className='bg-white flex gap-5 flex-row px-10 py-5 max-w-[350px] min-h-[100px] w-full items-center justify-center text-[20px] text-[#757575]'>
                    <div className='relative opacity-[40%]'><FontAwesomeIcon icon={faPhone} size="lg" /></div>
                    +1 (701) 356 1653
                </div>
                <div className='bg-white flex gap-5 flex-row px-10 py-5 max-w-[350px] min-h-[100px] w-full items-center justify-center text-start text-[20px] text-[#757575]'>
                    <div className='relative opacity-[40%]'><FontAwesomeIcon icon={faLocationDot} size="lg" /></div>
                    <p className='flex-wrap'>3523 45th St S Suite 147, <br /> Fargo, ND 58104</p>
                </div>
            </div>
            {/* <h1 className='font-bold text-[26px]'>Contact</h1> */}
            <div className='flex flex-col lg:flex-row w-full h-full lg:h-[650px] items-center justify-center gap-10 '>
                <div className='flex flex-col w-[90%] lg:max-w-[20%] h-full gap-10 justify-start text-start'>
                    <div className='bg-white rounded h-fit p-5 mt-[50px]'>
                        <h1 className='text-[48px] font-bold pb-[10px]'>Contact Us</h1>
                        <p className='flex text-[18px] text-wrap w-full'>
                            If you would like to inquire about our services, please dont hesitate to contact us. We are here to answer all your questions and concerns in order to provide the best service. Call us today!
                        </p>
                    </div>
                </div>
                <div className='flex flex-col lg:w-[30%] h-[600px] justify-center'>
                    <div className='bg-[#EDEDED] p-3'>
                        {!sent ?
                            <form onSubmit={sendEmail} ref={form} className='flex flex-col gap-2 p-6'>
                                {/* <h2 className='flex justify-start font-bold text-2xl'>Contact owner</h2> */}
                                <input required placeholder='Full Name' name='user_name' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <input required placeholder='Email' name='user_email' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <input required placeholder='Phone Number' name='user_number' type="text" className='bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                <textarea required placeholder='Message' name='message' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-blue-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="" cols="30" rows="10"></textarea>
                                <button type='submit' value='Send' className='whitespace-nowrap bg-blue-500 text-white text-medium text-lg p-2 rounded-md'>Send Message</button>
                            </form>
                            : <div className='w-[200px] h-[200px] flex justify-center items-center'>Sent</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default contact;