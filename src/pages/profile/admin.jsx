// import { v4 as uuid } from 'uuid';
import React, { useContext, useEffect, useState } from 'react'
import './profile.scss';
import { AuthContext } from "./../../context/AuthContext";
import ListContainer from '../../components/listingContainer/listContainer';
import { useMutation, useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { LangContext } from '../../context/LangContext';
import userModel from '../../../../server/models/user.model';
import { useNavigate } from 'react-router';

function Admin() {
    const [findID, setID] = useState('64ee3e61e6dff99f7e349c3c');
    const [author, setAuthor] = useState();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.name, value: e.value },
        });
    }

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["list"],
        queryFn: () =>
            newRequest.get(`/list/` + findID).then((res) => {
                // console.log(res.data);
                grabUser(res.data.userId);
                return res.data;
            }),
    });

    function grabUser(e) {
        newRequest.get(`/user/get/` + e).then((res) => {
            // console.log(res.data);
            setAuthor(res.data);
            // return (res.data);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setID(e.target[0].value);
    }

    const handleVer = async () => {
        newRequest.put(`/list/ver/` + findID, { ver: true });
    }

    const handleDel = async () => {
        newRequest.delete(`/list/` + findID);
    }

    useEffect(() => {
        refetch();
    }, [findID]);

    if (user && user?.admin)
        return (
            <div className='w-full flex flex-col justify-center'>
                <br />
                <form onSubmit={handleSubmit} className='gap-3'>
                    <h1>lookup</h1>
                    <input type="text" placeholder='Please enter ID' className='w-[300px]' />
                    <button type='submit' className='bg-blue-400 hover:underline text-[15px] text-white font-semibold py-2 px-4 rounded'>Search</button>
                </form>
                <div className='pb-5 min-[1800px]:min-w-[1875px] items-start flex flex-col w-full'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 min-[1800px]:grid-cols-5 h-auto gap-2'>
                        {data ? (data.what === "house" ? <ListContainer verified={data.verified} hover={true} city={data.city} style={data.style} sale={data.sale} what={data.what} id={data._id} image={data.image} price={data.price} room={data.room} bath={data.bath} m2={data.m2} addy={data.addy} zone={data.zone} commune={data.commune} /> : <ListContainer hover={true} city={data.city} style={data.style} sale={data.sale} what={data.what} id={data._id} image={data.image} price={data.price} addy={data.addy} zone={data.zone} commune={data.commune} make={data.make} model={data.model} year={data.year} mileage={data.mileage} mpg={data.mpg} engine={data.engine} color={data.color} verified={data.verified} />) : <div className='loading'>Loading..</div>}
                    </div>
                    <div className='text-start'>
                        <h1>{"Name: " + author?.name}</h1>
                        <h1>{"Email: " + author?.email}</h1>
                        <h1>{"Phone: " + author?.phone}</h1>
                        <button type='button' onClick={handleVer} className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Verify</button>
                        <button type='button' onClick={handleDel} className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
                    </div>
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


export default Admin