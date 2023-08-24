import React, { useContext, useState } from 'react'
import './login.scss';
import newRequest from '../../utils/newRequest';
import { AuthContext } from '../../context/AuthContext.jsx';

function login(props) {

    const [seeLog, setLog] = useState(true);
    const [seeReg, setReg] = useState(false);
    const [seePass, setPass] = useState(false);
    const [anim, setAnim] = useState(true);
    const [err, setErr] = useState("");
    const [label, setLabel] = useState("");
    const { loading, error, dispatch } = useContext(AuthContext);

    const handleSign = async (e) => {
        e.preventDefault();
        setLabel("");
        dispatch({ type: "LOGIN_START" });
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            // const res = await axios.get("http://localhost:8800/api/auth/test");
            const res = await newRequest.post("/auth/login", {
                email,
                password,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            // localStorage.setItem("currentUser", JSON.stringify(res.data));
            props.toggle();
            setErr("");
            // navigate("/listings");
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
            console.log("error");
            console.log(error);
            setErr(error.response.data);
        }
    }
    const handleReg = async (e) => {
        e.preventDefault();
        const name = e.target[0].value + " " + e.target[1].value;
        const email = e.target[2].value;
        const phone = e.target[3].value;
        const password = e.target[4].value === e.target[5].value ? e.target[5].value : null;
        if (password !== null) {
            try {
                if (!checkString(password)) {
                    setErr("Password does not use at least 1 capital letter, atleast 1 number, & atleast 1 symbol & has to be longer than 7 characters");
                } else {
                    try {
                        //Create user
                        const res = await newRequest.post("/auth/register", {
                            name,
                            email,
                            password,
                            phone,
                        });
                        setLabel("Now that you've registered please login!");
                        try {
                            // const res = await axios.get("http://localhost:8800/api/auth/test");
                            const res = await newRequest.post("/auth/login", {
                                email,
                                password,
                            });
                            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                            // localStorage.setItem("currentUser", JSON.stringify(res.data));
                            props.toggle();
                            setErr("");
                            // navigate("/listings");
                        } catch (error) {
                            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
                            console.log("error");
                            console.log(error);
                            setErr(error.response.data);
                        }
                    } catch (err) {
                        console.log(err);
                        // setErr(true);
                    }
                }
            } catch (error) {
                console.log("error");
                console.log(error);
                setErr(error.response.data);
            }
        } else {
            setErr("Passwords do not match");
        }
    };

    function checkString(str) {
        var capitalRegex = /[A-Z]/;        // Regex to match capital letters
        var numberRegex = /[0-9]/;         // Regex to match numbers
        var symbolRegex = /[!@#$%^&*~]/;    // Regex to match symbols

        return capitalRegex.test(str) && numberRegex.test(str) && symbolRegex.test(str) && str.length >= 7;
    }

    function lFormToggle() {
        setLog(true);
        setReg(false);
        setPass(false);
        setErr("");
    }

    function rFormToggle() {
        setLog(false);
        setReg(true);
        setPass(false);
        setErr("");
    }

    function pFormToggle() {
        setLog(false);
        setReg(false);
        setPass(true);
        setErr("");
    }

    const LPage = () => {
        return (
            <form onSubmit={handleSign}>
                <div className='flex flex-col items-start'>
                    Username:
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" required />
                </div>
                <div className='flex flex-col items-start'>
                    Password:
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="password" required />
                </div>
                <a onClick={pFormToggle}>reset password</a>
                <br />
                <button className='bg-blue-500 hover:bg-blue-700 text-[white] w-full text-center no-underline inline-block text-base cursor-pointer px-5 py-2.5 rounded-[5px] border-[none];' type='submit'>Log In</button>
                <br />
                <label className='text-red-500 underline'>{err}</label>
            </form>
        );
    }
    const RPage = () => {
        return (
            <form onSubmit={handleReg}>
                <div className='flex flex-col items-start'>
                    First Name:
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" required />
                </div>
                <div className='flex flex-col items-start'>
                    Last Name:
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" required />
                </div>
                <div className='flex flex-col items-start'>
                    Email:
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" required />
                </div>
                <div className='flex flex-col items-start'>
                    Phone Number:
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" required />
                </div>
                <div className='flex flex-col items-start'>
                    Password:
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="password" required />
                </div>
                <div className='flex flex-col items-start'>
                    Confirm Password:
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="password" required />
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 text-[white] w-full text-center no-underline inline-block text-base cursor-pointer px-5 py-2.5 rounded-[5px] border-[none];' type='submit'>Register</button>
                <br />
                <label className='text-red-500'>{err}</label>
            </form>
        );
    }

    const PRPage = () => {
        return (
            <form onSubmit={handleReset}>
                <label>
                    Enter Email:
                    <input type="text" required />
                </label>
                <button type='submit'>Submit</button>
                {err}
            </form>
        );
    }

    return (
        <div className="popup z-[5]">
            <div className='fixed top-0 left-0 w-full h-full z-[-5]' onClick={() => setAnim(false)}></div>
            {!anim ?
                (<div className={props.class + " popup-inner rounded-lg z-[6] popup-close opacity-0"} onAnimationEnd={props.toggle}>
                    <div className='topContainer flex justify-between'>
                        <div>
                            {seeLog ? <button className='bg-[white] text-[black] rounded-ss-lg px-5 py-3 cursor-default' type='button'>Login</button> : <button className='bg-[bluesky] text-[black] hover:underline rounded-none px-5 py-3' onClick={lFormToggle}>Login</button>}
                            {seeReg ? <button className='bg-[white] text-[black] rounded-none px-5 py-3 cursor-default' type='button'>Register</button> : <button className='bg-[bluesky] border-r-[1px] border-black text-[black] hover:underline rounded-none px-5 py-3' onClick={rFormToggle}>Register</button>}
                        </div>
                        <button className='relative right-2.5 border-l-[1px] hover:text-white text-lg border-l-black pl-5 pr-3 hover:cursor-pointer' type="button" id='close' onClick={() => setAnim(false)}>x</button>
                    </div>
                    <div className='bg-white px-5 py-5 rounded-b-lg'>
                        {seeLog ? <LPage /> : null}
                        {seeReg ? <RPage /> : null}
                        {seePass ? <PRPage /> : null}
                    </div>
                </div>)
                :
                (<div className={props.class + " popup-inner rounded-lg z-[6] popup-show"}>
                    <div className='topContainer flex justify-between'>
                        <div>
                            {seeLog ? <button className='bg-[white] text-[black] rounded-ss-lg px-5 py-3 cursor-default' type='button'>Login</button> : <button className='bg-[bluesky] text-[black] hover:underline rounded-none px-5 py-3' onClick={lFormToggle}>Login</button>}
                            {seeReg ? <button className='bg-[white] text-[black] rounded-none px-5 py-3 cursor-default' type='button'>Register</button> : <button className='bg-[bluesky] border-r-[1px] border-black text-[black] hover:underline rounded-none px-5 py-3' onClick={rFormToggle}>Register</button>}
                        </div>
                        <button className='relative right-2.5 border-l-[1px] hover:text-white text-lg border-l-black pl-5 pr-3 hover:cursor-pointer' type="button" id='close' onClick={() => setAnim(false)}>x</button>
                    </div>
                    <div className='bg-white px-5 py-5 rounded-b-lg'>
                        {seeLog ? <LPage /> : null}
                        {seeReg ? <RPage /> : null}
                        {seePass ? <PRPage /> : null}
                    </div>
                </div>)}
        </div>
    );
}

export default login;